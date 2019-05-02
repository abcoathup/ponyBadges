const Pony = artifacts.require('Pony')
const TestBuxx = artifacts.require('TESTBUXX')
const { time } = require('openzeppelin-test-helpers');

contract('Pony', function([admin, anotherAccount, yetAnotherAccount, buxxAccount]) {
  let buxx;
  let pony;
  const ponyPlay = 758;
  
  beforeEach(async function() {
    buxx = await TestBuxx.new(0, "TestBuxx", 0, "BUX", {from: buxxAccount});
    await buxx.mint(anotherAccount, ponyPlay, {from: buxxAccount})
    await buxx.mint(yetAnotherAccount, ponyPlay, {from: buxxAccount})
    pony = await Pony.new(buxx.address)
  });

  describe('Pony functions', function() {
    it('details', async function() {
      var _balance = await buxx.balanceOf(pony.address);
      assert.equal(_balance, 0);
    })
    
    it('pony', async function() {
      var _balance = await buxx.balanceOf(pony.address);
      assert.equal(_balance, 0);
      await buxx.methods['transfer(address,uint256,bytes)'](pony.address, ponyPlay, "0x", {from: anotherAccount} )
      _balance = await buxx.balanceOf(pony.address);
      assert.equal(_balance, ponyPlay);
      var _badge = await pony.getPony({from: anotherAccount});
      assert.notEqual(_badge.body, 0);
      assert.notEqual(_badge.mane, 0);
      assert.notEqual(_badge.ponyType, 0);
    })

    it('withdraw', async function() {
      await buxx.methods['transfer(address,uint256,bytes)'](pony.address, ponyPlay, "0x", {from: anotherAccount} )
      await pony.withdraw({from: admin});
      var _balance = await buxx.balanceOf(admin)
      assert.equal(_balance, ponyPlay);
    })
  });
});
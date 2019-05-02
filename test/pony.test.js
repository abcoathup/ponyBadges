const Pony = artifacts.require('Pony')
const TestBuxx = artifacts.require('TESTBUXX')
const { BN, time } = require('openzeppelin-test-helpers');

contract('Pony', function([admin, anotherAccount, yetAnotherAccount, buxxAccount]) {
  let buxx;
  let pony;
  const ponyPlay = 758;
  const ponyCount = 10;
  
  beforeEach(async function() {
    buxx = await TestBuxx.new(0, "TestBuxx", 0, "BUX", {from: buxxAccount});
    await buxx.mint(anotherAccount, ponyPlay * ponyCount, {from: buxxAccount})
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
      var _ponyId = await pony.getPony(anotherAccount);
      _ponyId.should.be.bignumber.equal(new BN(1));
    })

    it('multiple ponies', async function() {
      var _ponyId;
      for (var i=0; i < ponyCount; i++) {
        await buxx.methods['transfer(address,uint256,bytes)'](pony.address, ponyPlay, "0x", {from: anotherAccount} )
        _ponyId = await pony.getPony(anotherAccount);
        _ponyId.should.be.bignumber.equal(new BN(i + 1));
      }
    });

    it('withdraw', async function() {
      await buxx.methods['transfer(address,uint256,bytes)'](pony.address, ponyPlay, "0x", {from: anotherAccount} )
      await pony.withdraw({from: admin});
      var _balance = await buxx.balanceOf(admin)
      assert.equal(_balance, ponyPlay);
    })
  });
});
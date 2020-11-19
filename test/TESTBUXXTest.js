const truffleAssert = require('truffle-assertions');
const Pony = artifacts.require('Pony');
const TESTBUXX = artifacts.require('TESTBUXX');

contract('TESTBUXX', (accounts) => {
  let trace = false;
  let contractTESTBUXX = null;
  let contractPony = null;
  beforeEach(async () => {
    contractTESTBUXX = await TESTBUXX.new(757, 'z7p59', 0, 'z7p59', {
      from: accounts[0],
    });
    if (trace)
      console.log(
        'SUCESSO: TESTBUXX.new(757,"z7p59",0,"z7p59",{from:accounts[0]}',
      );
    contractPony = await Pony.new(accounts[3], {from: accounts[0]});
    if (trace) console.log('SUCESSO: Pony.new(accounts[3],{from:accounts[0]}');
  });

  it('Should fail mint(address,uint256) when NOT comply with: msg.sender == admin', async () => {
    let result = await truffleAssert.fails(
      contractTESTBUXX.mint(accounts[2], 759, {from: accounts[9]}),
      'revert',
    );
  });
  it('Should fail transfer(address,uint256) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(
      contractTESTBUXX.methods[
        'transfer(address,uint256)'
      ]('0x0000000000000000000000000000000000000000', 759, {from: accounts[0]}),
      'revert',
    );
  });
  it('Should fail transferFrom(address,address,uint256) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(
      contractTESTBUXX.transferFrom(
        accounts[9],
        '0x0000000000000000000000000000000000000000',
        0,
        {from: accounts[0]},
      ),
      'revert',
    );
  });
  it('Should fail transfer(address,uint,bytes,string) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(
      contractTESTBUXX.methods[
        'transfer(address,uint256,bytes,string)'
      ](
        '0x0000000000000000000000000000000000000000',
        11,
        [
          182,
          216,
          41,
          38,
          147,
          44,
          36,
          6,
          62,
          162,
          153,
          230,
          51,
          251,
          248,
          133,
          208,
          73,
          44,
          56,
          201,
          106,
          236,
          237,
          71,
          220,
          76,
          92,
          244,
          40,
          167,
          55,
        ],
        'prle1s',
        {from: accounts[0]},
      ),
      'revert',
    );
  });
  it('Should fail transfer(address,uint,bytes,string) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(
      contractTESTBUXX.methods[
        'transfer(address,uint256,bytes,string)'
      ](
        '0x0000000000000000000000000000000000000000',
        11,
        [
          214,
          19,
          170,
          245,
          130,
          249,
          192,
          18,
          101,
          131,
          44,
          238,
          24,
          88,
          46,
          85,
          19,
          104,
          184,
          187,
          3,
          126,
          126,
          52,
          135,
          30,
          168,
          194,
          59,
          17,
          240,
          237,
        ],
        'z7p59',
        {from: accounts[0]},
      ),
      'revert',
    );
  });
  it('Should fail transfer(address,uint,bytes) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(
      contractTESTBUXX.methods[
        'transfer(address,uint256,bytes)'
      ](
        '0x0000000000000000000000000000000000000000',
        759,
        [
          101,
          150,
          85,
          147,
          210,
          35,
          109,
          127,
          225,
          1,
          210,
          250,
          59,
          167,
          187,
          106,
          133,
          95,
          85,
          220,
          152,
          117,
          113,
          126,
          213,
          221,
          114,
          195,
          211,
          176,
          25,
          76,
        ],
        {from: accounts[0]},
      ),
      'revert',
    );
  });
  it('Should fail transfer(address,uint,bytes) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(
      contractTESTBUXX.methods[
        'transfer(address,uint256,bytes)'
      ](
        '0x0000000000000000000000000000000000000000',
        757,
        [
          160,
          16,
          39,
          72,
          53,
          96,
          169,
          178,
          227,
          104,
          73,
          33,
          177,
          43,
          80,
          29,
          140,
          61,
          157,
          161,
          244,
          226,
          207,
          39,
          122,
          6,
          97,
          20,
          38,
          202,
          134,
          185,
        ],
        {from: accounts[0]},
      ),
      'revert',
    );
  });
});

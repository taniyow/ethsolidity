const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const web3 = new Web3(ganache.provider());

const { interface, bytecode } = require("../compile");

let lottery;
let accounts;

beforeEach(async () => {
  // Get a list of all accounts
  accounts = await web3.eth.getAccounts();

  // Use one of those accounts to deploy the contract
  lottery = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode })
    .send({ from: accounts[0], gas: "1000000" });
});
describe("Lottery Contract", () => {
  it("deploys a contract", () => {
    assert.ok(lottery.options.address);
  });

  it('allows one account to enter', async () => {
    await lottery.methods.enter().send({
      from: accounts[0], 
      value: web3.utils.toWei('.02', 'ether')
    });
    const players = await lottery.methods.getPlayers().call({
      from: accounts[0]
    });

    assert.strictEqual(accounts[0], players[0]);
    assert.strictEqual(1, players.length);
  });

  it('allows multiple accounts to enter', async () => {
    await lottery.methods.enter().send({
      from: accounts[0], 
      value: web3.utils.toWei('.02', 'ether')
    });
    await lottery.methods.enter().send({
      from: accounts[1], 
      value: web3.utils.toWei('.02', 'ether')
    });
    await lottery.methods.enter().send({
      from: accounts[2], 
      value: web3.utils.toWei('.02', 'ether')
    });

    const players = await lottery.methods.getPlayers().call({
      from: accounts[0]
    });

    assert.strictEqual(accounts[0], players[0]);
    assert.strictEqual(accounts[1], players[1]);
    assert.strictEqual(accounts[2], players[2]);
    assert.strictEqual(3, players.length);
  });

  // Try-Catch Assertion
  it('requires a minimum amount of ether to enter', async () => {
    try {
      await lottery.methods.enter().send({
        from: accounts[0],
        value: 0
      });
      assert(false); 
      // when try does not throw error, 
      // it will proceed to assert(false) to completely fail test
    } catch (err) {
      assert.ok(err);
      // when try fails, catch will assert that error
    }
  });

  // Testing Function Modifiers with Try-Catch Assertion
  it('only manager can call pickWinner', async () => {
    try {
      await lottery.methods.pickWinner().send({
        from: accounts[1]
      });
      assert(false);
    } catch (err) {
      assert.ok(err);
    }
  });

  // Running End-to-End Test
  it('sends money to the winner and reset the players array', async () => {
    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei('2', 'ether')
    });

    const initialBalance = await web3.eth.getBalance(accounts[0]);
    await lottery.methods.pickWinner().send({ from: accounts[0] });
    const finalBalance = await web3.eth.getBalance(accounts[0]);
    const difference = finalBalance - initialBalance;
    console.log(difference);

    assert(difference > web3.utils.toWei('1.8', 'ether'));
  });

  // additional test assertions that can be done would be
  // 1. assert that the list of players resets back to zero by retrieving the list of players array
  // 2. assert that the lottery balance has zero balance
});
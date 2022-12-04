import { DataArray, DataVerifier } from './DataVerifier.js';

import { Operator } from './Operator.js';
import {
  isReady,
  shutdown,
  Field,
  Mina,
  PrivateKey,
  AccountUpdate,
  Int64,
  CircuitString,
  Poseidon
} from 'snarkyjs';

//take these params input from application

var data_input = [1,4,2,3,5,6,10,8,9,7];
var operator_input = [3,1];
var range_input = [1,3];

(async function main() {
  await isReady;

  console.log('SnarkyJS loaded');

  const Local = Mina.LocalBlockchain();
  Mina.setActiveInstance(Local);
  const deployerAccount = Local.testAccounts[0].privateKey;

  const useProof = false;

  if (useProof) {
    DataVerifier.compile();
  }

  // ----------------------------------------------------

  // create a destination we will deploy the smart contract to
  const zkAppPrivateKey = PrivateKey.random();
  const zkAppAddress = zkAppPrivateKey.toPublicKey();

  // create an instance of Square - and deploy it to zkAppAddress
  const zkAppInstance = new DataVerifier(zkAppAddress);
  const deploy_txn = await Mina.transaction(deployerAccount, () => {
    AccountUpdate.fundNewAccount(deployerAccount);
    zkAppInstance.deploy({ zkappKey: zkAppPrivateKey });
    zkAppInstance.sign(zkAppPrivateKey);
  });
  await deploy_txn.send();

  // get the initial state of Square after deployment
  //const num0 = zkAppInstance.num.get();
  //console.log('state after init:', num0.toString());

  // ----------------------------------------------------

var data = data_input.map((x)=>Int64.from(x));
var operators = operator_input.map((x)=>Int64.from(x));
var range = range_input.map((x)=>Int64.from(x));

try{
  const txn1 = await Mina.transaction(deployerAccount, () => {
    zkAppInstance.verifyData(new DataArray(data),
                             new DataArray(operators),
                             new DataArray(range),
                             CircuitString.fromString("blavlalalslas"),
                             CircuitString.fromString("blavlalalslas"));
    zkAppInstance.sign(zkAppPrivateKey);
  });
  await txn1.send(); 
} catch (err: any) {
         console.log(err.message);
       } 


  //fetch events to verify if the Data Provided was good
const events = await zkAppInstance.fetchEvents();

const dataArrayGlobal = operators.concat(range);
var dataArrayGlobalField = dataArrayGlobal.map((x)=>x.toField());
dataArrayGlobalField = dataArrayGlobalField.concat(CircuitString.fromString("blavlalalslas").toFields()).concat(CircuitString.fromString("blavlalalslas").toFields());

console.log(events[0].event.toFields(null).toString());
console.log(Poseidon.hash(dataArrayGlobalField).toString());
  

/*       
try{
    const txn2 = await Mina.transaction(deployerAccount, () => {
      zkAppInstance.verifyData(new DataArray([1,4,2,3,5,6].map((x)=>Int64.from(x))),new DataArray([3,1].map((x)=>Int64.from(x))), new DataArray([1,1].map((x)=>Int64.from(x))));
      zkAppInstance.sign(zkAppPrivateKey);
    });
    await txn2.send(); 
  } catch (err2: any) {
           console.log(err2.message);
         } 
  //const num1 = zkAppInstance.num.get();
  //console.log('state after txn1:', num1.toString());
*/
  // ----------------------------------------------------

  console.log('Shutting down');

  await shutdown();
})();
import {
    SmartContract,
    state,
    State,
    method,
    Bool,
    DeployArgs,
    Permissions,
    arrayProp,
    CircuitValue,
    Int64,
    Field,
    CircuitString,
    Poseidon
  } from 'snarkyjs';

//import { Poseidon } from 'snarkyjs/dist/node/snarky';

  import { Operator } from './Operator.js';

  // We need a provable class for user inputs
  // This is a generic class to get 256 size integer array input

  export class DataArray extends CircuitValue {
    @arrayProp(Int64, 256) value: Int64[];
  
    constructor(input: Int64[]) {
      super();
      this.value = input;
    }

  }


/**
 * A smart contract that verifies the data is in the given range
 */
 export class DataVerifier extends SmartContract {
    //@state(Bool) isVerified = State<Bool>();

    events = {
        verifySign: Field
      };
  
    deploy(args: DeployArgs) {
      super.deploy(args);
      this.setPermissions({
        ...Permissions.default(),
        editState: Permissions.proofOrSignature(),
      });
    }

    

    //execute the operation based on the code recieved
    //The hardcoding of the opCodes is vague now
    //Look at this    
    executeOperator(dataInput: Int64[], opCode: Int64)
    {
        //console.log("HEre");

        var data = dataInput;
        var op = new Operator();
        try
        {
            opCode.assertEquals(Int64.from(0));
            return op.calculateMaximum(data);        
        }
        catch{
            try
        {
            opCode.assertEquals(Int64.from(1));
            return op.calculateMinimum(data);        
        }
        catch{
            try
        {
            opCode.assertEquals(Int64.from(2));
            return op.calculateAverage(data);        
        }
        catch{
            try
        {
            opCode.assertEquals(Int64.from(3));
            return op.calculateMovingAverage(data);        
        }
        catch{
            return [];
            
        }}}};
        /*
        else if(opCode.equals(Int64.from(1)).toBoolean())
        {
            return op.calculateMinimum(data);        
        }
        else if(opCode.equals(Int64.from(2)).toBoolean())
        {
            return op.calculateAverage(data);        
        }
        else if(opCode.equals(Int64.from(3)).toBoolean())
        {
            //console.log("HEre");
            return op.calculateMovingAverage(data);        
        }
        */
        //return [];
    }
    

    /**
     * Verify Data
     * @param data The data provided (array)
     * @param operators sequence of operations to run on this data
     * @param comparatorParam the final comparison value
     */
    @method verifyData(data: DataArray, operators: DataArray, comparatorParam: DataArray, dataOwner: CircuitString, dataRequestor:CircuitString) {
      // conduct Bilinear interpolation in the circuit
      //console.log("Running max operation", this.calculateMaximum(data.value));

      var newData = data.value;

      //run all operators sequentially
      for(var opCode of operators.value)
      {
        //console.log("Operating ", opCode.toString());

        newData = this.executeOperator(newData, opCode);
        //newData = new DataArray( temp );
      }


      //run final comparator
      //console.log(newData[0].toField().toString());

      newData[0].toField().assertGte(comparatorParam.value[0].toField());
      newData[0].toField().assertLte(comparatorParam.value[1].toField());
      //console.log("The operated value was within the provided range");

      const dataArrayGlobal = operators.value.concat(comparatorParam.value);
      var dataArrayGlobalField = dataArrayGlobal.map((x)=>x.toField());
      dataArrayGlobalField = dataArrayGlobalField.concat(dataOwner.toFields()).concat(dataRequestor.toFields());

      this.emitEvent(
        'verifySign', Poseidon.hash(dataArrayGlobalField)
      );

      //this.calculateMaximum(data.value)
      //this.calculateMinimum(data.value)
      //this.calculateAverage(data.value)
      //this.calculateMovingAverage(data.value)
      // all checks passed => the
      //this.isVerified.set(Bool(true));
    }
  }
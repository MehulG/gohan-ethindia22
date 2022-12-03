
import {
    CircuitValue,
    Int64
  } from 'snarkyjs';


  //Class to run all supported operations
  export class Operator extends CircuitValue{

    //Calculate Max
    calculateMaximum(data: Int64[]){
        var max = data[0];
        let v: Int64[];

        v =[];
        //console.log("MAx: ", max);
        for(var val of data)
        {
            //if(val.gt(max).toBoolean()) max = val;
            if(val>max) max = val;
        }
        //console.log("MAx: ", max.toString());
        v.push(Int64.from(max));
        return v;
    }

    //Calculate min
    calculateMinimum(data: Int64[]){
        var min = data[0];
        //console.log("MAx: ", max);
        let v: Int64[];

        v =[];
        for(var val of data)
        {
            //if(val.lt(min).toBoolean()) min = val;
            if(val<min) min = val;
        }
        //console.log("Min: ", min.toString());
        v.push(Int64.from(min));
        return v;
    }

    //Calculate Mean
    calculateAverage(data: Int64[]){
        let sum: Int64;
        let count: Int64;
        sum = Int64.from(0);
        count = Int64.from(1);

        let v: Int64[];

        v =[];
        //console.log("MAx: ", max);
        for(var val of data)
        {
            sum = sum.add(Int64.from(val));
            count = count.add(1);
        }

        //console.log("Count: ", count.toString());

        //console.log("Avg: ", sum.div(count).toString());

        v.push(sum.div(count));

        return v;
    }

    //Calculate 5 day moving average
    calculateMovingAverage(data: Int64[]){
        let sum: Int64;
        let count: Int64;
        sum = Int64.from(0);
        count = Int64.from(1);
        //console.log("MAx: ", max);
        let v: Int64[];

        v =[];

        for(let i=0;i<data.length;i++)
        {
            if(i>4)
            {
                sum = sum.sub(Int64.from(data[i-5]));
                sum = sum.add(Int64.from(data[i]));
                v.push(sum.div(count));
            }
            else if(i==4){
                sum = sum.add(Int64.from(data[i]));
                count = count.add(1);
                v.push(sum.div(count));
            }
            else {
                sum = sum.add(Int64.from(data[i]));
                count = count.add(1);
            }
            
        }

        //console.log("Count: ", count.toString());

        //console.log("Moving Avg: ", v.map((x)=>x.toString()));
        return v;
    }

    //Future plans include getting operator params along with operator
    //So that we can run custom moving averages, addition of constants etc
  }

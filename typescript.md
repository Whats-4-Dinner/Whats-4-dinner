# How to Typescript

  ## Data Types
   ### Numbers, Strings, Booleans, Undefined, Null
    Can be done but not considered best practice since typescript can infer type
    ```
    const num1 : number = 5     
    ```
    Could be useful if you don't initialize it initially : best practice
    ```
    let num : number; num = 5;
    ```
   ### Objects
    {} : specalized object === object 
      {name: string; age: number}, has to be exact keys 
   ### Arrays
    ### Strict array
    ```
    let favActivity : string[];
    favActivity = ['sports', 'cooking']
    ```
    ### Flexible array
    ```
      let mixBag : any[];
      mixBag = ['sports', 1, true]
      Can use specific type supported methods 
        for(const activity of favActivity){
          console.log(activity.toUpperCase())
        }
    ```
   ### Tuple : specify length and type. pushing to array breaks this rule though
    ```
    const role : [number, string] = [2, 'author']
    ```
   ### ENUM : different possible char or numbers. For human readability 
    ```  
    enum Role {ADMIN, READ_ONLY, AUTHOR};
    const role = Role.READ_ONLY
    console.log(role) //ADMIN = 0, READ_ONLY = 1...
    //can specify values to identifier
      //enum Role {ADMIN='Admin', READ_ONLY=100, AUTHOR='author'}
    ```
   ### Any : captures anything. Takes away all advantages of typescript 
   ### Unknown : we don't know what the user will input 
    Can store any datatype and won't get errors
    Unknown will need to have type to be checked, before assign to variable that wants a string 
    Any just forces value to variable that wants a string
    Still better to use union type tho 
    string | number > unknown > any 
    ```
    let userInput : unknown;
    let userName : string;

    userInput = 5;
    userInput = 'Max'

    //userName = userInput; 
      //will spit out error if userInput : unknown, as we don't know what unknown could be
      //will not get error if userInput : any. 
      //unknown > any 
    
    //Unknown type check
    if(typeof userInput === 'string') userName = userInput;

    ```
  

  ## Alias : naming for convience 
    ```
    type Combinable = number | string;
    let value : Combinable;

    type ConversionDescriptor = 'as-number' | 'as-text;
    let resultCoversion : ConversionDescriptor 
    ```
  
  ## Function
   Parameters are enforced, but return types no so much in callback functions
   ### Type
    Type = Function (cap) !! issue, store any function but dont specify parameteres 
   ```
    let combinValues : Function
   ```

   #### Function types
   ```
    let combineValues: () => number;
    let combineValues: (a: number, b: number) => number;
      //parameter names doesn't need to match 
   ``` 
   #### Higher order function
   ``` 
    function addAndHandle(n1: number, n2:number, cb: (num: number) => void) {
      const result = n1 + n2;
      cb(result)
    }
   ```
   ### Parameters
      ```
      function add(n1 : number, n2: number, showResult : boolean) : number {
        if(showResult) console.log(n1 + n2)
        return n1 + n2;
      }
      ``` 
   #### Union : more options for parameters 
    ```
    function combine(v1 : number | string, v2 : number | string){
      May need to have conditionals depending on the types
      if(typeof v1 === 'number' && typeof v2 === 'number'){
        return v1 + v2
      } else {
        return v1.toString() + v2.toString()
      }
      rather than just adding 
        return v1 + v2
    }
    ```
   #### Literal types : similar to enum + union 
    resultConversion should be one of set number of strings, 
    ```  
    function combine(v1 : number | string, v2 : number | string, resultConversion : 'as-number' | 'as-text'){
      let result;
      if(typeof v1 === 'number' && typeof v2 === 'number' || resultConversion === 'as-number'){
        //convert to number
        result = +v1 + +v2
      } else {
        result = v1.toString() + v2.toString()
      }
      return result;
    }
    ``` 
   ### Return 
    Most times let TS make inferences on what to return 
    function add(n1: number, n2:number) : number {
      return n1 + n2
    }
   
   #### Void = no return statement OR you ignore return type 
    function add(n1: number, n2:number) : void {
      console.log('Result:' , (n1 + n2)) 
    }
   ### Never 
   Utility function (crash script). Will never return a value 
   Makes it clear to other devs 
   ```
   function generateError(message: string, code: number) : never {
     throw {message: message. errorCode: code}
   }
   generateError('An error occured', 500)
   ```

## Commands 
  tsc --watch (watch mode for all TS files )
  tsc --init (makes tsconfig.json file)

## Others 
import {NextApiRequest, NextApiResponse} from 'next'
export default (req: NextApiRequest, res: NextApiResponse) => {
  ...
}

Interface vs type : https://pawelgrzybek.com/typescript-interface-vs-type/ 
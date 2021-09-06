/**
 * Solves the typical problem of validating square brackets, curly braces, parenthesis angle braces
 * ()[]{}(((())))[[[[]]]]{{{{}}}}((()()()()))
 * @param {string} s
 * @return {boolean}
 */
 var isValid = function(input) {
  //console.log({input})
  
  let list = input.split("")
  let stack = []
  
  const G = (depth) => {
      while(list.length){
          let c = list.shift()
          //console.log({c, depth, stack})
      
          if(c == "(" || c == "[" || c == "{"){
              stack.push(c)        

              while(list.length){
                 if(!G(depth + 1)) return false
              }
              
              return true
          }
          else{
              let s = stack.pop()
              
              return (s == "(" && c == ")")
                  || (s == "[" && c == "]")
                  || (s == "{" && c == "}")
          }
          
      }
      
      return true
  }
  
  let answer = G(0) && list.length == 0 && stack.length == 0
  //console.log({answer})
  return answer
};

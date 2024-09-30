(function(){"use strict";self.onmessage=s=>{const{array:t,comparator:o}=s.data,r=new Function("a","b",`return ${o};`)(),a=t.sort((e,n)=>r(e,n));self.postMessage(a)}})();

// Average of array
var excercise1 = function(nums) {
    var sum=0,
    i=0,
    arrLength = nums.length;
    for(;i<arrLength;i++){
        sum+=nums[i];
    }
    return sum/arrLength;
};

// Max of Array
var excercise2 = function(nums){
    var large = -Infinity,
    i=0,
    arrLength = nums.length;
    for(;i<arrLength;i++){
        large = nums[i]>large ? nums[i] : large;
    }
    return large;
};
var usexcercise2= function(nums){
    return _.max(nums);
};

// atleast 1 is even
var excercise3 = function(nums){
    var arrLength = nums.length,
    i=0;
    for(;i<arrLength;i++){
        if(nums[i]%2 === 0){
            return true;
        }
    }
    return false;
};
var usexcercise3 = function(nums){
    return _.some(nums,function(n){
        return n % 2 === 0;
    });
};

// all the elements are even
var excercise4 = function(nums){
    /*var arrLength = nums.length,
    i=0;
    for(;i<arrLength;i++){
        if(nums[i]%2 != 0){
            return false;
        }
    }
    return true;*/
    
    return nums.every(elem => elem % 2 === 0);
    /*
    return nums.every(function(n){
        return n % 2 == 0;
    });*/
};
var usexcercise4 = function(nums){
    /*return _.every(nums,function(n){
        return n % 2 == 0;
    });*/
    
    return _.every(nums,n => n % 2 === 0);
};

// array contains the queried item
var arrayContains = function(strArray, query){
    var arrLength = strArray.length,
    i=0;
    for(;i<arrLength;i++){
        if(strArray[i] == query){
            return true;
        }
    }
    return false;
};

// array contains the queried item twice
var arrayContainsTwo = function(strArray, query){
    var counter = 0,
    arrLength = strArray.length,
    i=0;
    for(;i<arrLength;i++){
        if(query == strArray[i]){
            counter++;
            if(counter >= 2){
                return true;
            }
        }
    }
    return false;
};

// array contains the queried item thrice
var arrayContainsThree = function(strArray, query){
    var counter = 0;
    var arrLength = strArray.length,
    i=0;
    for(;i<arrLength;i++){
        if(query == strArray[i]){
            counter++;
            if(counter >= 3){
                return true;
            }
        }
    }
    return false;
};

// array contains the queried item n times
var arrayContainsNTimes = function(strArray, query, n){
    var counter = 0;
    var arrLength = strArray.length,
    i=0;
    for(;i<arrLength;i++){
        if(query == strArray[i]){
            counter++;
            if(counter >= n){
                return true;
            }
        }
    }
    return false;
};

var display = function(id,input,func){
    document.getElementById(id).innerHTML += input + func.toString() + "<br/>";
};

(function(){
    display("d1","Iuput: [1,2,3,4,5,6] <br/> Output: ",excercise1([1,2,3,4,5,6]));

    display("d2","Iuput: [1,2,3,4,5,6] <br/> Output:",excercise2([1,2,3,4,5,6]));
    display("d2","Iuput: [10,2,3,4,5,6] <br/> Output using underscore: ",usexcercise2([1,2,3,4,5,6]));
    
    display("d3","Iuput: [1,3,7,8,9] <br/> Output:",excercise3([1,3,7,8,9]));
    display("d3","Iuput: [1,3,7,8,9] <br/> Output using underscore: ",usexcercise3([1,3,7,8,9]));
    
    display("d4","Iuput: [6,2,68,84,50,66] <br/> Output: ",excercise4([6,2,68,84,50,66]));
    display("d4","Iuput: [6,2,68,84,50,66] <br/> Output using underscore: ",usexcercise4([6,2,68,84,50,66]));
    
    display("d5","Iuput: [\"one\",\"two\",\"three\",\"four\",\"five\"],\"three\" <br/> Output: ",arrayContains(["one","two","three","four","five"],"three"));
    
    display("d6","Input: [\"one\",\"two\",\"three\",\"four\",\"three\"],\"three\" <br/> Output: ",arrayContainsTwo(["one","two","three","four","three"],"three"));
    
    display("d7","Input: [\"one\",\"two\",\"three\",\"four\",\"three\",\"three\"],\"three\"<br/> Output: ",arrayContainsThree(["one","two","three","four","three","three"],"three"));
    
    display("d8","Input: [\"one\",\"two\",\"three\",\"four\",\"three\",\"three\"],\"three\",3<br/> Output: ",arrayContainsNTimes(["one","two","three","four","three","three"],"three",3));
})();
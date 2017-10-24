# duration-iso-8601
Converting ISO 8601 Duration(PnYnMnDTnHnMnS syntax)  
  
https://en.wikipedia.org/wiki/ISO_8601#Durations

# Installation
```
npm install duration-iso-8601 --save
```

# Functions
### convertDuration(String)
**Input:**  
ISO 8601 Duration(PnYnMnDTnHnMnS syntax)  

**Output:**  
Object  
{year: Number, month: Number, day: Number, hour: Number, minute: Number, second: Number}  
Property value will be undefined if there is no value  
Return null if the input is invalid

### convertToSecond(String)
**Input:**  
ISO 8601 Duration(PnYnMnDTnHnMnS syntax)  

**Output:**  
Number of second  
Return null if the input is invalid

### convertYouTubeDuration(String)
**Input:**  
ISO 8601 Duration(PnYnMnDTnHnMnS syntax)  

**Output:**  
String(hh:mm:ss) of YouTube video duration syntax  
Return null if the input is invalid

# Examples
```javascript
import {convertDuration, convertToSecond, convertYouTubeDuration} from 'duration-iso-8601';

// convertDuration(String)

console.log(convertDuration('P1Y2M3DT4H5M6S'));
// return {year: 1, month: 2, day: 3, hour: 4, minute: 5, second: 6}

console.log(convertDuration('P1Y30DT15M39S'));
// return {year: 1, month: undefined, day: 30, hour: undefined, minute: 15, second: 39}

console.log(convertDuration('ieurht834'));
// return null

// convertToSecond(String)

console.log(convertToSecond('PT56M'));
// return 3360

console.log(convertToSecond('P3MT48M55S'));
// return 7778935

console.log(convertToSecond('P87(*&(bfwefh'));
// return null

// convertYouTubeDuration(String)

console.log(convertYouTubeDuration('PT3H'));
// return '3:00:00'

console.log(convertYouTubeDuration('PT28M59S'));
// return '28:59'

console.log(convertYouTubeDuration('PT4S'));
// return '0:04'

console.log(convertYouTubeDuration('^(*&*( qh2we'));
// return null
```

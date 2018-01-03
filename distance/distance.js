 const EARTH_RADIUS = 6371;

 exports.calculateDistance = (latA, lngA, latB, lngB) => {
   if (isNaN(latA) || latA < -90 || +90 < latA) {
     throw new Error('Invalid latitude latA: ' + latA);
   }
   if (isNaN(lngA) || lngA < -180 || +180 < lngA) {
     throw new Error('Invalid longitude lngA: ' + lngA);
   }
   if (isNaN(latB) || latB < -90 || +90 < latB) {
     throw new Error('Invalid latitude latB: ' + latB);
   }
   if (isNaN(lngB) || lngB < -180 || +180 < lngB) {
     throw new Error('Invalid longitude lngB: ' + lngB);
   }

   latA = this.convertDegToRad(latA);
   lngA = this.convertDegToRad(lngA);
   latB = this.convertDegToRad(latB);
   lngB = this.convertDegToRad(lngB);
   return EARTH_RADIUS *
     Math.acos(
       Math.cos(latA) * Math.cos(latB) * Math.cos(lngB - lngA) +
       Math.sin(latA) * Math.sin(latB)
     );
 }

 exports.convertDegToRad = (deg) => {
   if (isNaN(deg)) {
     throw new Error('Invalid parameter deg');
   }
   return deg * Math.PI / 180;
 }

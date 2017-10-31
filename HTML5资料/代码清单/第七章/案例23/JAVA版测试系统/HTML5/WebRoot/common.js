function CheckDate(value)
  {
 var strDate = value;
 if (strDate.length == 0)  return false;
 var reg = /^(\d{1,4})(\/|\/)(\d{1,2})\2(\d{1,2})/;   
 var r = strDate.match(reg);
 
 if (r == null)
 {
  return false;
 }

 if (r[1] < 1868 || r[1] > 2100) 
 {
  	return false;
 }
 
 if (r[3] < 1 || r[3] >12) 
 {
	return false; 
 }
 
 var d = new Date(r[1], r[3]-1,r[4]);

 if (d.getFullYear()==r[1]&&(d.getMonth()+1)==r[3]&&d.getDate()==r[4])
 {
 
  var w=value.split("/");
  temp=isNaN(w[2]);
  if(temp==true) return false;

  return true;
 }
 else
 {
  return false;
  
 }
 
 return true;
  }
import { Injectable } from '@angular/core';
import CryptoJS from 'crypto-js';
@Injectable({
  providedIn: 'root'
})
export class NewISANOTPService {
  LastIndex:number = 27;
  foldIndex:number = 24;
  LENGTH:number = 6;
  constructor() { }

  generate_New_OTP(key:any,time:any){
    var timeBytes = CryptoJS.enc.Utf8.parse(time);
    let hmac = this.hmacSha(key,timeBytes);
    let a=hmac.substring(this.LastIndex*2,hmac.length-2);
    let index:number = Number("0x"+hmac.charAt(hmac.length-2)+hmac.charAt(hmac.length-1));
    let xorindex = (index%this.foldIndex)*2;
    let b=hmac.substring(xorindex,xorindex+8);
    let c =this.xor(a,b);
    let result = hmac.replace(hmac.substring(xorindex,xorindex+8),c);
    return result;
  }
  hmacSha(key:any,text:any){
    var hmac = CryptoJS.HmacSHA256(text, key).toString(CryptoJS.enc.Hex);
    return hmac;
  }
  //get value num6
  getByte2num6(str:string) {
    let index:number;
    let number:number = Number("0x" + str);
    index = number % 10;
    return index+"";
  }
  //get value mix6base40
  getByte2mix6base40(str: string) {
    let index: number;
    let number: number = Number("0x" + str);
    //console.log("number="+number);
    index = number % 40;
    if (index == 39)
      return "@";
    else if (index == 38)
      return "&";
    else if (index == 37)
      return "$";
    else if (index == 36)
      return "*";
    else if (index >= 10)
      return String.fromCharCode(97+(index - 10));
    else
      return index + "";
  }
  //get value th6base42
   getByte2th6base42(str: string) {
    let index: number;
    let number: number = Number("0x" + str);
    let TH:any[]= [
      "๑", "๒", "๓", "๔", "๕", "๖", "๗", "๘", "๙", "ภ", "ถ", "ค", "ต", "จ",
      "ข", "ช", "ๆ", "ไ", "พ", "ะ", "ร", "น", "ย", "บ", "ล", "ฟ", "ห", "ก", "ด",
      "เ", "า", "ส", "ว", "ง", "ผ", "ป", "แ", "อ", "ท", "ม", "ใ", "ฝ"];
    index = number % 42;
    return TH[index];
  }
  //get value th6base60
  getByte2th6base60(str: string) {
    let index: number;
    let number: number = Number("0x" + str);
    let TH: any[] = ["๑", "๒", "๓", "๔", "๕", "๖", "๗", "๘", "๙", "ภ", "ถ", "ค", "ต", "จ",
      "ข", "ช", "ๆ", "ไ", "ฎ", "พ", "ฑ", "ะ", "ธ", "ร", "ณ", "น", "ย", "ญ", "บ",
      "ฐ", "ล", "ฃ", "ฅ", "ฟ", "ห", "ฆ", "ก", "ฏ", "ด", "เ", "ฌ", "า", "ษ", "ส",
      "ศ", "ว", "ซ", "ง", "ผ", "ป", "แ", "ฉ", "อ", "ฮ", "ท", "ม", "ฒ", "ใ", "ฬ",
      "ฝ"];
    index = number % 60;
    return TH[index];
  }
  //outputmode num6
  output6Char_num6(hash:string){
    let index = Number("0x" + hash.charAt(hash.length - 1))*2;
    let output:string="";
    for (let i = 0; i < this.LENGTH; i++) {
      output += this.getByte2num6(hash.substring(index, index + 4));
      index +=4;
    }
    return output;
  }
  //outputmode num6
  output6Char_mix6base40(hash:string){
    let index = Number("0x" + hash.charAt(hash.length - 1))*2;
    let output:string="";
    for (let i = 0; i < this.LENGTH; i++) {
      output += this.getByte2mix6base40(hash.substring(index, index + 4));
      index +=4;
    }
    return output;
  }
  //outputmode th6base42
  output6Chars_th6base42(hash: string) {
    let index = Number("0x" + hash.charAt(hash.length - 1)) * 2;
    let output: string = "";
    for (let i = 0; i < this.LENGTH; i++) {
      output += this.getByte2th6base42(hash.substring(index, index + 4));
      index += 4;
    }
    return output;
  }
  //outputmode th6base60
  output6Chars_th6base60(hash: string) {
    let index = Number("0x" + hash.charAt(hash.length - 1)) * 2;
    let output: string = "";
    for (let i = 0; i < this.LENGTH; i++) {
      output += this.getByte2th6base60(hash.substring(index, index + 4));
      index += 4;
    }
    return output;
  }
  xor(a: any, b: any) {
    let xorStr: string = '';
    for (let i = 0; i < a.length; i++) {
      xorStr += this.toHex(parseInt(a.charAt(i), 16) ^ parseInt(b.charAt(i), 16))
    }
    return xorStr;
  }
  toHex(nybble:any){
    if (nybble < 0 || nybble > 15) {
      return;
    }
    return "0123456789abcdef".charAt(nybble);
  }


  /*hmacCryptoJS(){
    var seed = CryptoJS.SHA256(this.secret+this.imei+this.serial);
    let strKey:string=seed.toString(CryptoJS.enc.Hex);
    var currentTimeMillis = new Date().getTime();
    var time = Math.floor((currentTimeMillis/1000)/30);
    var timeBytes = CryptoJS.enc.Utf8.parse(time);
    var hmac = CryptoJS.HmacSHA256(timeBytes, strKey).toString(CryptoJS.enc.Hex);
    console.log("hash="+hmac);
  }*/
}

function clear_promotion(){}function Promotions(){}function addPromotionpackage(t,a){var e="key_package"+t,r="spcart",o=[];if(null!=localStorage.getItem(r)&&(o=JSON.parse(localStorage.getItem(r))),null!=localStorage.getItem(e)){if(9==t||10==t){var l=0;if(null!=localStorage.getItem(e)){var n=JSON.parse(localStorage.getItem(e));l=1}if(1==l){for(var i=[],p=0;p<n.length;p++)9==t&&n[p].cate_apply==a&&(i=n[p]);for(var c=0,s=0;s<o.length;s++)9==t&&o[s].cate_apply==i.cate_apply&&(c+=o[s].amount);if(c>=i.condition)for(var g=i.gift.split(","),f=i.amount.split(","),u=i.tdate,s=0;s<g.length;s++)9==t&&addPromotion(g[s],"","","",f[s],i.cate_apply,u,"")}}if(11==t){var l=0;if(null!=localStorage.getItem(e)){var n=JSON.parse(localStorage.getItem(e));l=1}var m=0;return m}}if(13==t&&localStorage.getItem(""!=e)&&null!=localStorage.getItem(e)){for(var n=JSON.parse(localStorage.getItem(e)),i=[],l=0,p=0;p<n.length;p++)n[p].apply==a&&(i=n[p],l=1);if(1==l){for(var c=0,d=0,s=0;s<o.length;s++)o[s].brand_10==i.apply&&(c+=parseInt(o[s].amount),d+=parseInt(o[s].price*o[s].amount));if(c>=i.condition&&d>=i.from_price)for(var g=i.gift.split(","),f=i.amount.split(","),s=(i.apply.split(","),0);s<g.length;s++)addPromotion(g[s],"","","",f[s],i.apply,i.tdate,"")}}}function UpdatePromotion(t,a,e){var r="key_package"+t,o="spcart",l=[];if(null!=localStorage.getItem(o)&&(l=JSON.parse(localStorage.getItem(o))),9==t||10==t){if(9==t){var n=null;if(null!=e)e.id==a&&(n=e.cate_apply);else for(var i=0;i<l.length;i++)l[i].id==a&&(n=l[i].cate_apply)}else if(null!=e)e.id==a&&(n=e.brand_10);else for(var i=0;i<l.length;i++)l[i].id==a&&(n=l[i].brand_10);var p=0;if(null!=localStorage.getItem(r)){var c=JSON.parse(localStorage.getItem(r));p=1}if(1==p){for(var s=0,g=null,f=0,u=null,m=!1,d=0;d<c.length;d++)if(9==t){if(c[d].cate_apply==n){m=!0,s=c[d].condition,g=c[d].gift,f=c[d].amount,u=c[d].tdate;break}}else if(c[d].brand_apply==n){m=!0,s=c[d].condition,g=c[d].gift,f=c[d].amount,u=c[d].tdate;break}for(var y=0,i=0;i<l.length;i++)9==t?null!=n&&l[i].cate_apply==n&&(y+=l[i].amount):null!=n&&l[i].brand_10==n&&(y+=l[i].amount);if(y>=s&&1==m)for(var g=g.split(","),f=f.split(","),_=0;_<g.length;_++)addPromotion(g[_],"","","",f[_],n,u,"");else if(s>y&&1==m){for(var g=g.split(","),f=f.split(","),i=0;i<l.length;i++)if(l[i].is_apply==n){l.splice(i,g.length);break}localStorage.setItem(o,JSON.stringify(l))}}}if(13==t){n=null;var s=null,g=null,f=0,u=null,I=0;if(null!=e)e.id==a&&(n=e.brand_10);else for(var i=0;i<l.length;i++)l[i].id!=a||l[i].hasOwnProperty("is_apply")||l[i].hasOwnProperty("is_gift")||(n=l[i].brand_10);if(""!=localStorage.getItem(r)){var c=JSON.parse(localStorage.getItem(r));if(null!=c&&null!=n){for(var d=0;d<c.length;d++)if(c[d].apply==n){s=c[d].condition,g=c[d].gift,f=c[d].amount,I=c[d].from_price;break}for(var y=0,S=0,i=0;i<l.length;i++)l[i].brand_10==n&&(y+=parseInt(l[i].amount),S+=parseInt(l[i].price*l[i].amount));if(null!=s&&null!=g&&0!=I)if(y>=s&&S>=I)for(var g=g.split(","),f=f.split(","),_=0;_<g.length;_++)addPromotion(g[_],"","","",f[_],n,u,"");else if(s>y||I>S){for(var g=g.split(","),f=f.split(","),i=0;i<l.length;i++)if(l[i].is_apply==n){l.splice(i,g.length);break}localStorage.setItem(o,JSON.stringify(l))}}}}}function Promotion_package(t,a,e,r,o){var l="",n="";if(r=parseInt(r),4==t);else if(3==t){var i="spcart",p=[];"[]"!=localStorage.getItem(i)&&null!=localStorage.getItem(i)&&(p=JSON.parse(localStorage.getItem(i)),l="&total_promotion="+o+"&type=3&cart="+JSON.stringify(p),$.ajax({url:"/products/checkPromotion",type:"post",data:l,async:!1,success:function(t){n=parseInt(t.replace(/ /g,""))}}))}else if(8==t){var i="spcart";null!=localStorage.getItem(i)&&(l={cart:localStorage.getItem(i),type:0},$.ajax({url:"/products/checkPromotion",type:"post",data:l,async:!1,success:function(t){t=t.replace(/ /g,""),""!=t&&(n=parseInt(t))}}))}else 7==t&&$.ajax({url:"/products/checkPromotion",type:"post",data:"pid="+encodeURI(a)+"&amount="+encodeURI(r)+"&price="+encodeURI(e)+"&type=1",async:!1,dataType:"json",success:function(t){null!=t&&""!=t.product_id&&""!=t.discount&&(n=t)}});return n}function addPromotion(t,a,e,r,o,l,n,i,p){if(void 0!=t&&"undefined"!=t){(isNaN(o)||0>o||o>100)&&(o=1);var c="spcart",s=[];null!=localStorage.getItem(c)&&(s=JSON.parse(localStorage.getItem(c)));for(var g=0,f=0;f<s.length;f++)s[f].hasOwnProperty("is_gift")&&s[f].id==t&&void 0!=t&&(g=1);if(""==l){if(0==g){var u={id:t,size:e,color:r,is_gift:t,amount:parseInt(o),total:0,date:n,buy:i,is_apply:t};p&&"package4"==p&&(u.package4=!0),s.push(u)}}else if(0==g){var u={id:t,size:e,color:r,is_gift:t,is_apply:l,amount:parseInt(o),total:0,date:n,buy:i};s.push(u)}localStorage.setItem(c,JSON.stringify(s))}}function RemoveItem(t){var a=[],e=t.split(",");null!=localStorage.getItem("spcart")&&(a=JSON.parse(localStorage.getItem("spcart")));for(var r="",o=0;o<a.length;o++)for(var l=0;l<e.length;l++)if(a[o].id==e[l]&&a[o].hasOwnProperty("is_gift")){r=a[o].is_apply;break}for(var n=0,o=0;o<a.length;o++)a[o].is_apply==r&&a[o].hasOwnProperty("is_gift")&&n++;for(var o=0;o<a.length;o++)-1!=jQuery.inArray(a[o].id,e)&&a[o].hasOwnProperty("is_gift")&&a.splice(o,n);localStorage.setItem("spcart",JSON.stringify(a))}function IsFreeShipping(t){var a=0,e=0,r="spcart",o=[];if(null!=localStorage.getItem(r)){o=JSON.parse(localStorage.getItem(r));for(var l=0;l<o.length;l++)o[l].hasOwnProperty("is_gift")||(e+=parseInt(o[l].amount))}var n=0;return void 0!=t&&(n+=parseInt(t)),$.ajax({url:"/products/checkPromotion",type:"post",data:"shopping="+JSON.stringify(o)+"&amount="+encodeURI(e)+"&total_discount="+encodeURI(n)+"&type="+encodeURI(2),async:!1,success:function(t){t=t.replace(/ /g,""),a=t}}),a}function clearPromotion(t,a){var e=[],r="spcart";null!=localStorage.getItem(r)&&(e=JSON.parse(localStorage.getItem(r))),t=parseInt(t);for(var o=0;o<e.length;o++)if(e[o].hasOwnProperty("date")&&""!=e[o].date&&t>parseInt(e[o].date)){e.splice(o,e[o].length);break}if(localStorage.setItem(r,JSON.stringify(e)),9==a||10==a){for(var l=[],n=0,o=0;o<e.length;o++)9==a&&null!=e[o].cate_apply&&(l[o]=e[o].cate_apply,n++);for(var i=!1,o=0;o<e.length;o++)9==a&&e[o].hasOwnProperty("cate_apply")&&""!=e[o].cate_apply&&-1!==$.inArray(e[o].cate_apply,l)&&(e.splice(o,n),i=!0)}}$(document).ready(function(){var t="spcart",a=[];null!=localStorage.getItem(t)&&(a=JSON.parse(localStorage.getItem(t)));for(var e="",r="",o="",l=0;l<a.length;l++)e+=a[l].id+",",a[l].hasOwnProperty("cate_apply")&&""!=a[l].cate_apply&&(r+=a[l].cate_apply+","),a[l].hasOwnProperty("brand_10")&&""!=a[l].brand_10&&(o+=a[l].brand_10);""!=e&&(clear_promotion(e,4),clear_promotion(e,5),clear_promotion(e,6),clear_promotion(e,12)),""!=r&&clear_promotion(r,9),""!=o&&(clear_promotion(o,10),clear_promotion(o,13))});
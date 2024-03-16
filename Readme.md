Data Association:- 
-> ek model se dusre model ke data ko jod dena id ke through matlb ki agar aapke paas ek user h to wo post banayega hi , jab post banega wo user ke dawara hi bangea to hum kya krte h jab do aise data aapas me closely related hote h to unko hum jod dete h, ek model ke bane hue data ki id ko dusre ke model ke data ko de dete h ,aur iss model ke data ki id pichle model ke data ko de dete h.

Ex-> user ki id post ke pass and post ki id user ke pass , isse hum dono user aur post ko pehchan skte h , jaise user ke pass apna post ka id hoga usse post ka idea ho jaayega aur post ke pass user ka id hoga usse user ka pata chal jaayega.



Steps :
1. Two Model banao:
   1. User model in user.js
   2. Post model in posts.js

2. ab ek route banao jisme ek user ban jaaye

Roadmap for routes in projects
/route par login and signup
/profile pe profile dikhegi and saved post dikhengi
 ek uploaded section hoga jo baad me banega
/feed section hoga jaha saare img hongi
clikc krke open hogi
/board/:boardname pe poora board dikhega.


Step1. hamne passport set kiya , authenticate kiya ki pehle user login krega then profile pe aayga.
we are using passport library.

Step2. Creating Pages:
issme hi create account (register) waala page banaya


Day 2 :
now we are creating flash -> agar login krte waqt credidential incorrect ho jaaye then ek flash msg dikhe
-> so pehle npm i flash-connect install kro then require kro 
-> uske baad setup kro app.js me 
-> then login route me failureflash: true kro
-> Now error show kr do login route me

----show login information----
-> Used ejs to show login information to profile page.

---Creating actual post--- 

-> we nee to include multer
npm i uuid multer
-> we have two packages first is uuid and second is multer

uuid-> iske through appko unique name milta h file ka
multer -> ek package h , jske help se image upload kr skte h.




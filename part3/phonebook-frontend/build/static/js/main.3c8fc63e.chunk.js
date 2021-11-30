(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{24:function(e,t,n){},45:function(e,t,n){"use strict";n.r(t);var a=n(19),c=n.n(a),r=(n(24),n(10)),o=n(4),u=n(2),s=n(0),i=function(e){var t=e.notification;if(null===t.type)return null;var n="notification-".concat(t.type),a="success"===t.type?"Success!":"error"===t.type?"Error!":t.type;return Object(s.jsxs)("div",{className:"notification-card ".concat(n),children:[Object(s.jsx)("div",{className:"notification-title",children:a}),Object(s.jsx)("div",{className:"notification-message",children:t.message})]})},l=function(e){var t=e.persons,n=e.nameFilter,a=e.handleDeletePerson,c=t.filter((function(e){return e.name.toLowerCase().includes(n.toLowerCase())}));return Object(s.jsx)(s.Fragment,{children:c.map((function(e){return Object(s.jsxs)("p",{children:[e.name," ",e.number," ",Object(s.jsx)("button",{onClick:function(){a(e)},children:"delete"})]},e.id)}))})},d=function(e){var t=e.labelText,n=e.value,a=e.handleInput;return Object(s.jsxs)("div",{children:[t," ",Object(s.jsx)("input",{onChange:a,value:n})]})},f=function(e){var t=e.handleClick,n=e.text;return Object(s.jsx)("div",{children:Object(s.jsx)("button",{onClick:t,type:"submit",children:n})})},b=n(3),p=n.n(b),j=n(5),m=n(6),h=n.n(m),v="/api/persons",O=function(){var e=Object(j.a)(p.a.mark((function e(){var t;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,h.a.get(v);case 2:return t=e.sent,e.abrupt("return",t.data);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),x=function(){var e=Object(j.a)(p.a.mark((function e(t){var n;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,h.a.post(v,t);case 2:return n=e.sent,e.abrupt("return",n.data);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),y=function(){var e=Object(j.a)(p.a.mark((function e(t){var n;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,h.a.put("".concat(v,"/").concat(t.id),t);case 2:return n=e.sent,e.abrupt("return",n.data);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),w=function(){var e=Object(j.a)(p.a.mark((function e(t){var n;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,h.a.delete("".concat(v,"/").concat(t));case 2:return n=e.sent,e.abrupt("return",n.data);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),g={readContacts:O,addContact:x,updateContact:y,deleteContact:w},C=function(){var e=Object(u.useState)([]),t=Object(o.a)(e,2),n=t[0],a=t[1],c=Object(u.useState)(""),b=Object(o.a)(c,2),p=b[0],j=b[1],m=Object(u.useState)(""),h=Object(o.a)(m,2),v=h[0],O=h[1],x=Object(u.useState)(""),y=Object(o.a)(x,2),w=y[0],C=y[1],k=Object(u.useState)({type:null,message:""}),T=Object(o.a)(k,2),S=T[0],D=T[1];Object(u.useEffect)((function(){g.readContacts().then((function(e){return a(e)}))}),[]);return Object(s.jsxs)("div",{children:[Object(s.jsx)("h2",{children:"Phonebook"}),Object(s.jsx)(i,{notification:S}),Object(s.jsx)(d,{labelText:"filter shown with ",handleInput:function(e){C(e.target.value)},value:w}),Object(s.jsx)("h2",{children:"add a new"}),Object(s.jsxs)("form",{children:[Object(s.jsx)(d,{labelText:"name: ",value:p,handleInput:function(e){j(e.target.value)}}),Object(s.jsx)(d,{labelText:"number: ",value:v,handleInput:function(e){O(e.target.value)}}),Object(s.jsx)(f,{handleClick:function(e){if(e.preventDefault(),n.some((function(e){return e.name===p}))){if(n.some((function(e){return e.number===v})))alert("".concat(p," is already added to phonebook"));else{var t=n.find((function(e){return e.name===p}));if(window.confirm("".concat(p," is already added to phonebook, replace the old number (").concat(t.number,") with the new number (").concat(v,") ?"))){var c=Object(r.a)(Object(r.a)({},t),{},{number:v});g.updateContact(c).then((function(e){a(n.map((function(t){return t.name===e.name?e:t}))),D({type:"success",message:"Updated contact details for ".concat(e.name)}),setTimeout((function(){D({type:null,message:""})}),5e3)}))}}return j(""),O(""),null}var o={name:p,number:v};g.addContact(o).then((function(e){var t=n.concat(e);a(t),D({type:"success",message:"Added contact details of ".concat(e.name)}),setTimeout((function(){D({type:null,message:""})}),5e3),j(""),O("")}))},text:"add"})]}),Object(s.jsx)("h2",{children:"Numbers"}),Object(s.jsx)(l,{persons:n,nameFilter:w,handleDeletePerson:function(e){if(window.confirm("Delete ".concat(e.name," ?"))){var t=n.filter((function(t){return t.id!==e.id}));a(t),g.deleteContact(e.id).then((function(){D({type:"success",message:"Deleted contact details for ".concat(e.name)}),setTimeout((function(){D({type:null,message:""})}),5e3)})).catch((function(){D({type:"error",message:"Contact details for ".concat(e.name," has already been removed from server!")}),setTimeout((function(){D({type:null,message:""})}),5e3)}))}}})]})};c.a.render(Object(s.jsx)(C,{}),document.getElementById("root"))}},[[45,1,2]]]);
//# sourceMappingURL=main.3c8fc63e.chunk.js.map
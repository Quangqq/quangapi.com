/*! DataTables 1.13.1
* ©2008-2022 SpryMedia Ltd - datatables.net/license
*/(function(factory){"use strict";if(typeof define==='function'&&define.amd){define(['jquery'],function($){return factory($,window,document);});}
else if(typeof exports==='object'){module.exports=function(root,$){if(!root){root=window;}
if(!$){$=typeof window!=='undefined'?require('jquery'):require('jquery')(root);}
return factory($,root,root.document);};}
else{window.DataTable=factory(jQuery,window,document);}}
(function($,window,document,undefined){"use strict";var DataTable=function(selector,options)
{if(this instanceof DataTable){return $(selector).DataTable(options);}
else{options=selector;}
this.$=function(sSelector,oOpts)
{return this.api(true).$(sSelector,oOpts);};this._=function(sSelector,oOpts)
{return this.api(true).rows(sSelector,oOpts).data();};this.api=function(traditional)
{return traditional?new _Api(_fnSettingsFromNode(this[_ext.iApiIndex])):new _Api(this);};this.fnAddData=function(data,redraw)
{var api=this.api(true);var rows=Array.isArray(data)&&(Array.isArray(data[0])||$.isPlainObject(data[0]))?api.rows.add(data):api.row.add(data);if(redraw===undefined||redraw){api.draw();}
return rows.flatten().toArray();};this.fnAdjustColumnSizing=function(bRedraw)
{var api=this.api(true).columns.adjust();var settings=api.settings()[0];var scroll=settings.oScroll;if(bRedraw===undefined||bRedraw){api.draw(false);}
else if(scroll.sX!==""||scroll.sY!==""){_fnScrollDraw(settings);}};this.fnClearTable=function(bRedraw)
{var api=this.api(true).clear();if(bRedraw===undefined||bRedraw){api.draw();}};this.fnClose=function(nTr)
{this.api(true).row(nTr).child.hide();};this.fnDeleteRow=function(target,callback,redraw)
{var api=this.api(true);var rows=api.rows(target);var settings=rows.settings()[0];var data=settings.aoData[rows[0][0]];rows.remove();if(callback){callback.call(this,settings,data);}
if(redraw===undefined||redraw){api.draw();}
return data;};this.fnDestroy=function(remove)
{this.api(true).destroy(remove);};this.fnDraw=function(complete)
{this.api(true).draw(complete);};this.fnFilter=function(sInput,iColumn,bRegex,bSmart,bShowGlobal,bCaseInsensitive)
{var api=this.api(true);if(iColumn===null||iColumn===undefined){api.search(sInput,bRegex,bSmart,bCaseInsensitive);}
else{api.column(iColumn).search(sInput,bRegex,bSmart,bCaseInsensitive);}
api.draw();};this.fnGetData=function(src,col)
{var api=this.api(true);if(src!==undefined){var type=src.nodeName?src.nodeName.toLowerCase():'';return col!==undefined||type=='td'||type=='th'?api.cell(src,col).data():api.row(src).data()||null;}
return api.data().toArray();};this.fnGetNodes=function(iRow)
{var api=this.api(true);return iRow!==undefined?api.row(iRow).node():api.rows().nodes().flatten().toArray();};this.fnGetPosition=function(node)
{var api=this.api(true);var nodeName=node.nodeName.toUpperCase();if(nodeName=='TR'){return api.row(node).index();}
else if(nodeName=='TD'||nodeName=='TH'){var cell=api.cell(node).index();return[cell.row,cell.columnVisible,cell.column];}
return null;};this.fnIsOpen=function(nTr)
{return this.api(true).row(nTr).child.isShown();};this.fnOpen=function(nTr,mHtml,sClass)
{return this.api(true).row(nTr).child(mHtml,sClass).show().child()[0];};this.fnPageChange=function(mAction,bRedraw)
{var api=this.api(true).page(mAction);if(bRedraw===undefined||bRedraw){api.draw(false);}};this.fnSetColumnVis=function(iCol,bShow,bRedraw)
{var api=this.api(true).column(iCol).visible(bShow);if(bRedraw===undefined||bRedraw){api.columns.adjust().draw();}};this.fnSettings=function()
{return _fnSettingsFromNode(this[_ext.iApiIndex]);};this.fnSort=function(aaSort)
{this.api(true).order(aaSort).draw();};this.fnSortListener=function(nNode,iColumn,fnCallback)
{this.api(true).order.listener(nNode,iColumn,fnCallback);};this.fnUpdate=function(mData,mRow,iColumn,bRedraw,bAction)
{var api=this.api(true);if(iColumn===undefined||iColumn===null){api.row(mRow).data(mData);}
else{api.cell(mRow,iColumn).data(mData);}
if(bAction===undefined||bAction){api.columns.adjust();}
if(bRedraw===undefined||bRedraw){api.draw();}
return 0;};this.fnVersionCheck=_ext.fnVersionCheck;var _that=this;var emptyInit=options===undefined;var len=this.length;if(emptyInit){options={};}
this.oApi=this.internal=_ext.internal;for(var fn in DataTable.ext.internal){if(fn){this[fn]=_fnExternApiFunc(fn);}}
this.each(function(){var o={};var oInit=len>1?_fnExtend(o,options,true):options;var i=0,iLen,j,jLen,k,kLen;var sId=this.getAttribute('id');var bInitHandedOff=false;var defaults=DataTable.defaults;var $this=$(this);if(this.nodeName.toLowerCase()!='table')
{_fnLog(null,0,'Non-table node initialisation ('+this.nodeName+')',2);return;}
_fnCompatOpts(defaults);_fnCompatCols(defaults.column);_fnCamelToHungarian(defaults,defaults,true);_fnCamelToHungarian(defaults.column,defaults.column,true);_fnCamelToHungarian(defaults,$.extend(oInit,$this.data()),true);var allSettings=DataTable.settings;for(i=0,iLen=allSettings.length;i<iLen;i++)
{var s=allSettings[i];if(s.nTable==this||(s.nTHead&&s.nTHead.parentNode==this)||(s.nTFoot&&s.nTFoot.parentNode==this)){var bRetrieve=oInit.bRetrieve!==undefined?oInit.bRetrieve:defaults.bRetrieve;var bDestroy=oInit.bDestroy!==undefined?oInit.bDestroy:defaults.bDestroy;if(emptyInit||bRetrieve)
{return s.oInstance;}
else if(bDestroy)
{s.oInstance.fnDestroy();break;}
else
{_fnLog(s,0,'Cannot reinitialise DataTable',3);return;}}
if(s.sTableId==this.id)
{allSettings.splice(i,1);break;}}
if(sId===null||sId==="")
{sId="DataTables_Table_"+(DataTable.ext._unique++);this.id=sId;}
var oSettings=$.extend(true,{},DataTable.models.oSettings,{"sDestroyWidth":$this[0].style.width,"sInstance":sId,"sTableId":sId});oSettings.nTable=this;oSettings.oApi=_that.internal;oSettings.oInit=oInit;allSettings.push(oSettings);oSettings.oInstance=(_that.length===1)?_that:$this.dataTable();_fnCompatOpts(oInit);_fnLanguageCompat(oInit.oLanguage);if(oInit.aLengthMenu&&!oInit.iDisplayLength)
{oInit.iDisplayLength=Array.isArray(oInit.aLengthMenu[0])?oInit.aLengthMenu[0][0]:oInit.aLengthMenu[0];}
oInit=_fnExtend($.extend(true,{},defaults),oInit);_fnMap(oSettings.oFeatures,oInit,["bPaginate","bLengthChange","bFilter","bSort","bSortMulti","bInfo","bProcessing","bAutoWidth","bSortClasses","bServerSide","bDeferRender"]);_fnMap(oSettings,oInit,["asStripeClasses","ajax","fnServerData","fnFormatNumber","sServerMethod","aaSorting","aaSortingFixed","aLengthMenu","sPaginationType","sAjaxSource","sAjaxDataProp","iStateDuration","sDom","bSortCellsTop","iTabIndex","fnStateLoadCallback","fnStateSaveCallback","renderer","searchDelay","rowId",["iCookieDuration","iStateDuration"],["oSearch","oPreviousSearch"],["aoSearchCols","aoPreSearchCols"],["iDisplayLength","_iDisplayLength"]]);_fnMap(oSettings.oScroll,oInit,[["sScrollX","sX"],["sScrollXInner","sXInner"],["sScrollY","sY"],["bScrollCollapse","bCollapse"]]);_fnMap(oSettings.oLanguage,oInit,"fnInfoCallback");_fnCallbackReg(oSettings,'aoDrawCallback',oInit.fnDrawCallback,'user');_fnCallbackReg(oSettings,'aoServerParams',oInit.fnServerParams,'user');_fnCallbackReg(oSettings,'aoStateSaveParams',oInit.fnStateSaveParams,'user');_fnCallbackReg(oSettings,'aoStateLoadParams',oInit.fnStateLoadParams,'user');_fnCallbackReg(oSettings,'aoStateLoaded',oInit.fnStateLoaded,'user');_fnCallbackReg(oSettings,'aoRowCallback',oInit.fnRowCallback,'user');_fnCallbackReg(oSettings,'aoRowCreatedCallback',oInit.fnCreatedRow,'user');_fnCallbackReg(oSettings,'aoHeaderCallback',oInit.fnHeaderCallback,'user');_fnCallbackReg(oSettings,'aoFooterCallback',oInit.fnFooterCallback,'user');_fnCallbackReg(oSettings,'aoInitComplete',oInit.fnInitComplete,'user');_fnCallbackReg(oSettings,'aoPreDrawCallback',oInit.fnPreDrawCallback,'user');oSettings.rowIdFn=_fnGetObjectDataFn(oInit.rowId);_fnBrowserDetect(oSettings);var oClasses=oSettings.oClasses;$.extend(oClasses,DataTable.ext.classes,oInit.oClasses);$this.addClass(oClasses.sTable);if(oSettings.iInitDisplayStart===undefined)
{oSettings.iInitDisplayStart=oInit.iDisplayStart;oSettings._iDisplayStart=oInit.iDisplayStart;}
if(oInit.iDeferLoading!==null)
{oSettings.bDeferLoading=true;var tmp=Array.isArray(oInit.iDeferLoading);oSettings._iRecordsDisplay=tmp?oInit.iDeferLoading[0]:oInit.iDeferLoading;oSettings._iRecordsTotal=tmp?oInit.iDeferLoading[1]:oInit.iDeferLoading;}
var oLanguage=oSettings.oLanguage;$.extend(true,oLanguage,oInit.oLanguage);if(oLanguage.sUrl)
{$.ajax({dataType:'json',url:oLanguage.sUrl,success:function(json){_fnCamelToHungarian(defaults.oLanguage,json);_fnLanguageCompat(json);$.extend(true,oLanguage,json,oSettings.oInit.oLanguage);_fnCallbackFire(oSettings,null,'i18n',[oSettings]);_fnInitialise(oSettings);},error:function(){_fnInitialise(oSettings);}});bInitHandedOff=true;}
else{_fnCallbackFire(oSettings,null,'i18n',[oSettings]);}
if(oInit.asStripeClasses===null)
{oSettings.asStripeClasses=[oClasses.sStripeOdd,oClasses.sStripeEven];}
var stripeClasses=oSettings.asStripeClasses;var rowOne=$this.children('tbody').find('tr').eq(0);if($.inArray(true,$.map(stripeClasses,function(el,i){return rowOne.hasClass(el);}))!==-1){$('tbody tr',this).removeClass(stripeClasses.join(' '));oSettings.asDestroyStripes=stripeClasses.slice();}
var anThs=[];var aoColumnsInit;var nThead=this.getElementsByTagName('thead');if(nThead.length!==0)
{_fnDetectHeader(oSettings.aoHeader,nThead[0]);anThs=_fnGetUniqueThs(oSettings);}
if(oInit.aoColumns===null)
{aoColumnsInit=[];for(i=0,iLen=anThs.length;i<iLen;i++)
{aoColumnsInit.push(null);}}
else
{aoColumnsInit=oInit.aoColumns;}
for(i=0,iLen=aoColumnsInit.length;i<iLen;i++)
{_fnAddColumn(oSettings,anThs?anThs[i]:null);}
_fnApplyColumnDefs(oSettings,oInit.aoColumnDefs,aoColumnsInit,function(iCol,oDef){_fnColumnOptions(oSettings,iCol,oDef);});if(rowOne.length){var a=function(cell,name){return cell.getAttribute('data-'+name)!==null?name:null;};$(rowOne[0]).children('th, td').each(function(i,cell){var col=oSettings.aoColumns[i];if(!col){_fnLog(oSettings,0,'Incorrect column count',18);}
if(col.mData===i){var sort=a(cell,'sort')||a(cell,'order');var filter=a(cell,'filter')||a(cell,'search');if(sort!==null||filter!==null){col.mData={_:i+'.display',sort:sort!==null?i+'.@data-'+sort:undefined,type:sort!==null?i+'.@data-'+sort:undefined,filter:filter!==null?i+'.@data-'+filter:undefined};_fnColumnOptions(oSettings,i);}}});}
var features=oSettings.oFeatures;var loadedInit=function(){if(oInit.aaSorting===undefined){var sorting=oSettings.aaSorting;for(i=0,iLen=sorting.length;i<iLen;i++){sorting[i][1]=oSettings.aoColumns[i].asSorting[0];}}
_fnSortingClasses(oSettings);if(features.bSort){_fnCallbackReg(oSettings,'aoDrawCallback',function(){if(oSettings.bSorted){var aSort=_fnSortFlatten(oSettings);var sortedColumns={};$.each(aSort,function(i,val){sortedColumns[val.src]=val.dir;});_fnCallbackFire(oSettings,null,'order',[oSettings,aSort,sortedColumns]);_fnSortAria(oSettings);}});}
_fnCallbackReg(oSettings,'aoDrawCallback',function(){if(oSettings.bSorted||_fnDataSource(oSettings)==='ssp'||features.bDeferRender){_fnSortingClasses(oSettings);}},'sc');var captions=$this.children('caption').each(function(){this._captionSide=$(this).css('caption-side');});var thead=$this.children('thead');if(thead.length===0){thead=$('<thead/>').appendTo($this);}
oSettings.nTHead=thead[0];var tbody=$this.children('tbody');if(tbody.length===0){tbody=$('<tbody/>').insertAfter(thead);}
oSettings.nTBody=tbody[0];var tfoot=$this.children('tfoot');if(tfoot.length===0&&captions.length>0&&(oSettings.oScroll.sX!==""||oSettings.oScroll.sY!=="")){tfoot=$('<tfoot/>').appendTo($this);}
if(tfoot.length===0||tfoot.children().length===0){$this.addClass(oClasses.sNoFooter);}
else if(tfoot.length>0){oSettings.nTFoot=tfoot[0];_fnDetectHeader(oSettings.aoFooter,oSettings.nTFoot);}
if(oInit.aaData){for(i=0;i<oInit.aaData.length;i++){_fnAddData(oSettings,oInit.aaData[i]);}}
else if(oSettings.bDeferLoading||_fnDataSource(oSettings)=='dom'){_fnAddTr(oSettings,$(oSettings.nTBody).children('tr'));}
oSettings.aiDisplay=oSettings.aiDisplayMaster.slice();oSettings.bInitialised=true;if(bInitHandedOff===false){_fnInitialise(oSettings);}};_fnCallbackReg(oSettings,'aoDrawCallback',_fnSaveState,'state_save');if(oInit.bStateSave)
{features.bStateSave=true;_fnLoadState(oSettings,oInit,loadedInit);}
else{loadedInit();}});_that=null;return this;};var _ext;var _Api;var _api_register;var _api_registerPlural;var _re_dic={};var _re_new_lines=/[\r\n\u2028]/g;var _re_html=/<.*?>/g;var _re_date=/^\d{2,4}[\.\/\-]\d{1,2}[\.\/\-]\d{1,2}([T ]{1}\d{1,2}[:\.]\d{2}([\.:]\d{2})?)?$/;var _re_escape_regex=new RegExp('(\\'+['/','.','*','+','?','|','(',')','[',']','{','}','\\','$','^','-'].join('|\\')+')','g');var _re_formatted_numeric=/['\u00A0,$£€¥%\u2009\u202F\u20BD\u20a9\u20BArfkɃΞ]/gi;var _empty=function(d){return!d||d===true||d==='-'?true:false;};var _intVal=function(s){var integer=parseInt(s,10);return!isNaN(integer)&&isFinite(s)?integer:null;};var _numToDecimal=function(num,decimalPoint){if(!_re_dic[decimalPoint]){_re_dic[decimalPoint]=new RegExp(_fnEscapeRegex(decimalPoint),'g');}
return typeof num==='string'&&decimalPoint!=='.'?num.replace(/\./g,'').replace(_re_dic[decimalPoint],'.'):num;};var _isNumber=function(d,decimalPoint,formatted){var strType=typeof d==='string';if(_empty(d)){return true;}
if(decimalPoint&&strType){d=_numToDecimal(d,decimalPoint);}
if(formatted&&strType){d=d.replace(_re_formatted_numeric,'');}
return!isNaN(parseFloat(d))&&isFinite(d);};var _isHtml=function(d){return _empty(d)||typeof d==='string';};var _htmlNumeric=function(d,decimalPoint,formatted){if(_empty(d)){return true;}
var html=_isHtml(d);return!html?null:_isNumber(_stripHtml(d),decimalPoint,formatted)?true:null;};var _pluck=function(a,prop,prop2){var out=[];var i=0,ien=a.length;if(prop2!==undefined){for(;i<ien;i++){if(a[i]&&a[i][prop]){out.push(a[i][prop][prop2]);}}}
else{for(;i<ien;i++){if(a[i]){out.push(a[i][prop]);}}}
return out;};var _pluck_order=function(a,order,prop,prop2)
{var out=[];var i=0,ien=order.length;if(prop2!==undefined){for(;i<ien;i++){if(a[order[i]][prop]){out.push(a[order[i]][prop][prop2]);}}}
else{for(;i<ien;i++){out.push(a[order[i]][prop]);}}
return out;};var _range=function(len,start)
{var out=[];var end;if(start===undefined){start=0;end=len;}
else{end=start;start=len;}
for(var i=start;i<end;i++){out.push(i);}
return out;};var _removeEmpty=function(a)
{var out=[];for(var i=0,ien=a.length;i<ien;i++){if(a[i]){out.push(a[i]);}}
return out;};var _stripHtml=function(d){return d.replace(_re_html,'');};var _areAllUnique=function(src){if(src.length<2){return true;}
var sorted=src.slice().sort();var last=sorted[0];for(var i=1,ien=sorted.length;i<ien;i++){if(sorted[i]===last){return false;}
last=sorted[i];}
return true;};var _unique=function(src)
{if(_areAllUnique(src)){return src.slice();}
var
out=[],val,i,ien=src.length,j,k=0;again:for(i=0;i<ien;i++){val=src[i];for(j=0;j<k;j++){if(out[j]===val){continue again;}}
out.push(val);k++;}
return out;};var _flatten=function(out,val){if(Array.isArray(val)){for(var i=0;i<val.length;i++){_flatten(out,val[i]);}}
else{out.push(val);}
return out;}
var _includes=function(search,start){if(start===undefined){start=0;}
return this.indexOf(search,start)!==-1;};if(!Array.isArray){Array.isArray=function(arg){return Object.prototype.toString.call(arg)==='[object Array]';};}
if(!Array.prototype.includes){Array.prototype.includes=_includes;}
if(!String.prototype.trim){String.prototype.trim=function(){return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,'');};}
if(!String.prototype.includes){String.prototype.includes=_includes;}
DataTable.util={throttle:function(fn,freq){var
frequency=freq!==undefined?freq:200,last,timer;return function(){var
that=this,now=+new Date(),args=arguments;if(last&&now<last+frequency){clearTimeout(timer);timer=setTimeout(function(){last=undefined;fn.apply(that,args);},frequency);}
else{last=now;fn.apply(that,args);}};},escapeRegex:function(val){return val.replace(_re_escape_regex,'\\$1');},set:function(source){if($.isPlainObject(source)){return DataTable.util.set(source._);}
else if(source===null){return function(){};}
else if(typeof source==='function'){return function(data,val,meta){source(data,'set',val,meta);};}
else if(typeof source==='string'&&(source.indexOf('.')!==-1||source.indexOf('[')!==-1||source.indexOf('(')!==-1))
{var setData=function(data,val,src){var a=_fnSplitObjNotation(src),b;var aLast=a[a.length-1];var arrayNotation,funcNotation,o,innerSrc;for(var i=0,iLen=a.length-1;i<iLen;i++){if(a[i]==='__proto__'||a[i]==='constructor'){throw new Error('Cannot set prototype values');}
arrayNotation=a[i].match(__reArray);funcNotation=a[i].match(__reFn);if(arrayNotation){a[i]=a[i].replace(__reArray,'');data[a[i]]=[];b=a.slice();b.splice(0,i+1);innerSrc=b.join('.');if(Array.isArray(val)){for(var j=0,jLen=val.length;j<jLen;j++){o={};setData(o,val[j],innerSrc);data[a[i]].push(o);}}
else{data[a[i]]=val;}
return;}
else if(funcNotation){a[i]=a[i].replace(__reFn,'');data=data[a[i]](val);}
if(data[a[i]]===null||data[a[i]]===undefined){data[a[i]]={};}
data=data[a[i]];}
if(aLast.match(__reFn)){data=data[aLast.replace(__reFn,'')](val);}
else{data[aLast.replace(__reArray,'')]=val;}};return function(data,val){return setData(data,val,source);};}
else{return function(data,val){data[source]=val;};}},get:function(source){if($.isPlainObject(source)){var o={};$.each(source,function(key,val){if(val){o[key]=DataTable.util.get(val);}});return function(data,type,row,meta){var t=o[type]||o._;return t!==undefined?t(data,type,row,meta):data;};}
else if(source===null){return function(data){return data;};}
else if(typeof source==='function'){return function(data,type,row,meta){return source(data,type,row,meta);};}
else if(typeof source==='string'&&(source.indexOf('.')!==-1||source.indexOf('[')!==-1||source.indexOf('(')!==-1))
{var fetchData=function(data,type,src){var arrayNotation,funcNotation,out,innerSrc;if(src!==""){var a=_fnSplitObjNotation(src);for(var i=0,iLen=a.length;i<iLen;i++){arrayNotation=a[i].match(__reArray);funcNotation=a[i].match(__reFn);if(arrayNotation){a[i]=a[i].replace(__reArray,'');if(a[i]!==""){data=data[a[i]];}
out=[];a.splice(0,i+1);innerSrc=a.join('.');if(Array.isArray(data)){for(var j=0,jLen=data.length;j<jLen;j++){out.push(fetchData(data[j],type,innerSrc));}}
var join=arrayNotation[0].substring(1,arrayNotation[0].length-1);data=(join==="")?out:out.join(join);break;}
else if(funcNotation){a[i]=a[i].replace(__reFn,'');data=data[a[i]]();continue;}
if(data===null||data[a[i]]===undefined){return undefined;}
data=data[a[i]];}}
return data;};return function(data,type){return fetchData(data,type,source);};}
else{return function(data,type){return data[source];};}}};function _fnHungarianMap(o)
{var
hungarian='a aa ai ao as b fn i m o s ',match,newKey,map={};$.each(o,function(key,val){match=key.match(/^([^A-Z]+?)([A-Z])/);if(match&&hungarian.indexOf(match[1]+' ')!==-1)
{newKey=key.replace(match[0],match[2].toLowerCase());map[newKey]=key;if(match[1]==='o')
{_fnHungarianMap(o[key]);}}});o._hungarianMap=map;}
function _fnCamelToHungarian(src,user,force)
{if(!src._hungarianMap){_fnHungarianMap(src);}
var hungarianKey;$.each(user,function(key,val){hungarianKey=src._hungarianMap[key];if(hungarianKey!==undefined&&(force||user[hungarianKey]===undefined))
{if(hungarianKey.charAt(0)==='o')
{if(!user[hungarianKey]){user[hungarianKey]={};}
$.extend(true,user[hungarianKey],user[key]);_fnCamelToHungarian(src[hungarianKey],user[hungarianKey],force);}
else{user[hungarianKey]=user[key];}}});}
function _fnLanguageCompat(lang)
{var defaults=DataTable.defaults.oLanguage;var defaultDecimal=defaults.sDecimal;if(defaultDecimal){_addNumericSort(defaultDecimal);}
if(lang){var zeroRecords=lang.sZeroRecords;if(!lang.sEmptyTable&&zeroRecords&&defaults.sEmptyTable==="No data available in table")
{_fnMap(lang,lang,'sZeroRecords','sEmptyTable');}
if(!lang.sLoadingRecords&&zeroRecords&&defaults.sLoadingRecords==="Loading...")
{_fnMap(lang,lang,'sZeroRecords','sLoadingRecords');}
if(lang.sInfoThousands){lang.sThousands=lang.sInfoThousands;}
var decimal=lang.sDecimal;if(decimal&&defaultDecimal!==decimal){_addNumericSort(decimal);}}}
var _fnCompatMap=function(o,knew,old){if(o[knew]!==undefined){o[old]=o[knew];}};function _fnCompatOpts(init)
{_fnCompatMap(init,'ordering','bSort');_fnCompatMap(init,'orderMulti','bSortMulti');_fnCompatMap(init,'orderClasses','bSortClasses');_fnCompatMap(init,'orderCellsTop','bSortCellsTop');_fnCompatMap(init,'order','aaSorting');_fnCompatMap(init,'orderFixed','aaSortingFixed');_fnCompatMap(init,'paging','bPaginate');_fnCompatMap(init,'pagingType','sPaginationType');_fnCompatMap(init,'pageLength','iDisplayLength');_fnCompatMap(init,'searching','bFilter');if(typeof init.sScrollX==='boolean'){init.sScrollX=init.sScrollX?'100%':'';}
if(typeof init.scrollX==='boolean'){init.scrollX=init.scrollX?'100%':'';}
var searchCols=init.aoSearchCols;if(searchCols){for(var i=0,ien=searchCols.length;i<ien;i++){if(searchCols[i]){_fnCamelToHungarian(DataTable.models.oSearch,searchCols[i]);}}}}
function _fnCompatCols(init)
{_fnCompatMap(init,'orderable','bSortable');_fnCompatMap(init,'orderData','aDataSort');_fnCompatMap(init,'orderSequence','asSorting');_fnCompatMap(init,'orderDataType','sortDataType');var dataSort=init.aDataSort;if(typeof dataSort==='number'&&!Array.isArray(dataSort)){init.aDataSort=[dataSort];}}
function _fnBrowserDetect(settings)
{if(!DataTable.__browser){var browser={};DataTable.__browser=browser;var n=$('<div/>').css({position:'fixed',top:0,left:$(window).scrollLeft()*-1,height:1,width:1,overflow:'hidden'}).append($('<div/>').css({position:'absolute',top:1,left:1,width:100,overflow:'scroll'}).append($('<div/>').css({width:'100%',height:10}))).appendTo('body');var outer=n.children();var inner=outer.children();browser.barWidth=outer[0].offsetWidth-outer[0].clientWidth;browser.bScrollOversize=inner[0].offsetWidth===100&&outer[0].clientWidth!==100;browser.bScrollbarLeft=Math.round(inner.offset().left)!==1;browser.bBounding=n[0].getBoundingClientRect().width?true:false;n.remove();}
$.extend(settings.oBrowser,DataTable.__browser);settings.oScroll.iBarWidth=DataTable.__browser.barWidth;}
function _fnReduce(that,fn,init,start,end,inc)
{var
i=start,value,isSet=false;if(init!==undefined){value=init;isSet=true;}
while(i!==end){if(!that.hasOwnProperty(i)){continue;}
value=isSet?fn(value,that[i],i,that):that[i];isSet=true;i+=inc;}
return value;}
function _fnAddColumn(oSettings,nTh)
{var oDefaults=DataTable.defaults.column;var iCol=oSettings.aoColumns.length;var oCol=$.extend({},DataTable.models.oColumn,oDefaults,{"nTh":nTh?nTh:document.createElement('th'),"sTitle":oDefaults.sTitle?oDefaults.sTitle:nTh?nTh.innerHTML:'',"aDataSort":oDefaults.aDataSort?oDefaults.aDataSort:[iCol],"mData":oDefaults.mData?oDefaults.mData:iCol,idx:iCol});oSettings.aoColumns.push(oCol);var searchCols=oSettings.aoPreSearchCols;searchCols[iCol]=$.extend({},DataTable.models.oSearch,searchCols[iCol]);_fnColumnOptions(oSettings,iCol,$(nTh).data());}
function _fnColumnOptions(oSettings,iCol,oOptions)
{var oCol=oSettings.aoColumns[iCol];var oClasses=oSettings.oClasses;var th=$(oCol.nTh);if(!oCol.sWidthOrig){oCol.sWidthOrig=th.attr('width')||null;var t=(th.attr('style')||'').match(/width:\s*(\d+[pxem%]+)/);if(t){oCol.sWidthOrig=t[1];}}
if(oOptions!==undefined&&oOptions!==null)
{_fnCompatCols(oOptions);_fnCamelToHungarian(DataTable.defaults.column,oOptions,true);if(oOptions.mDataProp!==undefined&&!oOptions.mData)
{oOptions.mData=oOptions.mDataProp;}
if(oOptions.sType)
{oCol._sManualType=oOptions.sType;}
if(oOptions.className&&!oOptions.sClass)
{oOptions.sClass=oOptions.className;}
if(oOptions.sClass){th.addClass(oOptions.sClass);}
var origClass=oCol.sClass;$.extend(oCol,oOptions);_fnMap(oCol,oOptions,"sWidth","sWidthOrig");if(origClass!==oCol.sClass){oCol.sClass=origClass+' '+oCol.sClass;}
if(oOptions.iDataSort!==undefined)
{oCol.aDataSort=[oOptions.iDataSort];}
_fnMap(oCol,oOptions,"aDataSort");}
var mDataSrc=oCol.mData;var mData=_fnGetObjectDataFn(mDataSrc);var mRender=oCol.mRender?_fnGetObjectDataFn(oCol.mRender):null;var attrTest=function(src){return typeof src==='string'&&src.indexOf('@')!==-1;};oCol._bAttrSrc=$.isPlainObject(mDataSrc)&&(attrTest(mDataSrc.sort)||attrTest(mDataSrc.type)||attrTest(mDataSrc.filter));oCol._setter=null;oCol.fnGetData=function(rowData,type,meta){var innerData=mData(rowData,type,undefined,meta);return mRender&&type?mRender(innerData,type,rowData,meta):innerData;};oCol.fnSetData=function(rowData,val,meta){return _fnSetObjectDataFn(mDataSrc)(rowData,val,meta);};if(typeof mDataSrc!=='number'){oSettings._rowReadObject=true;}
if(!oSettings.oFeatures.bSort)
{oCol.bSortable=false;th.addClass(oClasses.sSortableNone);}
var bAsc=$.inArray('asc',oCol.asSorting)!==-1;var bDesc=$.inArray('desc',oCol.asSorting)!==-1;if(!oCol.bSortable||(!bAsc&&!bDesc))
{oCol.sSortingClass=oClasses.sSortableNone;oCol.sSortingClassJUI="";}
else if(bAsc&&!bDesc)
{oCol.sSortingClass=oClasses.sSortableAsc;oCol.sSortingClassJUI=oClasses.sSortJUIAscAllowed;}
else if(!bAsc&&bDesc)
{oCol.sSortingClass=oClasses.sSortableDesc;oCol.sSortingClassJUI=oClasses.sSortJUIDescAllowed;}
else
{oCol.sSortingClass=oClasses.sSortable;oCol.sSortingClassJUI=oClasses.sSortJUI;}}
function _fnAdjustColumnSizing(settings)
{if(settings.oFeatures.bAutoWidth!==false)
{var columns=settings.aoColumns;_fnCalculateColumnWidths(settings);for(var i=0,iLen=columns.length;i<iLen;i++)
{columns[i].nTh.style.width=columns[i].sWidth;}}
var scroll=settings.oScroll;if(scroll.sY!==''||scroll.sX!=='')
{_fnScrollDraw(settings);}
_fnCallbackFire(settings,null,'column-sizing',[settings]);}
function _fnVisibleToColumnIndex(oSettings,iMatch)
{var aiVis=_fnGetColumns(oSettings,'bVisible');return typeof aiVis[iMatch]==='number'?aiVis[iMatch]:null;}
function _fnColumnIndexToVisible(oSettings,iMatch)
{var aiVis=_fnGetColumns(oSettings,'bVisible');var iPos=$.inArray(iMatch,aiVis);return iPos!==-1?iPos:null;}
function _fnVisbleColumns(oSettings)
{var vis=0;$.each(oSettings.aoColumns,function(i,col){if(col.bVisible&&$(col.nTh).css('display')!=='none'){vis++;}});return vis;}
function _fnGetColumns(oSettings,sParam)
{var a=[];$.map(oSettings.aoColumns,function(val,i){if(val[sParam]){a.push(i);}});return a;}
function _fnColumnTypes(settings)
{var columns=settings.aoColumns;var data=settings.aoData;var types=DataTable.ext.type.detect;var i,ien,j,jen,k,ken;var col,cell,detectedType,cache;for(i=0,ien=columns.length;i<ien;i++){col=columns[i];cache=[];if(!col.sType&&col._sManualType){col.sType=col._sManualType;}
else if(!col.sType){for(j=0,jen=types.length;j<jen;j++){for(k=0,ken=data.length;k<ken;k++){if(cache[k]===undefined){cache[k]=_fnGetCellData(settings,k,i,'type');}
detectedType=types[j](cache[k],settings);if(!detectedType&&j!==types.length-1){break;}
if(detectedType==='html'&&!_empty(cache[k])){break;}}
if(detectedType){col.sType=detectedType;break;}}
if(!col.sType){col.sType='string';}}}}
function _fnApplyColumnDefs(oSettings,aoColDefs,aoCols,fn)
{var i,iLen,j,jLen,k,kLen,def;var columns=oSettings.aoColumns;if(aoColDefs)
{for(i=aoColDefs.length-1;i>=0;i--)
{def=aoColDefs[i];var aTargets=def.target!==undefined?def.target:def.targets!==undefined?def.targets:def.aTargets;if(!Array.isArray(aTargets))
{aTargets=[aTargets];}
for(j=0,jLen=aTargets.length;j<jLen;j++)
{if(typeof aTargets[j]==='number'&&aTargets[j]>=0)
{while(columns.length<=aTargets[j])
{_fnAddColumn(oSettings);}
fn(aTargets[j],def);}
else if(typeof aTargets[j]==='number'&&aTargets[j]<0)
{fn(columns.length+aTargets[j],def);}
else if(typeof aTargets[j]==='string')
{for(k=0,kLen=columns.length;k<kLen;k++)
{if(aTargets[j]=="_all"||$(columns[k].nTh).hasClass(aTargets[j]))
{fn(k,def);}}}}}}
if(aoCols)
{for(i=0,iLen=aoCols.length;i<iLen;i++)
{fn(i,aoCols[i]);}}}
function _fnAddData(oSettings,aDataIn,nTr,anTds)
{var iRow=oSettings.aoData.length;var oData=$.extend(true,{},DataTable.models.oRow,{src:nTr?'dom':'data',idx:iRow});oData._aData=aDataIn;oSettings.aoData.push(oData);var nTd,sThisType;var columns=oSettings.aoColumns;for(var i=0,iLen=columns.length;i<iLen;i++)
{columns[i].sType=null;}
oSettings.aiDisplayMaster.push(iRow);var id=oSettings.rowIdFn(aDataIn);if(id!==undefined){oSettings.aIds[id]=oData;}
if(nTr||!oSettings.oFeatures.bDeferRender)
{_fnCreateTr(oSettings,iRow,nTr,anTds);}
return iRow;}
function _fnAddTr(settings,trs)
{var row;if(!(trs instanceof $)){trs=$(trs);}
return trs.map(function(i,el){row=_fnGetRowElements(settings,el);return _fnAddData(settings,row.data,el,row.cells);});}
function _fnNodeToDataIndex(oSettings,n)
{return(n._DT_RowIndex!==undefined)?n._DT_RowIndex:null;}
function _fnNodeToColumnIndex(oSettings,iRow,n)
{return $.inArray(n,oSettings.aoData[iRow].anCells);}
function _fnGetCellData(settings,rowIdx,colIdx,type)
{if(type==='search'){type='filter';}
else if(type==='order'){type='sort';}
var draw=settings.iDraw;var col=settings.aoColumns[colIdx];var rowData=settings.aoData[rowIdx]._aData;var defaultContent=col.sDefaultContent;var cellData=col.fnGetData(rowData,type,{settings:settings,row:rowIdx,col:colIdx});if(cellData===undefined){if(settings.iDrawError!=draw&&defaultContent===null){_fnLog(settings,0,"Requested unknown parameter "+
(typeof col.mData=='function'?'{function}':"'"+col.mData+"'")+
" for row "+rowIdx+", column "+colIdx,4);settings.iDrawError=draw;}
return defaultContent;}
if((cellData===rowData||cellData===null)&&defaultContent!==null&&type!==undefined){cellData=defaultContent;}
else if(typeof cellData==='function'){return cellData.call(rowData);}
if(cellData===null&&type==='display'){return '';}
if(type==='filter'){var fomatters=DataTable.ext.type.search;if(fomatters[col.sType]){cellData=fomatters[col.sType](cellData);}}
return cellData;}
function _fnSetCellData(settings,rowIdx,colIdx,val)
{var col=settings.aoColumns[colIdx];var rowData=settings.aoData[rowIdx]._aData;col.fnSetData(rowData,val,{settings:settings,row:rowIdx,col:colIdx});}
var __reArray=/\[.*?\]$/;var __reFn=/\(\)$/;function _fnSplitObjNotation(str)
{return $.map(str.match(/(\\.|[^\.])+/g)||[''],function(s){return s.replace(/\\\./g,'.');});}
var _fnGetObjectDataFn=DataTable.util.get;var _fnSetObjectDataFn=DataTable.util.set;function _fnGetDataMaster(settings)
{return _pluck(settings.aoData,'_aData');}
function _fnClearTable(settings)
{settings.aoData.length=0;settings.aiDisplayMaster.length=0;settings.aiDisplay.length=0;settings.aIds={};}
function _fnDeleteIndex(a,iTarget,splice)
{var iTargetIndex=-1;for(var i=0,iLen=a.length;i<iLen;i++)
{if(a[i]==iTarget)
{iTargetIndex=i;}
else if(a[i]>iTarget)
{a[i]--;}}
if(iTargetIndex!=-1&&splice===undefined)
{a.splice(iTargetIndex,1);}}
function _fnInvalidate(settings,rowIdx,src,colIdx)
{var row=settings.aoData[rowIdx];var i,ien;var cellWrite=function(cell,col){while(cell.childNodes.length){cell.removeChild(cell.firstChild);}
cell.innerHTML=_fnGetCellData(settings,rowIdx,col,'display');};if(src==='dom'||((!src||src==='auto')&&row.src==='dom')){row._aData=_fnGetRowElements(settings,row,colIdx,colIdx===undefined?undefined:row._aData).data;}
else{var cells=row.anCells;if(cells){if(colIdx!==undefined){cellWrite(cells[colIdx],colIdx);}
else{for(i=0,ien=cells.length;i<ien;i++){cellWrite(cells[i],i);}}}}
row._aSortData=null;row._aFilterData=null;var cols=settings.aoColumns;if(colIdx!==undefined){cols[colIdx].sType=null;}
else{for(i=0,ien=cols.length;i<ien;i++){cols[i].sType=null;}
_fnRowAttributes(settings,row);}}
function _fnGetRowElements(settings,row,colIdx,d)
{var
tds=[],td=row.firstChild,name,col,o,i=0,contents,columns=settings.aoColumns,objectRead=settings._rowReadObject;d=d!==undefined?d:objectRead?{}:[];var attr=function(str,td){if(typeof str==='string'){var idx=str.indexOf('@');if(idx!==-1){var attr=str.substring(idx+1);var setter=_fnSetObjectDataFn(str);setter(d,td.getAttribute(attr));}}};var cellProcess=function(cell){if(colIdx===undefined||colIdx===i){col=columns[i];contents=(cell.innerHTML).trim();if(col&&col._bAttrSrc){var setter=_fnSetObjectDataFn(col.mData._);setter(d,contents);attr(col.mData.sort,cell);attr(col.mData.type,cell);attr(col.mData.filter,cell);}
else{if(objectRead){if(!col._setter){col._setter=_fnSetObjectDataFn(col.mData);}
col._setter(d,contents);}
else{d[i]=contents;}}}
i++;};if(td){while(td){name=td.nodeName.toUpperCase();if(name=="TD"||name=="TH"){cellProcess(td);tds.push(td);}
td=td.nextSibling;}}
else{tds=row.anCells;for(var j=0,jen=tds.length;j<jen;j++){cellProcess(tds[j]);}}
var rowNode=row.firstChild?row:row.nTr;if(rowNode){var id=rowNode.getAttribute('id');if(id){_fnSetObjectDataFn(settings.rowId)(d,id);}}
return{data:d,cells:tds};}
function _fnCreateTr(oSettings,iRow,nTrIn,anTds)
{var
row=oSettings.aoData[iRow],rowData=row._aData,cells=[],nTr,nTd,oCol,i,iLen,create;if(row.nTr===null)
{nTr=nTrIn||document.createElement('tr');row.nTr=nTr;row.anCells=cells;nTr._DT_RowIndex=iRow;_fnRowAttributes(oSettings,row);for(i=0,iLen=oSettings.aoColumns.length;i<iLen;i++)
{oCol=oSettings.aoColumns[i];create=nTrIn?false:true;nTd=create?document.createElement(oCol.sCellType):anTds[i];if(!nTd){_fnLog(oSettings,0,'Incorrect column count',18);}
nTd._DT_CellIndex={row:iRow,column:i};cells.push(nTd);if(create||((oCol.mRender||oCol.mData!==i)&&(!$.isPlainObject(oCol.mData)||oCol.mData._!==i+'.display'))){nTd.innerHTML=_fnGetCellData(oSettings,iRow,i,'display');}
if(oCol.sClass)
{nTd.className+=' '+oCol.sClass;}
if(oCol.bVisible&&!nTrIn)
{nTr.appendChild(nTd);}
else if(!oCol.bVisible&&nTrIn)
{nTd.parentNode.removeChild(nTd);}
if(oCol.fnCreatedCell)
{oCol.fnCreatedCell.call(oSettings.oInstance,nTd,_fnGetCellData(oSettings,iRow,i),rowData,iRow,i);}}
_fnCallbackFire(oSettings,'aoRowCreatedCallback',null,[nTr,rowData,iRow,cells]);}}
function _fnRowAttributes(settings,row)
{var tr=row.nTr;var data=row._aData;if(tr){var id=settings.rowIdFn(data);if(id){tr.id=id;}
if(data.DT_RowClass){var a=data.DT_RowClass.split(' ');row.__rowc=row.__rowc?_unique(row.__rowc.concat(a)):a;$(tr).removeClass(row.__rowc.join(' ')).addClass(data.DT_RowClass);}
if(data.DT_RowAttr){$(tr).attr(data.DT_RowAttr);}
if(data.DT_RowData){$(tr).data(data.DT_RowData);}}}
function _fnBuildHead(oSettings)
{var i,ien,cell,row,column;var thead=oSettings.nTHead;var tfoot=oSettings.nTFoot;var createHeader=$('th, td',thead).length===0;var classes=oSettings.oClasses;var columns=oSettings.aoColumns;if(createHeader){row=$('<tr/>').appendTo(thead);}
for(i=0,ien=columns.length;i<ien;i++){column=columns[i];cell=$(column.nTh).addClass(column.sClass);if(createHeader){cell.appendTo(row);}
if(oSettings.oFeatures.bSort){cell.addClass(column.sSortingClass);if(column.bSortable!==false){cell.attr('tabindex',oSettings.iTabIndex).attr('aria-controls',oSettings.sTableId);_fnSortAttachListener(oSettings,column.nTh,i);}}
if(column.sTitle!=cell[0].innerHTML){cell.html(column.sTitle);}
_fnRenderer(oSettings,'header')(oSettings,cell,column,classes);}
if(createHeader){_fnDetectHeader(oSettings.aoHeader,thead);}
$(thead).children('tr').children('th, td').addClass(classes.sHeaderTH);$(tfoot).children('tr').children('th, td').addClass(classes.sFooterTH);if(tfoot!==null){var cells=oSettings.aoFooter[0];for(i=0,ien=cells.length;i<ien;i++){column=columns[i];if(column){column.nTf=cells[i].cell;if(column.sClass){$(column.nTf).addClass(column.sClass);}}
else{_fnLog(oSettings,0,'Incorrect column count',18);}}}}
function _fnDrawHead(oSettings,aoSource,bIncludeHidden)
{var i,iLen,j,jLen,k,kLen,n,nLocalTr;var aoLocal=[];var aApplied=[];var iColumns=oSettings.aoColumns.length;var iRowspan,iColspan;if(!aoSource)
{return;}
if(bIncludeHidden===undefined)
{bIncludeHidden=false;}
for(i=0,iLen=aoSource.length;i<iLen;i++)
{aoLocal[i]=aoSource[i].slice();aoLocal[i].nTr=aoSource[i].nTr;for(j=iColumns-1;j>=0;j--)
{if(!oSettings.aoColumns[j].bVisible&&!bIncludeHidden)
{aoLocal[i].splice(j,1);}}
aApplied.push([]);}
for(i=0,iLen=aoLocal.length;i<iLen;i++)
{nLocalTr=aoLocal[i].nTr;if(nLocalTr)
{while((n=nLocalTr.firstChild))
{nLocalTr.removeChild(n);}}
for(j=0,jLen=aoLocal[i].length;j<jLen;j++)
{iRowspan=1;iColspan=1;if(aApplied[i][j]===undefined)
{nLocalTr.appendChild(aoLocal[i][j].cell);aApplied[i][j]=1;while(aoLocal[i+iRowspan]!==undefined&&aoLocal[i][j].cell==aoLocal[i+iRowspan][j].cell)
{aApplied[i+iRowspan][j]=1;iRowspan++;}
while(aoLocal[i][j+iColspan]!==undefined&&aoLocal[i][j].cell==aoLocal[i][j+iColspan].cell)
{for(k=0;k<iRowspan;k++)
{aApplied[i+k][j+iColspan]=1;}
iColspan++;}
$(aoLocal[i][j].cell).attr('rowspan',iRowspan).attr('colspan',iColspan);}}}}
function _fnDraw(oSettings,ajaxComplete)
{_fnStart(oSettings);var aPreDraw=_fnCallbackFire(oSettings,'aoPreDrawCallback','preDraw',[oSettings]);if($.inArray(false,aPreDraw)!==-1)
{_fnProcessingDisplay(oSettings,false);return;}
var anRows=[];var iRowCount=0;var asStripeClasses=oSettings.asStripeClasses;var iStripes=asStripeClasses.length;var oLang=oSettings.oLanguage;var bServerSide=_fnDataSource(oSettings)=='ssp';var aiDisplay=oSettings.aiDisplay;var iDisplayStart=oSettings._iDisplayStart;var iDisplayEnd=oSettings.fnDisplayEnd();oSettings.bDrawing=true;if(oSettings.bDeferLoading)
{oSettings.bDeferLoading=false;oSettings.iDraw++;_fnProcessingDisplay(oSettings,false);}
else if(!bServerSide)
{oSettings.iDraw++;}
else if(!oSettings.bDestroying&&!ajaxComplete)
{_fnAjaxUpdate(oSettings);return;}
if(aiDisplay.length!==0)
{var iStart=bServerSide?0:iDisplayStart;var iEnd=bServerSide?oSettings.aoData.length:iDisplayEnd;for(var j=iStart;j<iEnd;j++)
{var iDataIndex=aiDisplay[j];var aoData=oSettings.aoData[iDataIndex];if(aoData.nTr===null)
{_fnCreateTr(oSettings,iDataIndex);}
var nRow=aoData.nTr;if(iStripes!==0)
{var sStripe=asStripeClasses[iRowCount%iStripes];if(aoData._sRowStripe!=sStripe)
{$(nRow).removeClass(aoData._sRowStripe).addClass(sStripe);aoData._sRowStripe=sStripe;}}
_fnCallbackFire(oSettings,'aoRowCallback',null,[nRow,aoData._aData,iRowCount,j,iDataIndex]);anRows.push(nRow);iRowCount++;}}
else
{var sZero=oLang.sZeroRecords;if(oSettings.iDraw==1&&_fnDataSource(oSettings)=='ajax')
{sZero=oLang.sLoadingRecords;}
else if(oLang.sEmptyTable&&oSettings.fnRecordsTotal()===0)
{sZero=oLang.sEmptyTable;}
anRows[0]=$('<tr/>',{'class':iStripes?asStripeClasses[0]:''}).append($('<td />',{'valign':'top','colSpan':_fnVisbleColumns(oSettings),'class':oSettings.oClasses.sRowEmpty}).html(sZero))[0];}
_fnCallbackFire(oSettings,'aoHeaderCallback','header',[$(oSettings.nTHead).children('tr')[0],_fnGetDataMaster(oSettings),iDisplayStart,iDisplayEnd,aiDisplay]);_fnCallbackFire(oSettings,'aoFooterCallback','footer',[$(oSettings.nTFoot).children('tr')[0],_fnGetDataMaster(oSettings),iDisplayStart,iDisplayEnd,aiDisplay]);var body=$(oSettings.nTBody);body.children().detach();body.append($(anRows));_fnCallbackFire(oSettings,'aoDrawCallback','draw',[oSettings]);oSettings.bSorted=false;oSettings.bFiltered=false;oSettings.bDrawing=false;}
function _fnReDraw(settings,holdPosition)
{var
features=settings.oFeatures,sort=features.bSort,filter=features.bFilter;if(sort){_fnSort(settings);}
if(filter){_fnFilterComplete(settings,settings.oPreviousSearch);}
else{settings.aiDisplay=settings.aiDisplayMaster.slice();}
if(holdPosition!==true){settings._iDisplayStart=0;}
settings._drawHold=holdPosition;_fnDraw(settings);settings._drawHold=false;}
function _fnAddOptionsHtml(oSettings)
{var classes=oSettings.oClasses;var table=$(oSettings.nTable);var holding=$('<div/>').insertBefore(table);var features=oSettings.oFeatures;var insert=$('<div/>',{id:oSettings.sTableId+'_wrapper','class':classes.sWrapper+(oSettings.nTFoot?'':' '+classes.sNoFooter)});oSettings.nHolding=holding[0];oSettings.nTableWrapper=insert[0];oSettings.nTableReinsertBefore=oSettings.nTable.nextSibling;var aDom=oSettings.sDom.split('');var featureNode,cOption,nNewNode,cNext,sAttr,j;for(var i=0;i<aDom.length;i++)
{featureNode=null;cOption=aDom[i];if(cOption=='<')
{nNewNode=$('<div/>')[0];cNext=aDom[i+1];if(cNext=="'"||cNext=='"')
{sAttr="";j=2;while(aDom[i+j]!=cNext)
{sAttr+=aDom[i+j];j++;}
if(sAttr=="H")
{sAttr=classes.sJUIHeader;}
else if(sAttr=="F")
{sAttr=classes.sJUIFooter;}
if(sAttr.indexOf('.')!=-1)
{var aSplit=sAttr.split('.');nNewNode.id=aSplit[0].substr(1,aSplit[0].length-1);nNewNode.className=aSplit[1];}
else if(sAttr.charAt(0)=="#")
{nNewNode.id=sAttr.substr(1,sAttr.length-1);}
else
{nNewNode.className=sAttr;}
i+=j;}
insert.append(nNewNode);insert=$(nNewNode);}
else if(cOption=='>')
{insert=insert.parent();}
else if(cOption=='l'&&features.bPaginate&&features.bLengthChange)
{featureNode=_fnFeatureHtmlLength(oSettings);}
else if(cOption=='f'&&features.bFilter)
{featureNode=_fnFeatureHtmlFilter(oSettings);}
else if(cOption=='r'&&features.bProcessing)
{featureNode=_fnFeatureHtmlProcessing(oSettings);}
else if(cOption=='t')
{featureNode=_fnFeatureHtmlTable(oSettings);}
else if(cOption=='i'&&features.bInfo)
{featureNode=_fnFeatureHtmlInfo(oSettings);}
else if(cOption=='p'&&features.bPaginate)
{featureNode=_fnFeatureHtmlPaginate(oSettings);}
else if(DataTable.ext.feature.length!==0)
{var aoFeatures=DataTable.ext.feature;for(var k=0,kLen=aoFeatures.length;k<kLen;k++)
{if(cOption==aoFeatures[k].cFeature)
{featureNode=aoFeatures[k].fnInit(oSettings);break;}}}
if(featureNode)
{var aanFeatures=oSettings.aanFeatures;if(!aanFeatures[cOption])
{aanFeatures[cOption]=[];}
aanFeatures[cOption].push(featureNode);insert.append(featureNode);}}
holding.replaceWith(insert);oSettings.nHolding=null;}
function _fnDetectHeader(aLayout,nThead)
{var nTrs=$(nThead).children('tr');var nTr,nCell;var i,k,l,iLen,jLen,iColShifted,iColumn,iColspan,iRowspan;var bUnique;var fnShiftCol=function(a,i,j){var k=a[i];while(k[j]){j++;}
return j;};aLayout.splice(0,aLayout.length);for(i=0,iLen=nTrs.length;i<iLen;i++)
{aLayout.push([]);}
for(i=0,iLen=nTrs.length;i<iLen;i++)
{nTr=nTrs[i];iColumn=0;nCell=nTr.firstChild;while(nCell){if(nCell.nodeName.toUpperCase()=="TD"||nCell.nodeName.toUpperCase()=="TH")
{iColspan=nCell.getAttribute('colspan')*1;iRowspan=nCell.getAttribute('rowspan')*1;iColspan=(!iColspan||iColspan===0||iColspan===1)?1:iColspan;iRowspan=(!iRowspan||iRowspan===0||iRowspan===1)?1:iRowspan;iColShifted=fnShiftCol(aLayout,i,iColumn);bUnique=iColspan===1?true:false;for(l=0;l<iColspan;l++)
{for(k=0;k<iRowspan;k++)
{aLayout[i+k][iColShifted+l]={"cell":nCell,"unique":bUnique};aLayout[i+k].nTr=nTr;}}}
nCell=nCell.nextSibling;}}}
function _fnGetUniqueThs(oSettings,nHeader,aLayout)
{var aReturn=[];if(!aLayout)
{aLayout=oSettings.aoHeader;if(nHeader)
{aLayout=[];_fnDetectHeader(aLayout,nHeader);}}
for(var i=0,iLen=aLayout.length;i<iLen;i++)
{for(var j=0,jLen=aLayout[i].length;j<jLen;j++)
{if(aLayout[i][j].unique&&(!aReturn[j]||!oSettings.bSortCellsTop))
{aReturn[j]=aLayout[i][j].cell;}}}
return aReturn;}
function _fnStart(oSettings)
{var bServerSide=_fnDataSource(oSettings)=='ssp';var iInitDisplayStart=oSettings.iInitDisplayStart;if(iInitDisplayStart!==undefined&&iInitDisplayStart!==-1)
{oSettings._iDisplayStart=bServerSide?iInitDisplayStart:iInitDisplayStart>=oSettings.fnRecordsDisplay()?0:iInitDisplayStart;oSettings.iInitDisplayStart=-1;}}
function _fnBuildAjax(oSettings,data,fn)
{_fnCallbackFire(oSettings,'aoServerParams','serverParams',[data]);if(data&&Array.isArray(data)){var tmp={};var rbracket=/(.*?)\[\]$/;$.each(data,function(key,val){var match=val.name.match(rbracket);if(match){var name=match[0];if(!tmp[name]){tmp[name]=[];}
tmp[name].push(val.value);}
else{tmp[val.name]=val.value;}});data=tmp;}
var ajaxData;var ajax=oSettings.ajax;var instance=oSettings.oInstance;var callback=function(json){var status=oSettings.jqXHR?oSettings.jqXHR.status:null;if(json===null||(typeof status==='number'&&status==204)){json={};_fnAjaxDataSrc(oSettings,json,[]);}
var error=json.error||json.sError;if(error){_fnLog(oSettings,0,error);}
oSettings.json=json;_fnCallbackFire(oSettings,null,'xhr',[oSettings,json,oSettings.jqXHR]);fn(json);};if($.isPlainObject(ajax)&&ajax.data)
{ajaxData=ajax.data;var newData=typeof ajaxData==='function'?ajaxData(data,oSettings):ajaxData;data=typeof ajaxData==='function'&&newData?newData:$.extend(true,data,newData);delete ajax.data;}
var baseAjax={"data":data,"success":callback,"dataType":"json","cache":false,"type":oSettings.sServerMethod,"error":function(xhr,error,thrown){var ret=_fnCallbackFire(oSettings,null,'xhr',[oSettings,null,oSettings.jqXHR]);if($.inArray(true,ret)===-1){if(error=="parsererror"){_fnLog(oSettings,0,'Invalid JSON response',1);}
else if(xhr.readyState===4){_fnLog(oSettings,0,'Ajax error',7);}}
_fnProcessingDisplay(oSettings,false);}};oSettings.oAjaxData=data;_fnCallbackFire(oSettings,null,'preXhr',[oSettings,data]);if(oSettings.fnServerData)
{oSettings.fnServerData.call(instance,oSettings.sAjaxSource,$.map(data,function(val,key){return{name:key,value:val};}),callback,oSettings);}
else if(oSettings.sAjaxSource||typeof ajax==='string')
{oSettings.jqXHR=$.ajax($.extend(baseAjax,{url:ajax||oSettings.sAjaxSource}));}
else if(typeof ajax==='function')
{oSettings.jqXHR=ajax.call(instance,data,callback,oSettings);}
else
{oSettings.jqXHR=$.ajax($.extend(baseAjax,ajax));ajax.data=ajaxData;}}
function _fnAjaxUpdate(settings)
{settings.iDraw++;_fnProcessingDisplay(settings,true);_fnBuildAjax(settings,_fnAjaxParameters(settings),function(json){_fnAjaxUpdateDraw(settings,json);});}
function _fnAjaxParameters(settings)
{var
columns=settings.aoColumns,columnCount=columns.length,features=settings.oFeatures,preSearch=settings.oPreviousSearch,preColSearch=settings.aoPreSearchCols,i,data=[],dataProp,column,columnSearch,sort=_fnSortFlatten(settings),displayStart=settings._iDisplayStart,displayLength=features.bPaginate!==false?settings._iDisplayLength:-1;var param=function(name,value){data.push({'name':name,'value':value});};param('sEcho',settings.iDraw);param('iColumns',columnCount);param('sColumns',_pluck(columns,'sName').join(','));param('iDisplayStart',displayStart);param('iDisplayLength',displayLength);var d={draw:settings.iDraw,columns:[],order:[],start:displayStart,length:displayLength,search:{value:preSearch.sSearch,regex:preSearch.bRegex}};for(i=0;i<columnCount;i++){column=columns[i];columnSearch=preColSearch[i];dataProp=typeof column.mData=="function"?'function':column.mData;d.columns.push({data:dataProp,name:column.sName,searchable:column.bSearchable,orderable:column.bSortable,search:{value:columnSearch.sSearch,regex:columnSearch.bRegex}});param("mDataProp_"+i,dataProp);if(features.bFilter){param('sSearch_'+i,columnSearch.sSearch);param('bRegex_'+i,columnSearch.bRegex);param('bSearchable_'+i,column.bSearchable);}
if(features.bSort){param('bSortable_'+i,column.bSortable);}}
if(features.bFilter){param('sSearch',preSearch.sSearch);param('bRegex',preSearch.bRegex);}
if(features.bSort){$.each(sort,function(i,val){d.order.push({column:val.col,dir:val.dir});param('iSortCol_'+i,val.col);param('sSortDir_'+i,val.dir);});param('iSortingCols',sort.length);}
var legacy=DataTable.ext.legacy.ajax;if(legacy===null){return settings.sAjaxSource?data:d;}
return legacy?data:d;}
function _fnAjaxUpdateDraw(settings,json)
{var compat=function(old,modern){return json[old]!==undefined?json[old]:json[modern];};var data=_fnAjaxDataSrc(settings,json);var draw=compat('sEcho','draw');var recordsTotal=compat('iTotalRecords','recordsTotal');var recordsFiltered=compat('iTotalDisplayRecords','recordsFiltered');if(draw!==undefined){if(draw*1<settings.iDraw){return;}
settings.iDraw=draw*1;}
if(!data){data=[];}
_fnClearTable(settings);settings._iRecordsTotal=parseInt(recordsTotal,10);settings._iRecordsDisplay=parseInt(recordsFiltered,10);for(var i=0,ien=data.length;i<ien;i++){_fnAddData(settings,data[i]);}
settings.aiDisplay=settings.aiDisplayMaster.slice();_fnDraw(settings,true);if(!settings._bInitComplete){_fnInitComplete(settings,json);}
_fnProcessingDisplay(settings,false);}
function _fnAjaxDataSrc(oSettings,json,write)
{var dataSrc=$.isPlainObject(oSettings.ajax)&&oSettings.ajax.dataSrc!==undefined?oSettings.ajax.dataSrc:oSettings.sAjaxDataProp;if(!write){if(dataSrc==='data'){return json.aaData||json[dataSrc];}
return dataSrc!==""?_fnGetObjectDataFn(dataSrc)(json):json;}
_fnSetObjectDataFn(dataSrc)(json,write);}
function _fnFeatureHtmlFilter(settings)
{var classes=settings.oClasses;var tableId=settings.sTableId;var language=settings.oLanguage;var previousSearch=settings.oPreviousSearch;var features=settings.aanFeatures;var input='<input type="search" class="'+classes.sFilterInput+'"/>';var str=language.sSearch;str=str.match(/_INPUT_/)?str.replace('_INPUT_',input):str+input;var filter=$('<div/>',{'id':!features.f?tableId+'_filter':null,'class':classes.sFilter}).append($('<label/>').append(str));var searchFn=function(event){var n=features.f;var val=!this.value?"":this.value;if(previousSearch.return&&event.key!=="Enter"){return;}
if(val!=previousSearch.sSearch){_fnFilterComplete(settings,{"sSearch":val,"bRegex":previousSearch.bRegex,"bSmart":previousSearch.bSmart,"bCaseInsensitive":previousSearch.bCaseInsensitive,"return":previousSearch.return});settings._iDisplayStart=0;_fnDraw(settings);}};var searchDelay=settings.searchDelay!==null?settings.searchDelay:_fnDataSource(settings)==='ssp'?400:0;var jqFilter=$('input',filter).val(previousSearch.sSearch).attr('placeholder',language.sSearchPlaceholder).on('keyup.DT search.DT input.DT paste.DT cut.DT',searchDelay?_fnThrottle(searchFn,searchDelay):searchFn).on('mouseup',function(e){setTimeout(function(){searchFn.call(jqFilter[0],e);},10);}).on('keypress.DT',function(e){if(e.keyCode==13){return false;}}).attr('aria-controls',tableId);$(settings.nTable).on('search.dt.DT',function(ev,s){if(settings===s){try{if(jqFilter[0]!==document.activeElement){jqFilter.val(previousSearch.sSearch);}}
catch(e){}}});return filter[0];}
function _fnFilterComplete(oSettings,oInput,iForce)
{var oPrevSearch=oSettings.oPreviousSearch;var aoPrevSearch=oSettings.aoPreSearchCols;var fnSaveFilter=function(oFilter){oPrevSearch.sSearch=oFilter.sSearch;oPrevSearch.bRegex=oFilter.bRegex;oPrevSearch.bSmart=oFilter.bSmart;oPrevSearch.bCaseInsensitive=oFilter.bCaseInsensitive;oPrevSearch.return=oFilter.return;};var fnRegex=function(o){return o.bEscapeRegex!==undefined?!o.bEscapeRegex:o.bRegex;};_fnColumnTypes(oSettings);if(_fnDataSource(oSettings)!='ssp')
{_fnFilter(oSettings,oInput.sSearch,iForce,fnRegex(oInput),oInput.bSmart,oInput.bCaseInsensitive,oInput.return);fnSaveFilter(oInput);for(var i=0;i<aoPrevSearch.length;i++)
{_fnFilterColumn(oSettings,aoPrevSearch[i].sSearch,i,fnRegex(aoPrevSearch[i]),aoPrevSearch[i].bSmart,aoPrevSearch[i].bCaseInsensitive);}
_fnFilterCustom(oSettings);}
else
{fnSaveFilter(oInput);}
oSettings.bFiltered=true;_fnCallbackFire(oSettings,null,'search',[oSettings]);}
function _fnFilterCustom(settings)
{var filters=DataTable.ext.search;var displayRows=settings.aiDisplay;var row,rowIdx;for(var i=0,ien=filters.length;i<ien;i++){var rows=[];for(var j=0,jen=displayRows.length;j<jen;j++){rowIdx=displayRows[j];row=settings.aoData[rowIdx];if(filters[i](settings,row._aFilterData,rowIdx,row._aData,j)){rows.push(rowIdx);}}
displayRows.length=0;$.merge(displayRows,rows);}}
function _fnFilterColumn(settings,searchStr,colIdx,regex,smart,caseInsensitive)
{if(searchStr===''){return;}
var data;var out=[];var display=settings.aiDisplay;var rpSearch=_fnFilterCreateSearch(searchStr,regex,smart,caseInsensitive);for(var i=0;i<display.length;i++){data=settings.aoData[display[i]]._aFilterData[colIdx];if(rpSearch.test(data)){out.push(display[i]);}}
settings.aiDisplay=out;}
function _fnFilter(settings,input,force,regex,smart,caseInsensitive)
{var rpSearch=_fnFilterCreateSearch(input,regex,smart,caseInsensitive);var prevSearch=settings.oPreviousSearch.sSearch;var displayMaster=settings.aiDisplayMaster;var display,invalidated,i;var filtered=[];if(DataTable.ext.search.length!==0){force=true;}
invalidated=_fnFilterData(settings);if(input.length<=0){settings.aiDisplay=displayMaster.slice();}
else{if(invalidated||force||regex||prevSearch.length>input.length||input.indexOf(prevSearch)!==0||settings.bSorted){settings.aiDisplay=displayMaster.slice();}
display=settings.aiDisplay;for(i=0;i<display.length;i++){if(rpSearch.test(settings.aoData[display[i]]._sFilterRow)){filtered.push(display[i]);}}
settings.aiDisplay=filtered;}}
function _fnFilterCreateSearch(search,regex,smart,caseInsensitive)
{search=regex?search:_fnEscapeRegex(search);if(smart){var a=$.map(search.match(/"[^"]+"|[^ ]+/g)||[''],function(word){if(word.charAt(0)==='"'){var m=word.match(/^"(.*)"$/);word=m?m[1]:word;}
return word.replace('"','');});search='^(?=.*?'+a.join(')(?=.*?')+').*$';}
return new RegExp(search,caseInsensitive?'i':'');}
var _fnEscapeRegex=DataTable.util.escapeRegex;var __filter_div=$('<div>')[0];var __filter_div_textContent=__filter_div.textContent!==undefined;function _fnFilterData(settings)
{var columns=settings.aoColumns;var column;var i,j,ien,jen,filterData,cellData,row;var wasInvalidated=false;for(i=0,ien=settings.aoData.length;i<ien;i++){row=settings.aoData[i];if(!row._aFilterData){filterData=[];for(j=0,jen=columns.length;j<jen;j++){column=columns[j];if(column.bSearchable){cellData=_fnGetCellData(settings,i,j,'filter');if(cellData===null){cellData='';}
if(typeof cellData!=='string'&&cellData.toString){cellData=cellData.toString();}}
else{cellData='';}
if(cellData.indexOf&&cellData.indexOf('&')!==-1){__filter_div.innerHTML=cellData;cellData=__filter_div_textContent?__filter_div.textContent:__filter_div.innerText;}
if(cellData.replace){cellData=cellData.replace(/[\r\n\u2028]/g,'');}
filterData.push(cellData);}
row._aFilterData=filterData;row._sFilterRow=filterData.join('  ');wasInvalidated=true;}}
return wasInvalidated;}
function _fnSearchToCamel(obj)
{return{search:obj.sSearch,smart:obj.bSmart,regex:obj.bRegex,caseInsensitive:obj.bCaseInsensitive};}
function _fnSearchToHung(obj)
{return{sSearch:obj.search,bSmart:obj.smart,bRegex:obj.regex,bCaseInsensitive:obj.caseInsensitive};}
function _fnFeatureHtmlInfo(settings)
{var
tid=settings.sTableId,nodes=settings.aanFeatures.i,n=$('<div/>',{'class':settings.oClasses.sInfo,'id':!nodes?tid+'_info':null});if(!nodes){settings.aoDrawCallback.push({"fn":_fnUpdateInfo,"sName":"information"});n.attr('role','status').attr('aria-live','polite');$(settings.nTable).attr('aria-describedby',tid+'_info');}
return n[0];}
function _fnUpdateInfo(settings)
{var nodes=settings.aanFeatures.i;if(nodes.length===0){return;}
var
lang=settings.oLanguage,start=settings._iDisplayStart+1,end=settings.fnDisplayEnd(),max=settings.fnRecordsTotal(),total=settings.fnRecordsDisplay(),out=total?lang.sInfo:lang.sInfoEmpty;if(total!==max){out+=' '+lang.sInfoFiltered;}
out+=lang.sInfoPostFix;out=_fnInfoMacros(settings,out);var callback=lang.fnInfoCallback;if(callback!==null){out=callback.call(settings.oInstance,settings,start,end,max,total,out);}
$(nodes).html(out);}
function _fnInfoMacros(settings,str)
{var
formatter=settings.fnFormatNumber,start=settings._iDisplayStart+1,len=settings._iDisplayLength,vis=settings.fnRecordsDisplay(),all=len===-1;return str.replace(/_START_/g,formatter.call(settings,start)).replace(/_END_/g,formatter.call(settings,settings.fnDisplayEnd())).replace(/_MAX_/g,formatter.call(settings,settings.fnRecordsTotal())).replace(/_TOTAL_/g,formatter.call(settings,vis)).replace(/_PAGE_/g,formatter.call(settings,all?1:Math.ceil(start/len))).replace(/_PAGES_/g,formatter.call(settings,all?1:Math.ceil(vis/len)));}
function _fnInitialise(settings)
{var i,iLen,iAjaxStart=settings.iInitDisplayStart;var columns=settings.aoColumns,column;var features=settings.oFeatures;var deferLoading=settings.bDeferLoading;if(!settings.bInitialised){setTimeout(function(){_fnInitialise(settings);},200);return;}
_fnAddOptionsHtml(settings);_fnBuildHead(settings);_fnDrawHead(settings,settings.aoHeader);_fnDrawHead(settings,settings.aoFooter);_fnProcessingDisplay(settings,true);if(features.bAutoWidth){_fnCalculateColumnWidths(settings);}
for(i=0,iLen=columns.length;i<iLen;i++){column=columns[i];if(column.sWidth){column.nTh.style.width=_fnStringToCss(column.sWidth);}}
_fnCallbackFire(settings,null,'preInit',[settings]);_fnReDraw(settings);var dataSrc=_fnDataSource(settings);if(dataSrc!='ssp'||deferLoading){if(dataSrc=='ajax'){_fnBuildAjax(settings,[],function(json){var aData=_fnAjaxDataSrc(settings,json);for(i=0;i<aData.length;i++){_fnAddData(settings,aData[i]);}
settings.iInitDisplayStart=iAjaxStart;_fnReDraw(settings);_fnProcessingDisplay(settings,false);_fnInitComplete(settings,json);},settings);}
else{_fnProcessingDisplay(settings,false);_fnInitComplete(settings);}}}
function _fnInitComplete(settings,json)
{settings._bInitComplete=true;if(json||settings.oInit.aaData){_fnAdjustColumnSizing(settings);}
_fnCallbackFire(settings,null,'plugin-init',[settings,json]);_fnCallbackFire(settings,'aoInitComplete','init',[settings,json]);}
function _fnLengthChange(settings,val)
{var len=parseInt(val,10);settings._iDisplayLength=len;_fnLengthOverflow(settings);_fnCallbackFire(settings,null,'length',[settings,len]);}
function _fnFeatureHtmlLength(settings)
{var
classes=settings.oClasses,tableId=settings.sTableId,menu=settings.aLengthMenu,d2=Array.isArray(menu[0]),lengths=d2?menu[0]:menu,language=d2?menu[1]:menu;var select=$('<select/>',{'name':tableId+'_length','aria-controls':tableId,'class':classes.sLengthSelect});for(var i=0,ien=lengths.length;i<ien;i++){select[0][i]=new Option(typeof language[i]==='number'?settings.fnFormatNumber(language[i]):language[i],lengths[i]);}
var div=$('<div><label/></div>').addClass(classes.sLength);if(!settings.aanFeatures.l){div[0].id=tableId+'_length';}
div.children().append(settings.oLanguage.sLengthMenu.replace('_MENU_',select[0].outerHTML));$('select',div).val(settings._iDisplayLength).on('change.DT',function(e){_fnLengthChange(settings,$(this).val());_fnDraw(settings);});$(settings.nTable).on('length.dt.DT',function(e,s,len){if(settings===s){$('select',div).val(len);}});return div[0];}
function _fnFeatureHtmlPaginate(settings)
{var
type=settings.sPaginationType,plugin=DataTable.ext.pager[type],modern=typeof plugin==='function',redraw=function(settings){_fnDraw(settings);},node=$('<div/>').addClass(settings.oClasses.sPaging+type)[0],features=settings.aanFeatures;if(!modern){plugin.fnInit(settings,node,redraw);}
if(!features.p)
{node.id=settings.sTableId+'_paginate';settings.aoDrawCallback.push({"fn":function(settings){if(modern){var
start=settings._iDisplayStart,len=settings._iDisplayLength,visRecords=settings.fnRecordsDisplay(),all=len===-1,page=all?0:Math.ceil(start/len),pages=all?1:Math.ceil(visRecords/len),buttons=plugin(page,pages),i,ien;for(i=0,ien=features.p.length;i<ien;i++){_fnRenderer(settings,'pageButton')(settings,features.p[i],i,buttons,page,pages);}}
else{plugin.fnUpdate(settings,redraw);}},"sName":"pagination"});}
return node;}
function _fnPageChange(settings,action,redraw)
{var
start=settings._iDisplayStart,len=settings._iDisplayLength,records=settings.fnRecordsDisplay();if(records===0||len===-1)
{start=0;}
else if(typeof action==="number")
{start=action*len;if(start>records)
{start=0;}}
else if(action=="first")
{start=0;}
else if(action=="previous")
{start=len>=0?start-len:0;if(start<0)
{start=0;}}
else if(action=="next")
{if(start+len<records)
{start+=len;}}
else if(action=="last")
{start=Math.floor((records-1)/len)*len;}
else
{_fnLog(settings,0,"Unknown paging action: "+action,5);}
var changed=settings._iDisplayStart!==start;settings._iDisplayStart=start;if(changed){_fnCallbackFire(settings,null,'page',[settings]);if(redraw){_fnDraw(settings);}}
else{_fnCallbackFire(settings,null,'page-nc',[settings]);}
return changed;}
function _fnFeatureHtmlProcessing(settings)
{return $('<div/>',{'id':!settings.aanFeatures.r?settings.sTableId+'_processing':null,'class':settings.oClasses.sProcessing}).html(settings.oLanguage.sProcessing).append('<div><div></div><div></div><div></div><div></div></div>').insertBefore(settings.nTable)[0];}
function _fnProcessingDisplay(settings,show)
{if(settings.oFeatures.bProcessing){$(settings.aanFeatures.r).css('display',show?'block':'none');}
_fnCallbackFire(settings,null,'processing',[settings,show]);}
function _fnFeatureHtmlTable(settings)
{var table=$(settings.nTable);var scroll=settings.oScroll;if(scroll.sX===''&&scroll.sY===''){return settings.nTable;}
var scrollX=scroll.sX;var scrollY=scroll.sY;var classes=settings.oClasses;var caption=table.children('caption');var captionSide=caption.length?caption[0]._captionSide:null;var headerClone=$(table[0].cloneNode(false));var footerClone=$(table[0].cloneNode(false));var footer=table.children('tfoot');var _div='<div/>';var size=function(s){return!s?null:_fnStringToCss(s);};if(!footer.length){footer=null;}
var scroller=$(_div,{'class':classes.sScrollWrapper}).append($(_div,{'class':classes.sScrollHead}).css({overflow:'hidden',position:'relative',border:0,width:scrollX?size(scrollX):'100%'}).append($(_div,{'class':classes.sScrollHeadInner}).css({'box-sizing':'content-box',width:scroll.sXInner||'100%'}).append(headerClone.removeAttr('id').css('margin-left',0).append(captionSide==='top'?caption:null).append(table.children('thead'))))).append($(_div,{'class':classes.sScrollBody}).css({position:'relative',overflow:'auto',width:size(scrollX)}).append(table));if(footer){scroller.append($(_div,{'class':classes.sScrollFoot}).css({overflow:'hidden',border:0,width:scrollX?size(scrollX):'100%'}).append($(_div,{'class':classes.sScrollFootInner}).append(footerClone.removeAttr('id').css('margin-left',0).append(captionSide==='bottom'?caption:null).append(table.children('tfoot')))));}
var children=scroller.children();var scrollHead=children[0];var scrollBody=children[1];var scrollFoot=footer?children[2]:null;if(scrollX){$(scrollBody).on('scroll.DT',function(e){var scrollLeft=this.scrollLeft;scrollHead.scrollLeft=scrollLeft;if(footer){scrollFoot.scrollLeft=scrollLeft;}});}
$(scrollBody).css('max-height',scrollY);if(!scroll.bCollapse){$(scrollBody).css('height',scrollY);}
settings.nScrollHead=scrollHead;settings.nScrollBody=scrollBody;settings.nScrollFoot=scrollFoot;settings.aoDrawCallback.push({"fn":_fnScrollDraw,"sName":"scrolling"});return scroller[0];}
function _fnScrollDraw(settings)
{var
scroll=settings.oScroll,scrollX=scroll.sX,scrollXInner=scroll.sXInner,scrollY=scroll.sY,barWidth=scroll.iBarWidth,divHeader=$(settings.nScrollHead),divHeaderStyle=divHeader[0].style,divHeaderInner=divHeader.children('div'),divHeaderInnerStyle=divHeaderInner[0].style,divHeaderTable=divHeaderInner.children('table'),divBodyEl=settings.nScrollBody,divBody=$(divBodyEl),divBodyStyle=divBodyEl.style,divFooter=$(settings.nScrollFoot),divFooterInner=divFooter.children('div'),divFooterTable=divFooterInner.children('table'),header=$(settings.nTHead),table=$(settings.nTable),tableEl=table[0],tableStyle=tableEl.style,footer=settings.nTFoot?$(settings.nTFoot):null,browser=settings.oBrowser,ie67=browser.bScrollOversize,dtHeaderCells=_pluck(settings.aoColumns,'nTh'),headerTrgEls,footerTrgEls,headerSrcEls,footerSrcEls,headerCopy,footerCopy,headerWidths=[],footerWidths=[],headerContent=[],footerContent=[],idx,correction,sanityWidth,zeroOut=function(nSizer){var style=nSizer.style;style.paddingTop="0";style.paddingBottom="0";style.borderTopWidth="0";style.borderBottomWidth="0";style.height=0;};var scrollBarVis=divBodyEl.scrollHeight>divBodyEl.clientHeight;if(settings.scrollBarVis!==scrollBarVis&&settings.scrollBarVis!==undefined){settings.scrollBarVis=scrollBarVis;_fnAdjustColumnSizing(settings);return;}
else{settings.scrollBarVis=scrollBarVis;}
table.children('thead, tfoot').remove();if(footer){footerCopy=footer.clone().prependTo(table);footerTrgEls=footer.find('tr');footerSrcEls=footerCopy.find('tr');footerCopy.find('[id]').removeAttr('id');}
headerCopy=header.clone().prependTo(table);headerTrgEls=header.find('tr');headerSrcEls=headerCopy.find('tr');headerCopy.find('th, td').removeAttr('tabindex');headerCopy.find('[id]').removeAttr('id');if(!scrollX)
{divBodyStyle.width='100%';divHeader[0].style.width='100%';}
$.each(_fnGetUniqueThs(settings,headerCopy),function(i,el){idx=_fnVisibleToColumnIndex(settings,i);el.style.width=settings.aoColumns[idx].sWidth;});if(footer){_fnApplyToChildren(function(n){n.style.width="";},footerSrcEls);}
sanityWidth=table.outerWidth();if(scrollX===""){tableStyle.width="100%";if(ie67&&(table.find('tbody').height()>divBodyEl.offsetHeight||divBody.css('overflow-y')=="scroll")){tableStyle.width=_fnStringToCss(table.outerWidth()-barWidth);}
sanityWidth=table.outerWidth();}
else if(scrollXInner!==""){tableStyle.width=_fnStringToCss(scrollXInner);sanityWidth=table.outerWidth();}
_fnApplyToChildren(zeroOut,headerSrcEls);_fnApplyToChildren(function(nSizer){var style=window.getComputedStyle?window.getComputedStyle(nSizer).width:_fnStringToCss($(nSizer).width());headerContent.push(nSizer.innerHTML);headerWidths.push(style);},headerSrcEls);_fnApplyToChildren(function(nToSize,i){nToSize.style.width=headerWidths[i];},headerTrgEls);$(headerSrcEls).css('height',0);if(footer)
{_fnApplyToChildren(zeroOut,footerSrcEls);_fnApplyToChildren(function(nSizer){footerContent.push(nSizer.innerHTML);footerWidths.push(_fnStringToCss($(nSizer).css('width')));},footerSrcEls);_fnApplyToChildren(function(nToSize,i){nToSize.style.width=footerWidths[i];},footerTrgEls);$(footerSrcEls).height(0);}
_fnApplyToChildren(function(nSizer,i){nSizer.innerHTML='<div class="dataTables_sizing">'+headerContent[i]+'</div>';nSizer.childNodes[0].style.height="0";nSizer.childNodes[0].style.overflow="hidden";nSizer.style.width=headerWidths[i];},headerSrcEls);if(footer)
{_fnApplyToChildren(function(nSizer,i){nSizer.innerHTML='<div class="dataTables_sizing">'+footerContent[i]+'</div>';nSizer.childNodes[0].style.height="0";nSizer.childNodes[0].style.overflow="hidden";nSizer.style.width=footerWidths[i];},footerSrcEls);}
if(Math.round(table.outerWidth())<Math.round(sanityWidth))
{correction=((divBodyEl.scrollHeight>divBodyEl.offsetHeight||divBody.css('overflow-y')=="scroll"))?sanityWidth+barWidth:sanityWidth;if(ie67&&(divBodyEl.scrollHeight>divBodyEl.offsetHeight||divBody.css('overflow-y')=="scroll")){tableStyle.width=_fnStringToCss(correction-barWidth);}
if(scrollX===""||scrollXInner!==""){_fnLog(settings,1,'Possible column misalignment',6);}}
else
{correction='100%';}
divBodyStyle.width=_fnStringToCss(correction);divHeaderStyle.width=_fnStringToCss(correction);if(footer){settings.nScrollFoot.style.width=_fnStringToCss(correction);}
if(!scrollY){if(ie67){divBodyStyle.height=_fnStringToCss(tableEl.offsetHeight+barWidth);}}
var iOuterWidth=table.outerWidth();divHeaderTable[0].style.width=_fnStringToCss(iOuterWidth);divHeaderInnerStyle.width=_fnStringToCss(iOuterWidth);var bScrolling=table.height()>divBodyEl.clientHeight||divBody.css('overflow-y')=="scroll";var padding='padding'+(browser.bScrollbarLeft?'Left':'Right');divHeaderInnerStyle[padding]=bScrolling?barWidth+"px":"0px";if(footer){divFooterTable[0].style.width=_fnStringToCss(iOuterWidth);divFooterInner[0].style.width=_fnStringToCss(iOuterWidth);divFooterInner[0].style[padding]=bScrolling?barWidth+"px":"0px";}
table.children('colgroup').insertBefore(table.children('thead'));divBody.trigger('scroll');if((settings.bSorted||settings.bFiltered)&&!settings._drawHold){divBodyEl.scrollTop=0;}}
function _fnApplyToChildren(fn,an1,an2)
{var index=0,i=0,iLen=an1.length;var nNode1,nNode2;while(i<iLen){nNode1=an1[i].firstChild;nNode2=an2?an2[i].firstChild:null;while(nNode1){if(nNode1.nodeType===1){if(an2){fn(nNode1,nNode2,index);}
else{fn(nNode1,index);}
index++;}
nNode1=nNode1.nextSibling;nNode2=an2?nNode2.nextSibling:null;}
i++;}}
var __re_html_remove=/<.*?>/g;function _fnCalculateColumnWidths(oSettings)
{var
table=oSettings.nTable,columns=oSettings.aoColumns,scroll=oSettings.oScroll,scrollY=scroll.sY,scrollX=scroll.sX,scrollXInner=scroll.sXInner,columnCount=columns.length,visibleColumns=_fnGetColumns(oSettings,'bVisible'),headerCells=$('th',oSettings.nTHead),tableWidthAttr=table.getAttribute('width'),tableContainer=table.parentNode,userInputs=false,i,column,columnIdx,width,outerWidth,browser=oSettings.oBrowser,ie67=browser.bScrollOversize;var styleWidth=table.style.width;if(styleWidth&&styleWidth.indexOf('%')!==-1){tableWidthAttr=styleWidth;}
for(i=0;i<visibleColumns.length;i++){column=columns[visibleColumns[i]];if(column.sWidth!==null){column.sWidth=_fnConvertToWidth(column.sWidthOrig,tableContainer);userInputs=true;}}
if(ie67||!userInputs&&!scrollX&&!scrollY&&columnCount==_fnVisbleColumns(oSettings)&&columnCount==headerCells.length){for(i=0;i<columnCount;i++){var colIdx=_fnVisibleToColumnIndex(oSettings,i);if(colIdx!==null){columns[colIdx].sWidth=_fnStringToCss(headerCells.eq(i).width());}}}
else
{var tmpTable=$(table).clone().css('visibility','hidden').removeAttr('id');tmpTable.find('tbody tr').remove();var tr=$('<tr/>').appendTo(tmpTable.find('tbody'));tmpTable.find('thead, tfoot').remove();tmpTable.append($(oSettings.nTHead).clone()).append($(oSettings.nTFoot).clone());tmpTable.find('tfoot th, tfoot td').css('width','');headerCells=_fnGetUniqueThs(oSettings,tmpTable.find('thead')[0]);for(i=0;i<visibleColumns.length;i++){column=columns[visibleColumns[i]];headerCells[i].style.width=column.sWidthOrig!==null&&column.sWidthOrig!==''?_fnStringToCss(column.sWidthOrig):'';if(column.sWidthOrig&&scrollX){$(headerCells[i]).append($('<div/>').css({width:column.sWidthOrig,margin:0,padding:0,border:0,height:1}));}}
if(oSettings.aoData.length){for(i=0;i<visibleColumns.length;i++){columnIdx=visibleColumns[i];column=columns[columnIdx];$(_fnGetWidestNode(oSettings,columnIdx)).clone(false).append(column.sContentPadding).appendTo(tr);}}
$('[name]',tmpTable).removeAttr('name');var holder=$('<div/>').css(scrollX||scrollY?{position:'absolute',top:0,left:0,height:1,right:0,overflow:'hidden'}:{}).append(tmpTable).appendTo(tableContainer);if(scrollX&&scrollXInner){tmpTable.width(scrollXInner);}
else if(scrollX){tmpTable.css('width','auto');tmpTable.removeAttr('width');if(tmpTable.width()<tableContainer.clientWidth&&tableWidthAttr){tmpTable.width(tableContainer.clientWidth);}}
else if(scrollY){tmpTable.width(tableContainer.clientWidth);}
else if(tableWidthAttr){tmpTable.width(tableWidthAttr);}
var total=0;for(i=0;i<visibleColumns.length;i++){var cell=$(headerCells[i]);var border=cell.outerWidth()-cell.width();var bounding=browser.bBounding?Math.ceil(headerCells[i].getBoundingClientRect().width):cell.outerWidth();total+=bounding;columns[visibleColumns[i]].sWidth=_fnStringToCss(bounding-border);}
table.style.width=_fnStringToCss(total);holder.remove();}
if(tableWidthAttr){table.style.width=_fnStringToCss(tableWidthAttr);}
if((tableWidthAttr||scrollX)&&!oSettings._reszEvt){var bindResize=function(){$(window).on('resize.DT-'+oSettings.sInstance,_fnThrottle(function(){_fnAdjustColumnSizing(oSettings);}));};if(ie67){setTimeout(bindResize,1000);}
else{bindResize();}
oSettings._reszEvt=true;}}
var _fnThrottle=DataTable.util.throttle;function _fnConvertToWidth(width,parent)
{if(!width){return 0;}
var n=$('<div/>').css('width',_fnStringToCss(width)).appendTo(parent||document.body);var val=n[0].offsetWidth;n.remove();return val;}
function _fnGetWidestNode(settings,colIdx)
{var idx=_fnGetMaxLenString(settings,colIdx);if(idx<0){return null;}
var data=settings.aoData[idx];return!data.nTr?$('<td/>').html(_fnGetCellData(settings,idx,colIdx,'display'))[0]:data.anCells[colIdx];}
function _fnGetMaxLenString(settings,colIdx)
{var s,max=-1,maxIdx=-1;for(var i=0,ien=settings.aoData.length;i<ien;i++){s=_fnGetCellData(settings,i,colIdx,'display')+'';s=s.replace(__re_html_remove,'');s=s.replace(/&nbsp;/g,' ');if(s.length>max){max=s.length;maxIdx=i;}}
return maxIdx;}
function _fnStringToCss(s)
{if(s===null){return '0px';}
if(typeof s=='number'){return s<0?'0px':s+'px';}
return s.match(/\d$/)?s+'px':s;}
function _fnSortFlatten(settings)
{var
i,iLen,k,kLen,aSort=[],aiOrig=[],aoColumns=settings.aoColumns,aDataSort,iCol,sType,srcCol,fixed=settings.aaSortingFixed,fixedObj=$.isPlainObject(fixed),nestedSort=[],add=function(a){if(a.length&&!Array.isArray(a[0])){nestedSort.push(a);}
else{$.merge(nestedSort,a);}};if(Array.isArray(fixed)){add(fixed);}
if(fixedObj&&fixed.pre){add(fixed.pre);}
add(settings.aaSorting);if(fixedObj&&fixed.post){add(fixed.post);}
for(i=0;i<nestedSort.length;i++)
{srcCol=nestedSort[i][0];aDataSort=aoColumns[srcCol].aDataSort;for(k=0,kLen=aDataSort.length;k<kLen;k++)
{iCol=aDataSort[k];sType=aoColumns[iCol].sType||'string';if(nestedSort[i]._idx===undefined){nestedSort[i]._idx=$.inArray(nestedSort[i][1],aoColumns[iCol].asSorting);}
aSort.push({src:srcCol,col:iCol,dir:nestedSort[i][1],index:nestedSort[i]._idx,type:sType,formatter:DataTable.ext.type.order[sType+"-pre"]});}}
return aSort;}
function _fnSort(oSettings)
{var
i,ien,iLen,j,jLen,k,kLen,sDataType,nTh,aiOrig=[],oExtSort=DataTable.ext.type.order,aoData=oSettings.aoData,aoColumns=oSettings.aoColumns,aDataSort,data,iCol,sType,oSort,formatters=0,sortCol,displayMaster=oSettings.aiDisplayMaster,aSort;_fnColumnTypes(oSettings);aSort=_fnSortFlatten(oSettings);for(i=0,ien=aSort.length;i<ien;i++){sortCol=aSort[i];if(sortCol.formatter){formatters++;}
_fnSortData(oSettings,sortCol.col);}
if(_fnDataSource(oSettings)!='ssp'&&aSort.length!==0)
{for(i=0,iLen=displayMaster.length;i<iLen;i++){aiOrig[displayMaster[i]]=i;}
if(formatters===aSort.length){displayMaster.sort(function(a,b){var
x,y,k,test,sort,len=aSort.length,dataA=aoData[a]._aSortData,dataB=aoData[b]._aSortData;for(k=0;k<len;k++){sort=aSort[k];x=dataA[sort.col];y=dataB[sort.col];test=x<y?-1:x>y?1:0;if(test!==0){return sort.dir==='asc'?test:-test;}}
x=aiOrig[a];y=aiOrig[b];return x<y?-1:x>y?1:0;});}
else{displayMaster.sort(function(a,b){var
x,y,k,l,test,sort,fn,len=aSort.length,dataA=aoData[a]._aSortData,dataB=aoData[b]._aSortData;for(k=0;k<len;k++){sort=aSort[k];x=dataA[sort.col];y=dataB[sort.col];fn=oExtSort[sort.type+"-"+sort.dir]||oExtSort["string-"+sort.dir];test=fn(x,y);if(test!==0){return test;}}
x=aiOrig[a];y=aiOrig[b];return x<y?-1:x>y?1:0;});}}
oSettings.bSorted=true;}
function _fnSortAria(settings)
{var label;var nextSort;var columns=settings.aoColumns;var aSort=_fnSortFlatten(settings);var oAria=settings.oLanguage.oAria;for(var i=0,iLen=columns.length;i<iLen;i++)
{var col=columns[i];var asSorting=col.asSorting;var sTitle=col.ariaTitle||col.sTitle.replace(/<.*?>/g,"");var th=col.nTh;th.removeAttribute('aria-sort');if(col.bSortable){if(aSort.length>0&&aSort[0].col==i){th.setAttribute('aria-sort',aSort[0].dir=="asc"?"ascending":"descending");nextSort=asSorting[aSort[0].index+1]||asSorting[0];}
else{nextSort=asSorting[0];}
label=sTitle+(nextSort==="asc"?oAria.sSortAscending:oAria.sSortDescending);}
else{label=sTitle;}
th.setAttribute('aria-label',label);}}
function _fnSortListener(settings,colIdx,append,callback)
{var col=settings.aoColumns[colIdx];var sorting=settings.aaSorting;var asSorting=col.asSorting;var nextSortIdx;var next=function(a,overflow){var idx=a._idx;if(idx===undefined){idx=$.inArray(a[1],asSorting);}
return idx+1<asSorting.length?idx+1:overflow?null:0;};if(typeof sorting[0]==='number'){sorting=settings.aaSorting=[sorting];}
if(append&&settings.oFeatures.bSortMulti){var sortIdx=$.inArray(colIdx,_pluck(sorting,'0'));if(sortIdx!==-1){nextSortIdx=next(sorting[sortIdx],true);if(nextSortIdx===null&&sorting.length===1){nextSortIdx=0;}
if(nextSortIdx===null){sorting.splice(sortIdx,1);}
else{sorting[sortIdx][1]=asSorting[nextSortIdx];sorting[sortIdx]._idx=nextSortIdx;}}
else{sorting.push([colIdx,asSorting[0],0]);sorting[sorting.length-1]._idx=0;}}
else if(sorting.length&&sorting[0][0]==colIdx){nextSortIdx=next(sorting[0]);sorting.length=1;sorting[0][1]=asSorting[nextSortIdx];sorting[0]._idx=nextSortIdx;}
else{sorting.length=0;sorting.push([colIdx,asSorting[0]]);sorting[0]._idx=0;}
_fnReDraw(settings);if(typeof callback=='function'){callback(settings);}}
function _fnSortAttachListener(settings,attachTo,colIdx,callback)
{var col=settings.aoColumns[colIdx];_fnBindAction(attachTo,{},function(e){if(col.bSortable===false){return;}
if(settings.oFeatures.bProcessing){_fnProcessingDisplay(settings,true);setTimeout(function(){_fnSortListener(settings,colIdx,e.shiftKey,callback);if(_fnDataSource(settings)!=='ssp'){_fnProcessingDisplay(settings,false);}},0);}
else{_fnSortListener(settings,colIdx,e.shiftKey,callback);}});}
function _fnSortingClasses(settings)
{var oldSort=settings.aLastSort;var sortClass=settings.oClasses.sSortColumn;var sort=_fnSortFlatten(settings);var features=settings.oFeatures;var i,ien,colIdx;if(features.bSort&&features.bSortClasses){for(i=0,ien=oldSort.length;i<ien;i++){colIdx=oldSort[i].src;$(_pluck(settings.aoData,'anCells',colIdx)).removeClass(sortClass+(i<2?i+1:3));}
for(i=0,ien=sort.length;i<ien;i++){colIdx=sort[i].src;$(_pluck(settings.aoData,'anCells',colIdx)).addClass(sortClass+(i<2?i+1:3));}}
settings.aLastSort=sort;}
function _fnSortData(settings,idx)
{var column=settings.aoColumns[idx];var customSort=DataTable.ext.order[column.sSortDataType];var customData;if(customSort){customData=customSort.call(settings.oInstance,settings,idx,_fnColumnIndexToVisible(settings,idx));}
var row,cellData;var formatter=DataTable.ext.type.order[column.sType+"-pre"];for(var i=0,ien=settings.aoData.length;i<ien;i++){row=settings.aoData[i];if(!row._aSortData){row._aSortData=[];}
if(!row._aSortData[idx]||customSort){cellData=customSort?customData[i]:_fnGetCellData(settings,i,idx,'sort');row._aSortData[idx]=formatter?formatter(cellData):cellData;}}}
function _fnSaveState(settings)
{if(settings._bLoadingState){return;}
var state={time:+new Date(),start:settings._iDisplayStart,length:settings._iDisplayLength,order:$.extend(true,[],settings.aaSorting),search:_fnSearchToCamel(settings.oPreviousSearch),columns:$.map(settings.aoColumns,function(col,i){return{visible:col.bVisible,search:_fnSearchToCamel(settings.aoPreSearchCols[i])};})};settings.oSavedState=state;_fnCallbackFire(settings,"aoStateSaveParams",'stateSaveParams',[settings,state]);if(settings.oFeatures.bStateSave&&!settings.bDestroying)
{settings.fnStateSaveCallback.call(settings.oInstance,settings,state);}}
function _fnLoadState(settings,oInit,callback)
{if(!settings.oFeatures.bStateSave){callback();return;}
var loaded=function(state){_fnImplementState(settings,state,callback);}
var state=settings.fnStateLoadCallback.call(settings.oInstance,settings,loaded);if(state!==undefined){_fnImplementState(settings,state,callback);}
return true;}
function _fnImplementState(settings,s,callback){var i,ien;var columns=settings.aoColumns;settings._bLoadingState=true;var api=settings._bInitComplete?new DataTable.Api(settings):null;if(!s||!s.time){settings._bLoadingState=false;callback();return;}
var abStateLoad=_fnCallbackFire(settings,'aoStateLoadParams','stateLoadParams',[settings,s]);if($.inArray(false,abStateLoad)!==-1){settings._bLoadingState=false;callback();return;}
var duration=settings.iStateDuration;if(duration>0&&s.time<+new Date()-(duration*1000)){settings._bLoadingState=false;callback();return;}
if(s.columns&&columns.length!==s.columns.length){settings._bLoadingState=false;callback();return;}
settings.oLoadedState=$.extend(true,{},s);if(s.length!==undefined){if(api){api.page.len(s.length)}
else{settings._iDisplayLength=s.length;}}
if(s.start!==undefined){if(api===null){settings._iDisplayStart=s.start;settings.iInitDisplayStart=s.start;}
else{_fnPageChange(settings,s.start/settings._iDisplayLength);}}
if(s.order!==undefined){settings.aaSorting=[];$.each(s.order,function(i,col){settings.aaSorting.push(col[0]>=columns.length?[0,col[1]]:col);});}
if(s.search!==undefined){$.extend(settings.oPreviousSearch,_fnSearchToHung(s.search));}
if(s.columns){for(i=0,ien=s.columns.length;i<ien;i++){var col=s.columns[i];if(col.visible!==undefined){if(api){api.column(i).visible(col.visible,false);}
else{columns[i].bVisible=col.visible;}}
if(col.search!==undefined){$.extend(settings.aoPreSearchCols[i],_fnSearchToHung(col.search));}}
if(api){api.columns.adjust();}}
settings._bLoadingState=false;_fnCallbackFire(settings,'aoStateLoaded','stateLoaded',[settings,s]);callback();};function _fnSettingsFromNode(table)
{var settings=DataTable.settings;var idx=$.inArray(table,_pluck(settings,'nTable'));return idx!==-1?settings[idx]:null;}
function _fnLog(settings,level,msg,tn)
{msg='DataTables warning: '+
(settings?'table id='+settings.sTableId+' - ':'')+msg;if(tn){msg+='. For more information about this error, please see '+
'http://datatables.net/tn/'+tn;}
if(!level){var ext=DataTable.ext;var type=ext.sErrMode||ext.errMode;if(settings){_fnCallbackFire(settings,null,'error',[settings,tn,msg]);}
if(type=='alert'){alert(msg);}
else if(type=='throw'){throw new Error(msg);}
else if(typeof type=='function'){type(settings,tn,msg);}}
else if(window.console&&console.log){console.log(msg);}}
function _fnMap(ret,src,name,mappedName)
{if(Array.isArray(name)){$.each(name,function(i,val){if(Array.isArray(val)){_fnMap(ret,src,val[0],val[1]);}
else{_fnMap(ret,src,val);}});return;}
if(mappedName===undefined){mappedName=name;}
if(src[name]!==undefined){ret[mappedName]=src[name];}}
function _fnExtend(out,extender,breakRefs)
{var val;for(var prop in extender){if(extender.hasOwnProperty(prop)){val=extender[prop];if($.isPlainObject(val)){if(!$.isPlainObject(out[prop])){out[prop]={};}
$.extend(true,out[prop],val);}
else if(breakRefs&&prop!=='data'&&prop!=='aaData'&&Array.isArray(val)){out[prop]=val.slice();}
else{out[prop]=val;}}}
return out;}
function _fnBindAction(n,oData,fn)
{$(n).on('click.DT',oData,function(e){$(n).trigger('blur');fn(e);}).on('keypress.DT',oData,function(e){if(e.which===13){e.preventDefault();fn(e);}}).on('selectstart.DT',function(){return false;});}
function _fnCallbackReg(oSettings,sStore,fn,sName)
{if(fn)
{oSettings[sStore].push({"fn":fn,"sName":sName});}}
function _fnCallbackFire(settings,callbackArr,eventName,args)
{var ret=[];if(callbackArr){ret=$.map(settings[callbackArr].slice().reverse(),function(val,i){return val.fn.apply(settings.oInstance,args);});}
if(eventName!==null){var e=$.Event(eventName+'.dt');$(settings.nTable).trigger(e,args);ret.push(e.result);}
return ret;}
function _fnLengthOverflow(settings)
{var
start=settings._iDisplayStart,end=settings.fnDisplayEnd(),len=settings._iDisplayLength;if(start>=end)
{start=end-len;}
start-=(start%len);if(len===-1||start<0)
{start=0;}
settings._iDisplayStart=start;}
function _fnRenderer(settings,type)
{var renderer=settings.renderer;var host=DataTable.ext.renderer[type];if($.isPlainObject(renderer)&&renderer[type]){return host[renderer[type]]||host._;}
else if(typeof renderer==='string'){return host[renderer]||host._;}
return host._;}
function _fnDataSource(settings)
{if(settings.oFeatures.bServerSide){return 'ssp';}
else if(settings.ajax||settings.sAjaxSource){return 'ajax';}
return 'dom';}
var __apiStruct=[];var __arrayProto=Array.prototype;var _toSettings=function(mixed)
{var idx,jq;var settings=DataTable.settings;var tables=$.map(settings,function(el,i){return el.nTable;});if(!mixed){return[];}
else if(mixed.nTable&&mixed.oApi){return[mixed];}
else if(mixed.nodeName&&mixed.nodeName.toLowerCase()==='table'){idx=$.inArray(mixed,tables);return idx!==-1?[settings[idx]]:null;}
else if(mixed&&typeof mixed.settings==='function'){return mixed.settings().toArray();}
else if(typeof mixed==='string'){jq=$(mixed);}
else if(mixed instanceof $){jq=mixed;}
if(jq){return jq.map(function(i){idx=$.inArray(this,tables);return idx!==-1?settings[idx]:null;}).toArray();}};_Api=function(context,data)
{if(!(this instanceof _Api)){return new _Api(context,data);}
var settings=[];var ctxSettings=function(o){var a=_toSettings(o);if(a){settings.push.apply(settings,a);}};if(Array.isArray(context)){for(var i=0,ien=context.length;i<ien;i++){ctxSettings(context[i]);}}
else{ctxSettings(context);}
this.context=_unique(settings);if(data){$.merge(this,data);}
this.selector={rows:null,cols:null,opts:null};_Api.extend(this,this,__apiStruct);};DataTable.Api=_Api;$.extend(_Api.prototype,{any:function()
{return this.count()!==0;},concat:__arrayProto.concat,context:[],count:function()
{return this.flatten().length;},each:function(fn)
{for(var i=0,ien=this.length;i<ien;i++){fn.call(this,this[i],i,this);}
return this;},eq:function(idx)
{var ctx=this.context;return ctx.length>idx?new _Api(ctx[idx],this[idx]):null;},filter:function(fn)
{var a=[];if(__arrayProto.filter){a=__arrayProto.filter.call(this,fn,this);}
else{for(var i=0,ien=this.length;i<ien;i++){if(fn.call(this,this[i],i,this)){a.push(this[i]);}}}
return new _Api(this.context,a);},flatten:function()
{var a=[];return new _Api(this.context,a.concat.apply(a,this.toArray()));},join:__arrayProto.join,indexOf:__arrayProto.indexOf||function(obj,start)
{for(var i=(start||0),ien=this.length;i<ien;i++){if(this[i]===obj){return i;}}
return-1;},iterator:function(flatten,type,fn,alwaysNew){var
a=[],ret,i,ien,j,jen,context=this.context,rows,items,item,selector=this.selector;if(typeof flatten==='string'){alwaysNew=fn;fn=type;type=flatten;flatten=false;}
for(i=0,ien=context.length;i<ien;i++){var apiInst=new _Api(context[i]);if(type==='table'){ret=fn.call(apiInst,context[i],i);if(ret!==undefined){a.push(ret);}}
else if(type==='columns'||type==='rows'){ret=fn.call(apiInst,context[i],this[i],i);if(ret!==undefined){a.push(ret);}}
else if(type==='column'||type==='column-rows'||type==='row'||type==='cell'){items=this[i];if(type==='column-rows'){rows=_selector_row_indexes(context[i],selector.opts);}
for(j=0,jen=items.length;j<jen;j++){item=items[j];if(type==='cell'){ret=fn.call(apiInst,context[i],item.row,item.column,i,j);}
else{ret=fn.call(apiInst,context[i],item,i,j,rows);}
if(ret!==undefined){a.push(ret);}}}}
if(a.length||alwaysNew){var api=new _Api(context,flatten?a.concat.apply([],a):a);var apiSelector=api.selector;apiSelector.rows=selector.rows;apiSelector.cols=selector.cols;apiSelector.opts=selector.opts;return api;}
return this;},lastIndexOf:__arrayProto.lastIndexOf||function(obj,start)
{return this.indexOf.apply(this.toArray.reverse(),arguments);},length:0,map:function(fn)
{var a=[];if(__arrayProto.map){a=__arrayProto.map.call(this,fn,this);}
else{for(var i=0,ien=this.length;i<ien;i++){a.push(fn.call(this,this[i],i));}}
return new _Api(this.context,a);},pluck:function(prop)
{let fn=DataTable.util.get(prop);return this.map(function(el){return fn(el);});},pop:__arrayProto.pop,push:__arrayProto.push,reduce:__arrayProto.reduce||function(fn,init)
{return _fnReduce(this,fn,init,0,this.length,1);},reduceRight:__arrayProto.reduceRight||function(fn,init)
{return _fnReduce(this,fn,init,this.length-1,-1,-1);},reverse:__arrayProto.reverse,selector:null,shift:__arrayProto.shift,slice:function(){return new _Api(this.context,this);},sort:__arrayProto.sort,splice:__arrayProto.splice,toArray:function()
{return __arrayProto.slice.call(this);},to$:function()
{return $(this);},toJQuery:function()
{return $(this);},unique:function()
{return new _Api(this.context,_unique(this));},unshift:__arrayProto.unshift});_Api.extend=function(scope,obj,ext)
{if(!ext.length||!obj||(!(obj instanceof _Api)&&!obj.__dt_wrapper)){return;}
var
i,ien,struct,methodScoping=function(scope,fn,struc){return function(){var ret=fn.apply(scope,arguments);_Api.extend(ret,ret,struc.methodExt);return ret;};};for(i=0,ien=ext.length;i<ien;i++){struct=ext[i];obj[struct.name]=struct.type==='function'?methodScoping(scope,struct.val,struct):struct.type==='object'?{}:struct.val;obj[struct.name].__dt_wrapper=true;_Api.extend(scope,obj[struct.name],struct.propExt);}};_Api.register=_api_register=function(name,val)
{if(Array.isArray(name)){for(var j=0,jen=name.length;j<jen;j++){_Api.register(name[j],val);}
return;}
var
i,ien,heir=name.split('.'),struct=__apiStruct,key,method;var find=function(src,name){for(var i=0,ien=src.length;i<ien;i++){if(src[i].name===name){return src[i];}}
return null;};for(i=0,ien=heir.length;i<ien;i++){method=heir[i].indexOf('()')!==-1;key=method?heir[i].replace('()',''):heir[i];var src=find(struct,key);if(!src){src={name:key,val:{},methodExt:[],propExt:[],type:'object'};struct.push(src);}
if(i===ien-1){src.val=val;src.type=typeof val==='function'?'function':$.isPlainObject(val)?'object':'other';}
else{struct=method?src.methodExt:src.propExt;}}};_Api.registerPlural=_api_registerPlural=function(pluralName,singularName,val){_Api.register(pluralName,val);_Api.register(singularName,function(){var ret=val.apply(this,arguments);if(ret===this){return this;}
else if(ret instanceof _Api){return ret.length?Array.isArray(ret[0])?new _Api(ret.context,ret[0]):ret[0]:undefined;}
return ret;});};var __table_selector=function(selector,a)
{if(Array.isArray(selector)){return $.map(selector,function(item){return __table_selector(item,a);});}
if(typeof selector==='number'){return[a[selector]];}
var nodes=$.map(a,function(el,i){return el.nTable;});return $(nodes).filter(selector).map(function(i){var idx=$.inArray(this,nodes);return a[idx];}).toArray();};_api_register('tables()',function(selector){return selector!==undefined&&selector!==null?new _Api(__table_selector(selector,this.context)):this;});_api_register('table()',function(selector){var tables=this.tables(selector);var ctx=tables.context;return ctx.length?new _Api(ctx[0]):tables;});_api_registerPlural('tables().nodes()','table().node()',function(){return this.iterator('table',function(ctx){return ctx.nTable;},1);});_api_registerPlural('tables().body()','table().body()',function(){return this.iterator('table',function(ctx){return ctx.nTBody;},1);});_api_registerPlural('tables().header()','table().header()',function(){return this.iterator('table',function(ctx){return ctx.nTHead;},1);});_api_registerPlural('tables().footer()','table().footer()',function(){return this.iterator('table',function(ctx){return ctx.nTFoot;},1);});_api_registerPlural('tables().containers()','table().container()',function(){return this.iterator('table',function(ctx){return ctx.nTableWrapper;},1);});_api_register('draw()',function(paging){return this.iterator('table',function(settings){if(paging==='page'){_fnDraw(settings);}
else{if(typeof paging==='string'){paging=paging==='full-hold'?false:true;}
_fnReDraw(settings,paging===false);}});});_api_register('page()',function(action){if(action===undefined){return this.page.info().page;}
return this.iterator('table',function(settings){_fnPageChange(settings,action);});});_api_register('page.info()',function(action){if(this.context.length===0){return undefined;}
var
settings=this.context[0],start=settings._iDisplayStart,len=settings.oFeatures.bPaginate?settings._iDisplayLength:-1,visRecords=settings.fnRecordsDisplay(),all=len===-1;return{"page":all?0:Math.floor(start/len),"pages":all?1:Math.ceil(visRecords/len),"start":start,"end":settings.fnDisplayEnd(),"length":len,"recordsTotal":settings.fnRecordsTotal(),"recordsDisplay":visRecords,"serverSide":_fnDataSource(settings)==='ssp'};});_api_register('page.len()',function(len){if(len===undefined){return this.context.length!==0?this.context[0]._iDisplayLength:undefined;}
return this.iterator('table',function(settings){_fnLengthChange(settings,len);});});var __reload=function(settings,holdPosition,callback){if(callback){var api=new _Api(settings);api.one('draw',function(){callback(api.ajax.json());});}
if(_fnDataSource(settings)=='ssp'){_fnReDraw(settings,holdPosition);}
else{_fnProcessingDisplay(settings,true);var xhr=settings.jqXHR;if(xhr&&xhr.readyState!==4){xhr.abort();}
_fnBuildAjax(settings,[],function(json){_fnClearTable(settings);var data=_fnAjaxDataSrc(settings,json);for(var i=0,ien=data.length;i<ien;i++){_fnAddData(settings,data[i]);}
_fnReDraw(settings,holdPosition);_fnProcessingDisplay(settings,false);});}};_api_register('ajax.json()',function(){var ctx=this.context;if(ctx.length>0){return ctx[0].json;}});_api_register('ajax.params()',function(){var ctx=this.context;if(ctx.length>0){return ctx[0].oAjaxData;}});_api_register('ajax.reload()',function(callback,resetPaging){return this.iterator('table',function(settings){__reload(settings,resetPaging===false,callback);});});_api_register('ajax.url()',function(url){var ctx=this.context;if(url===undefined){if(ctx.length===0){return undefined;}
ctx=ctx[0];return ctx.ajax?$.isPlainObject(ctx.ajax)?ctx.ajax.url:ctx.ajax:ctx.sAjaxSource;}
return this.iterator('table',function(settings){if($.isPlainObject(settings.ajax)){settings.ajax.url=url;}
else{settings.ajax=url;}});});_api_register('ajax.url().load()',function(callback,resetPaging){return this.iterator('table',function(ctx){__reload(ctx,resetPaging===false,callback);});});var _selector_run=function(type,selector,selectFn,settings,opts)
{var
out=[],res,a,i,ien,j,jen,selectorType=typeof selector;if(!selector||selectorType==='string'||selectorType==='function'||selector.length===undefined){selector=[selector];}
for(i=0,ien=selector.length;i<ien;i++){a=selector[i]&&selector[i].split&&!selector[i].match(/[\[\(:]/)?selector[i].split(','):[selector[i]];for(j=0,jen=a.length;j<jen;j++){res=selectFn(typeof a[j]==='string'?(a[j]).trim():a[j]);if(res&&res.length){out=out.concat(res);}}}
var ext=_ext.selector[type];if(ext.length){for(i=0,ien=ext.length;i<ien;i++){out=ext[i](settings,opts,out);}}
return _unique(out);};var _selector_opts=function(opts)
{if(!opts){opts={};}
if(opts.filter&&opts.search===undefined){opts.search=opts.filter;}
return $.extend({search:'none',order:'current',page:'all'},opts);};var _selector_first=function(inst)
{for(var i=0,ien=inst.length;i<ien;i++){if(inst[i].length>0){inst[0]=inst[i];inst[0].length=1;inst.length=1;inst.context=[inst.context[i]];return inst;}}
inst.length=0;return inst;};var _selector_row_indexes=function(settings,opts)
{var
i,ien,tmp,a=[],displayFiltered=settings.aiDisplay,displayMaster=settings.aiDisplayMaster;var
search=opts.search,order=opts.order,page=opts.page;if(_fnDataSource(settings)=='ssp'){return search==='removed'?[]:_range(0,displayMaster.length);}
else if(page=='current'){for(i=settings._iDisplayStart,ien=settings.fnDisplayEnd();i<ien;i++){a.push(displayFiltered[i]);}}
else if(order=='current'||order=='applied'){if(search=='none'){a=displayMaster.slice();}
else if(search=='applied'){a=displayFiltered.slice();}
else if(search=='removed'){var displayFilteredMap={};for(var i=0,ien=displayFiltered.length;i<ien;i++){displayFilteredMap[displayFiltered[i]]=null;}
a=$.map(displayMaster,function(el){return!displayFilteredMap.hasOwnProperty(el)?el:null;});}}
else if(order=='index'||order=='original'){for(i=0,ien=settings.aoData.length;i<ien;i++){if(search=='none'){a.push(i);}
else{tmp=$.inArray(i,displayFiltered);if((tmp===-1&&search=='removed')||(tmp>=0&&search=='applied'))
{a.push(i);}}}}
return a;};var __row_selector=function(settings,selector,opts)
{var rows;var run=function(sel){var selInt=_intVal(sel);var i,ien;var aoData=settings.aoData;if(selInt!==null&&!opts){return[selInt];}
if(!rows){rows=_selector_row_indexes(settings,opts);}
if(selInt!==null&&$.inArray(selInt,rows)!==-1){return[selInt];}
else if(sel===null||sel===undefined||sel===''){return rows;}
if(typeof sel==='function'){return $.map(rows,function(idx){var row=aoData[idx];return sel(idx,row._aData,row.nTr)?idx:null;});}
if(sel.nodeName){var rowIdx=sel._DT_RowIndex;var cellIdx=sel._DT_CellIndex;if(rowIdx!==undefined){return aoData[rowIdx]&&aoData[rowIdx].nTr===sel?[rowIdx]:[];}
else if(cellIdx){return aoData[cellIdx.row]&&aoData[cellIdx.row].nTr===sel.parentNode?[cellIdx.row]:[];}
else{var host=$(sel).closest('*[data-dt-row]');return host.length?[host.data('dt-row')]:[];}}
if(typeof sel==='string'&&sel.charAt(0)==='#'){var rowObj=settings.aIds[sel.replace(/^#/,'')];if(rowObj!==undefined){return[rowObj.idx];}}
var nodes=_removeEmpty(_pluck_order(settings.aoData,rows,'nTr'));return $(nodes).filter(sel).map(function(){return this._DT_RowIndex;}).toArray();};return _selector_run('row',selector,run,settings,opts);};_api_register('rows()',function(selector,opts){if(selector===undefined){selector='';}
else if($.isPlainObject(selector)){opts=selector;selector='';}
opts=_selector_opts(opts);var inst=this.iterator('table',function(settings){return __row_selector(settings,selector,opts);},1);inst.selector.rows=selector;inst.selector.opts=opts;return inst;});_api_register('rows().nodes()',function(){return this.iterator('row',function(settings,row){return settings.aoData[row].nTr||undefined;},1);});_api_register('rows().data()',function(){return this.iterator(true,'rows',function(settings,rows){return _pluck_order(settings.aoData,rows,'_aData');},1);});_api_registerPlural('rows().cache()','row().cache()',function(type){return this.iterator('row',function(settings,row){var r=settings.aoData[row];return type==='search'?r._aFilterData:r._aSortData;},1);});_api_registerPlural('rows().invalidate()','row().invalidate()',function(src){return this.iterator('row',function(settings,row){_fnInvalidate(settings,row,src);});});_api_registerPlural('rows().indexes()','row().index()',function(){return this.iterator('row',function(settings,row){return row;},1);});_api_registerPlural('rows().ids()','row().id()',function(hash){var a=[];var context=this.context;for(var i=0,ien=context.length;i<ien;i++){for(var j=0,jen=this[i].length;j<jen;j++){var id=context[i].rowIdFn(context[i].aoData[this[i][j]]._aData);a.push((hash===true?'#':'')+id);}}
return new _Api(context,a);});_api_registerPlural('rows().remove()','row().remove()',function(){var that=this;this.iterator('row',function(settings,row,thatIdx){var data=settings.aoData;var rowData=data[row];var i,ien,j,jen;var loopRow,loopCells;data.splice(row,1);for(i=0,ien=data.length;i<ien;i++){loopRow=data[i];loopCells=loopRow.anCells;if(loopRow.nTr!==null){loopRow.nTr._DT_RowIndex=i;}
if(loopCells!==null){for(j=0,jen=loopCells.length;j<jen;j++){loopCells[j]._DT_CellIndex.row=i;}}}
_fnDeleteIndex(settings.aiDisplayMaster,row);_fnDeleteIndex(settings.aiDisplay,row);_fnDeleteIndex(that[thatIdx],row,false);if(settings._iRecordsDisplay>0){settings._iRecordsDisplay--;}
_fnLengthOverflow(settings);var id=settings.rowIdFn(rowData._aData);if(id!==undefined){delete settings.aIds[id];}});this.iterator('table',function(settings){for(var i=0,ien=settings.aoData.length;i<ien;i++){settings.aoData[i].idx=i;}});return this;});_api_register('rows.add()',function(rows){var newRows=this.iterator('table',function(settings){var row,i,ien;var out=[];for(i=0,ien=rows.length;i<ien;i++){row=rows[i];if(row.nodeName&&row.nodeName.toUpperCase()==='TR'){out.push(_fnAddTr(settings,row)[0]);}
else{out.push(_fnAddData(settings,row));}}
return out;},1);var modRows=this.rows(-1);modRows.pop();$.merge(modRows,newRows);return modRows;});_api_register('row()',function(selector,opts){return _selector_first(this.rows(selector,opts));});_api_register('row().data()',function(data){var ctx=this.context;if(data===undefined){return ctx.length&&this.length?ctx[0].aoData[this[0]]._aData:undefined;}
var row=ctx[0].aoData[this[0]];row._aData=data;if(Array.isArray(data)&&row.nTr&&row.nTr.id){_fnSetObjectDataFn(ctx[0].rowId)(data,row.nTr.id);}
_fnInvalidate(ctx[0],this[0],'data');return this;});_api_register('row().node()',function(){var ctx=this.context;return ctx.length&&this.length?ctx[0].aoData[this[0]].nTr||null:null;});_api_register('row.add()',function(row){if(row instanceof $&&row.length){row=row[0];}
var rows=this.iterator('table',function(settings){if(row.nodeName&&row.nodeName.toUpperCase()==='TR'){return _fnAddTr(settings,row)[0];}
return _fnAddData(settings,row);});return this.row(rows[0]);});$(document).on('plugin-init.dt',function(e,context){var api=new _Api(context);const namespace='on-plugin-init';const stateSaveParamsEvent=`stateSaveParams.${namespace}`;const destroyEvent=`destroy.${namespace}`;api.on(stateSaveParamsEvent,function(e,settings,d){var idFn=settings.rowIdFn;var data=settings.aoData;var ids=[];for(var i=0;i<data.length;i++){if(data[i]._detailsShow){ids.push('#'+idFn(data[i]._aData));}}
d.childRows=ids;});api.on(destroyEvent,function(){api.off(`${stateSaveParamsEvent} ${destroyEvent}`);});var loaded=api.state.loaded();if(loaded&&loaded.childRows){api.rows($.map(loaded.childRows,function(id){return id.replace(/:/g,'\\:')})).every(function(){_fnCallbackFire(context,null,'requestChild',[this])});}});var __details_add=function(ctx,row,data,klass)
{var rows=[];var addRow=function(r,k){if(Array.isArray(r)||r instanceof $){for(var i=0,ien=r.length;i<ien;i++){addRow(r[i],k);}
return;}
if(r.nodeName&&r.nodeName.toLowerCase()==='tr'){rows.push(r);}
else{var created=$('<tr><td></td></tr>').addClass(k);$('td',created).addClass(k).html(r)
[0].colSpan=_fnVisbleColumns(ctx);rows.push(created[0]);}};addRow(data,klass);if(row._details){row._details.detach();}
row._details=$(rows);if(row._detailsShow){row._details.insertAfter(row.nTr);}};var __details_state=DataTable.util.throttle(function(ctx){_fnSaveState(ctx[0])},500);var __details_remove=function(api,idx)
{var ctx=api.context;if(ctx.length){var row=ctx[0].aoData[idx!==undefined?idx:api[0]];if(row&&row._details){row._details.remove();row._detailsShow=undefined;row._details=undefined;$(row.nTr).removeClass('dt-hasChild');__details_state(ctx);}}};var __details_display=function(api,show){var ctx=api.context;if(ctx.length&&api.length){var row=ctx[0].aoData[api[0]];if(row._details){row._detailsShow=show;if(show){row._details.insertAfter(row.nTr);$(row.nTr).addClass('dt-hasChild');}
else{row._details.detach();$(row.nTr).removeClass('dt-hasChild');}
_fnCallbackFire(ctx[0],null,'childRow',[show,api.row(api[0])])
__details_events(ctx[0]);__details_state(ctx);}}};var __details_events=function(settings)
{var api=new _Api(settings);var namespace='.dt.DT_details';var drawEvent='draw'+namespace;var colvisEvent='column-sizing'+namespace;var destroyEvent='destroy'+namespace;var data=settings.aoData;api.off(drawEvent+' '+colvisEvent+' '+destroyEvent);if(_pluck(data,'_details').length>0){api.on(drawEvent,function(e,ctx){if(settings!==ctx){return;}
api.rows({page:'current'}).eq(0).each(function(idx){var row=data[idx];if(row._detailsShow){row._details.insertAfter(row.nTr);}});});api.on(colvisEvent,function(e,ctx,idx,vis){if(settings!==ctx){return;}
var row,visible=_fnVisbleColumns(ctx);for(var i=0,ien=data.length;i<ien;i++){row=data[i];if(row._details){row._details.children('td[colspan]').attr('colspan',visible);}}});api.on(destroyEvent,function(e,ctx){if(settings!==ctx){return;}
for(var i=0,ien=data.length;i<ien;i++){if(data[i]._details){__details_remove(api,i);}}});}};var _emp='';var _child_obj=_emp+'row().child';var _child_mth=_child_obj+'()';_api_register(_child_mth,function(data,klass){var ctx=this.context;if(data===undefined){return ctx.length&&this.length?ctx[0].aoData[this[0]]._details:undefined;}
else if(data===true){this.child.show();}
else if(data===false){__details_remove(this);}
else if(ctx.length&&this.length){__details_add(ctx[0],ctx[0].aoData[this[0]],data,klass);}
return this;});_api_register([_child_obj+'.show()',_child_mth+'.show()'],function(show){__details_display(this,true);return this;});_api_register([_child_obj+'.hide()',_child_mth+'.hide()'],function(){__details_display(this,false);return this;});_api_register([_child_obj+'.remove()',_child_mth+'.remove()'],function(){__details_remove(this);return this;});_api_register(_child_obj+'.isShown()',function(){var ctx=this.context;if(ctx.length&&this.length){return ctx[0].aoData[this[0]]._detailsShow||false;}
return false;});var __re_column_selector=/^([^:]+):(name|visIdx|visible)$/;var __columnData=function(settings,column,r1,r2,rows){var a=[];for(var row=0,ien=rows.length;row<ien;row++){a.push(_fnGetCellData(settings,rows[row],column));}
return a;};var __column_selector=function(settings,selector,opts)
{var
columns=settings.aoColumns,names=_pluck(columns,'sName'),nodes=_pluck(columns,'nTh');var run=function(s){var selInt=_intVal(s);if(s===''){return _range(columns.length);}
if(selInt!==null){return[selInt>=0?selInt:columns.length+selInt];}
if(typeof s==='function'){var rows=_selector_row_indexes(settings,opts);return $.map(columns,function(col,idx){return s(idx,__columnData(settings,idx,0,0,rows),nodes[idx])?idx:null;});}
var match=typeof s==='string'?s.match(__re_column_selector):'';if(match){switch(match[2]){case 'visIdx':case 'visible':var idx=parseInt(match[1],10);if(idx<0){var visColumns=$.map(columns,function(col,i){return col.bVisible?i:null;});return[visColumns[visColumns.length+idx]];}
return[_fnVisibleToColumnIndex(settings,idx)];case 'name':return $.map(names,function(name,i){return name===match[1]?i:null;});default:return[];}}
if(s.nodeName&&s._DT_CellIndex){return[s._DT_CellIndex.column];}
var jqResult=$(nodes).filter(s).map(function(){return $.inArray(this,nodes);}).toArray();if(jqResult.length||!s.nodeName){return jqResult;}
var host=$(s).closest('*[data-dt-column]');return host.length?[host.data('dt-column')]:[];};return _selector_run('column',selector,run,settings,opts);};var __setColumnVis=function(settings,column,vis){var
cols=settings.aoColumns,col=cols[column],data=settings.aoData,row,cells,i,ien,tr;if(vis===undefined){return col.bVisible;}
if(col.bVisible===vis){return;}
if(vis){var insertBefore=$.inArray(true,_pluck(cols,'bVisible'),column+1);for(i=0,ien=data.length;i<ien;i++){tr=data[i].nTr;cells=data[i].anCells;if(tr){tr.insertBefore(cells[column],cells[insertBefore]||null);}}}
else{$(_pluck(settings.aoData,'anCells',column)).detach();}
col.bVisible=vis;};_api_register('columns()',function(selector,opts){if(selector===undefined){selector='';}
else if($.isPlainObject(selector)){opts=selector;selector='';}
opts=_selector_opts(opts);var inst=this.iterator('table',function(settings){return __column_selector(settings,selector,opts);},1);inst.selector.cols=selector;inst.selector.opts=opts;return inst;});_api_registerPlural('columns().header()','column().header()',function(selector,opts){return this.iterator('column',function(settings,column){return settings.aoColumns[column].nTh;},1);});_api_registerPlural('columns().footer()','column().footer()',function(selector,opts){return this.iterator('column',function(settings,column){return settings.aoColumns[column].nTf;},1);});_api_registerPlural('columns().data()','column().data()',function(){return this.iterator('column-rows',__columnData,1);});_api_registerPlural('columns().dataSrc()','column().dataSrc()',function(){return this.iterator('column',function(settings,column){return settings.aoColumns[column].mData;},1);});_api_registerPlural('columns().cache()','column().cache()',function(type){return this.iterator('column-rows',function(settings,column,i,j,rows){return _pluck_order(settings.aoData,rows,type==='search'?'_aFilterData':'_aSortData',column);},1);});_api_registerPlural('columns().nodes()','column().nodes()',function(){return this.iterator('column-rows',function(settings,column,i,j,rows){return _pluck_order(settings.aoData,rows,'anCells',column);},1);});_api_registerPlural('columns().visible()','column().visible()',function(vis,calc){var that=this;var ret=this.iterator('column',function(settings,column){if(vis===undefined){return settings.aoColumns[column].bVisible;}
__setColumnVis(settings,column,vis);});if(vis!==undefined){this.iterator('table',function(settings){_fnDrawHead(settings,settings.aoHeader);_fnDrawHead(settings,settings.aoFooter);if(!settings.aiDisplay.length){$(settings.nTBody).find('td[colspan]').attr('colspan',_fnVisbleColumns(settings));}
_fnSaveState(settings);that.iterator('column',function(settings,column){_fnCallbackFire(settings,null,'column-visibility',[settings,column,vis,calc]);});if(calc===undefined||calc){that.columns.adjust();}});}
return ret;});_api_registerPlural('columns().indexes()','column().index()',function(type){return this.iterator('column',function(settings,column){return type==='visible'?_fnColumnIndexToVisible(settings,column):column;},1);});_api_register('columns.adjust()',function(){return this.iterator('table',function(settings){_fnAdjustColumnSizing(settings);},1);});_api_register('column.index()',function(type,idx){if(this.context.length!==0){var ctx=this.context[0];if(type==='fromVisible'||type==='toData'){return _fnVisibleToColumnIndex(ctx,idx);}
else if(type==='fromData'||type==='toVisible'){return _fnColumnIndexToVisible(ctx,idx);}}});_api_register('column()',function(selector,opts){return _selector_first(this.columns(selector,opts));});var __cell_selector=function(settings,selector,opts)
{var data=settings.aoData;var rows=_selector_row_indexes(settings,opts);var cells=_removeEmpty(_pluck_order(data,rows,'anCells'));var allCells=$(_flatten([],cells));var row;var columns=settings.aoColumns.length;var a,i,ien,j,o,host;var run=function(s){var fnSelector=typeof s==='function';if(s===null||s===undefined||fnSelector){a=[];for(i=0,ien=rows.length;i<ien;i++){row=rows[i];for(j=0;j<columns;j++){o={row:row,column:j};if(fnSelector){host=data[row];if(s(o,_fnGetCellData(settings,row,j),host.anCells?host.anCells[j]:null)){a.push(o);}}
else{a.push(o);}}}
return a;}
if($.isPlainObject(s)){return s.column!==undefined&&s.row!==undefined&&$.inArray(s.row,rows)!==-1?[s]:[];}
var jqResult=allCells.filter(s).map(function(i,el){return{row:el._DT_CellIndex.row,column:el._DT_CellIndex.column};}).toArray();if(jqResult.length||!s.nodeName){return jqResult;}
host=$(s).closest('*[data-dt-row]');return host.length?[{row:host.data('dt-row'),column:host.data('dt-column')}]:[];};return _selector_run('cell',selector,run,settings,opts);};_api_register('cells()',function(rowSelector,columnSelector,opts){if($.isPlainObject(rowSelector)){if(rowSelector.row===undefined){opts=rowSelector;rowSelector=null;}
else{opts=columnSelector;columnSelector=null;}}
if($.isPlainObject(columnSelector)){opts=columnSelector;columnSelector=null;}
if(columnSelector===null||columnSelector===undefined){return this.iterator('table',function(settings){return __cell_selector(settings,rowSelector,_selector_opts(opts));});}
var internalOpts=opts?{page:opts.page,order:opts.order,search:opts.search}:{};var columns=this.columns(columnSelector,internalOpts);var rows=this.rows(rowSelector,internalOpts);var i,ien,j,jen;var cellsNoOpts=this.iterator('table',function(settings,idx){var a=[];for(i=0,ien=rows[idx].length;i<ien;i++){for(j=0,jen=columns[idx].length;j<jen;j++){a.push({row:rows[idx][i],column:columns[idx][j]});}}
return a;},1);var cells=opts&&opts.selected?this.cells(cellsNoOpts,opts):cellsNoOpts;$.extend(cells.selector,{cols:columnSelector,rows:rowSelector,opts:opts});return cells;});_api_registerPlural('cells().nodes()','cell().node()',function(){return this.iterator('cell',function(settings,row,column){var data=settings.aoData[row];return data&&data.anCells?data.anCells[column]:undefined;},1);});_api_register('cells().data()',function(){return this.iterator('cell',function(settings,row,column){return _fnGetCellData(settings,row,column);},1);});_api_registerPlural('cells().cache()','cell().cache()',function(type){type=type==='search'?'_aFilterData':'_aSortData';return this.iterator('cell',function(settings,row,column){return settings.aoData[row][type][column];},1);});_api_registerPlural('cells().render()','cell().render()',function(type){return this.iterator('cell',function(settings,row,column){return _fnGetCellData(settings,row,column,type);},1);});_api_registerPlural('cells().indexes()','cell().index()',function(){return this.iterator('cell',function(settings,row,column){return{row:row,column:column,columnVisible:_fnColumnIndexToVisible(settings,column)};},1);});_api_registerPlural('cells().invalidate()','cell().invalidate()',function(src){return this.iterator('cell',function(settings,row,column){_fnInvalidate(settings,row,src,column);});});_api_register('cell()',function(rowSelector,columnSelector,opts){return _selector_first(this.cells(rowSelector,columnSelector,opts));});_api_register('cell().data()',function(data){var ctx=this.context;var cell=this[0];if(data===undefined){return ctx.length&&cell.length?_fnGetCellData(ctx[0],cell[0].row,cell[0].column):undefined;}
_fnSetCellData(ctx[0],cell[0].row,cell[0].column,data);_fnInvalidate(ctx[0],cell[0].row,'data',cell[0].column);return this;});_api_register('order()',function(order,dir){var ctx=this.context;if(order===undefined){return ctx.length!==0?ctx[0].aaSorting:undefined;}
if(typeof order==='number'){order=[[order,dir]];}
else if(order.length&&!Array.isArray(order[0])){order=Array.prototype.slice.call(arguments);}
return this.iterator('table',function(settings){settings.aaSorting=order.slice();});});_api_register('order.listener()',function(node,column,callback){return this.iterator('table',function(settings){_fnSortAttachListener(settings,node,column,callback);});});_api_register('order.fixed()',function(set){if(!set){var ctx=this.context;var fixed=ctx.length?ctx[0].aaSortingFixed:undefined;return Array.isArray(fixed)?{pre:fixed}:fixed;}
return this.iterator('table',function(settings){settings.aaSortingFixed=$.extend(true,{},set);});});_api_register(['columns().order()','column().order()'],function(dir){var that=this;return this.iterator('table',function(settings,i){var sort=[];$.each(that[i],function(j,col){sort.push([col,dir]);});settings.aaSorting=sort;});});_api_register('search()',function(input,regex,smart,caseInsen){var ctx=this.context;if(input===undefined){return ctx.length!==0?ctx[0].oPreviousSearch.sSearch:undefined;}
return this.iterator('table',function(settings){if(!settings.oFeatures.bFilter){return;}
_fnFilterComplete(settings,$.extend({},settings.oPreviousSearch,{"sSearch":input+"","bRegex":regex===null?false:regex,"bSmart":smart===null?true:smart,"bCaseInsensitive":caseInsen===null?true:caseInsen}),1);});});_api_registerPlural('columns().search()','column().search()',function(input,regex,smart,caseInsen){return this.iterator('column',function(settings,column){var preSearch=settings.aoPreSearchCols;if(input===undefined){return preSearch[column].sSearch;}
if(!settings.oFeatures.bFilter){return;}
$.extend(preSearch[column],{"sSearch":input+"","bRegex":regex===null?false:regex,"bSmart":smart===null?true:smart,"bCaseInsensitive":caseInsen===null?true:caseInsen});_fnFilterComplete(settings,settings.oPreviousSearch,1);});});_api_register('state()',function(){return this.context.length?this.context[0].oSavedState:null;});_api_register('state.clear()',function(){return this.iterator('table',function(settings){settings.fnStateSaveCallback.call(settings.oInstance,settings,{});});});_api_register('state.loaded()',function(){return this.context.length?this.context[0].oLoadedState:null;});_api_register('state.save()',function(){return this.iterator('table',function(settings){_fnSaveState(settings);});});DataTable.versionCheck=DataTable.fnVersionCheck=function(version)
{var aThis=DataTable.version.split('.');var aThat=version.split('.');var iThis,iThat;for(var i=0,iLen=aThat.length;i<iLen;i++){iThis=parseInt(aThis[i],10)||0;iThat=parseInt(aThat[i],10)||0;if(iThis===iThat){continue;}
return iThis>iThat;}
return true;};DataTable.isDataTable=DataTable.fnIsDataTable=function(table)
{var t=$(table).get(0);var is=false;if(table instanceof DataTable.Api){return true;}
$.each(DataTable.settings,function(i,o){var head=o.nScrollHead?$('table',o.nScrollHead)[0]:null;var foot=o.nScrollFoot?$('table',o.nScrollFoot)[0]:null;if(o.nTable===t||head===t||foot===t){is=true;}});return is;};DataTable.tables=DataTable.fnTables=function(visible)
{var api=false;if($.isPlainObject(visible)){api=visible.api;visible=visible.visible;}
var a=$.map(DataTable.settings,function(o){if(!visible||(visible&&$(o.nTable).is(':visible'))){return o.nTable;}});return api?new _Api(a):a;};DataTable.camelToHungarian=_fnCamelToHungarian;_api_register('$()',function(selector,opts){var
rows=this.rows(opts).nodes(),jqRows=$(rows);return $([].concat(jqRows.filter(selector).toArray(),jqRows.find(selector).toArray()));});$.each(['on','one','off'],function(i,key){_api_register(key+'()',function(){var args=Array.prototype.slice.call(arguments);args[0]=$.map(args[0].split(/\s/),function(e){return!e.match(/\.dt\b/)?e+'.dt':e;}).join(' ');var inst=$(this.tables().nodes());inst[key].apply(inst,args);return this;});});_api_register('clear()',function(){return this.iterator('table',function(settings){_fnClearTable(settings);});});_api_register('settings()',function(){return new _Api(this.context,this.context);});_api_register('init()',function(){var ctx=this.context;return ctx.length?ctx[0].oInit:null;});_api_register('data()',function(){return this.iterator('table',function(settings){return _pluck(settings.aoData,'_aData');}).flatten();});_api_register('destroy()',function(remove){remove=remove||false;return this.iterator('table',function(settings){var classes=settings.oClasses;var table=settings.nTable;var tbody=settings.nTBody;var thead=settings.nTHead;var tfoot=settings.nTFoot;var jqTable=$(table);var jqTbody=$(tbody);var jqWrapper=$(settings.nTableWrapper);var rows=$.map(settings.aoData,function(r){return r.nTr;});var i,ien;settings.bDestroying=true;_fnCallbackFire(settings,"aoDestroyCallback","destroy",[settings]);if(!remove){new _Api(settings).columns().visible(true);}
jqWrapper.off('.DT').find(':not(tbody *)').off('.DT');$(window).off('.DT-'+settings.sInstance);if(table!=thead.parentNode){jqTable.children('thead').detach();jqTable.append(thead);}
if(tfoot&&table!=tfoot.parentNode){jqTable.children('tfoot').detach();jqTable.append(tfoot);}
settings.aaSorting=[];settings.aaSortingFixed=[];_fnSortingClasses(settings);$(rows).removeClass(settings.asStripeClasses.join(' '));$('th, td',thead).removeClass(classes.sSortable+' '+
classes.sSortableAsc+' '+classes.sSortableDesc+' '+classes.sSortableNone);jqTbody.children().detach();jqTbody.append(rows);var orig=settings.nTableWrapper.parentNode;var removedMethod=remove?'remove':'detach';jqTable[removedMethod]();jqWrapper[removedMethod]();if(!remove&&orig){orig.insertBefore(table,settings.nTableReinsertBefore);jqTable.css('width',settings.sDestroyWidth).removeClass(classes.sTable);ien=settings.asDestroyStripes.length;if(ien){jqTbody.children().each(function(i){$(this).addClass(settings.asDestroyStripes[i%ien]);});}}
var idx=$.inArray(settings,DataTable.settings);if(idx!==-1){DataTable.settings.splice(idx,1);}});});$.each(['column','row','cell'],function(i,type){_api_register(type+'s().every()',function(fn){var opts=this.selector.opts;var api=this;return this.iterator(type,function(settings,arg1,arg2,arg3,arg4){fn.call(api[type](arg1,type==='cell'?arg2:opts,type==='cell'?opts:undefined),arg1,arg2,arg3,arg4);});});});_api_register('i18n()',function(token,def,plural){var ctx=this.context[0];var resolved=_fnGetObjectDataFn(token)(ctx.oLanguage);if(resolved===undefined){resolved=def;}
if(plural!==undefined&&$.isPlainObject(resolved)){resolved=resolved[plural]!==undefined?resolved[plural]:resolved._;}
return resolved.replace('%d',plural);});DataTable.version="1.13.1";DataTable.settings=[];DataTable.models={};DataTable.models.oSearch={"bCaseInsensitive":true,"sSearch":"","bRegex":false,"bSmart":true,"return":false};DataTable.models.oRow={"nTr":null,"anCells":null,"_aData":[],"_aSortData":null,"_aFilterData":null,"_sFilterRow":null,"_sRowStripe":"","src":null,"idx":-1};DataTable.models.oColumn={"idx":null,"aDataSort":null,"asSorting":null,"bSearchable":null,"bSortable":null,"bVisible":null,"_sManualType":null,"_bAttrSrc":false,"fnCreatedCell":null,"fnGetData":null,"fnSetData":null,"mData":null,"mRender":null,"nTh":null,"nTf":null,"sClass":null,"sContentPadding":null,"sDefaultContent":null,"sName":null,"sSortDataType":'std',"sSortingClass":null,"sSortingClassJUI":null,"sTitle":null,"sType":null,"sWidth":null,"sWidthOrig":null};DataTable.defaults={"aaData":null,"aaSorting":[[0,'asc']],"aaSortingFixed":[],"ajax":null,"aLengthMenu":[10,25,50,100],"aoColumns":null,"aoColumnDefs":null,"aoSearchCols":[],"asStripeClasses":null,"bAutoWidth":true,"bDeferRender":false,"bDestroy":false,"bFilter":true,"bInfo":true,"bLengthChange":true,"bPaginate":true,"bProcessing":false,"bRetrieve":false,"bScrollCollapse":false,"bServerSide":false,"bSort":true,"bSortMulti":true,"bSortCellsTop":false,"bSortClasses":true,"bStateSave":false,"fnCreatedRow":null,"fnDrawCallback":null,"fnFooterCallback":null,"fnFormatNumber":function(toFormat){return toFormat.toString().replace(/\B(?=(\d{3})+(?!\d))/g,this.oLanguage.sThousands);},"fnHeaderCallback":null,"fnInfoCallback":null,"fnInitComplete":null,"fnPreDrawCallback":null,"fnRowCallback":null,"fnServerData":null,"fnServerParams":null,"fnStateLoadCallback":function(settings){try{return JSON.parse((settings.iStateDuration===-1?sessionStorage:localStorage).getItem('DataTables_'+settings.sInstance+'_'+location.pathname));}catch(e){return{};}},"fnStateLoadParams":null,"fnStateLoaded":null,"fnStateSaveCallback":function(settings,data){try{(settings.iStateDuration===-1?sessionStorage:localStorage).setItem('DataTables_'+settings.sInstance+'_'+location.pathname,JSON.stringify(data));}catch(e){}},"fnStateSaveParams":null,"iStateDuration":7200,"iDeferLoading":null,"iDisplayLength":10,"iDisplayStart":0,"iTabIndex":0,"oClasses":{},"oLanguage":{"oAria":{"sSortAscending":": activate to sort column ascending","sSortDescending":": activate to sort column descending"},"oPaginate":{"sFirst":"First","sLast":"Last","sNext":"Next","sPrevious":"Previous"},"sEmptyTable":"No data available in table","sInfo":"Showing _START_ to _END_ of _TOTAL_ entries","sInfoEmpty":"Showing 0 to 0 of 0 entries","sInfoFiltered":"(filtered from _MAX_ total entries)","sInfoPostFix":"","sDecimal":"","sThousands":",","sLengthMenu":"Show _MENU_ entries","sLoadingRecords":"Loading...","sProcessing":"","sSearch":"Search:","sSearchPlaceholder":"","sUrl":"","sZeroRecords":"No matching records found"},"oSearch":$.extend({},DataTable.models.oSearch),"sAjaxDataProp":"data","sAjaxSource":null,"sDom":"lfrtip","searchDelay":null,"sPaginationType":"simple_numbers","sScrollX":"","sScrollXInner":"","sScrollY":"","sServerMethod":"GET","renderer":null,"rowId":"DT_RowId"};_fnHungarianMap(DataTable.defaults);DataTable.defaults.column={"aDataSort":null,"iDataSort":-1,"asSorting":['asc','desc'],"bSearchable":true,"bSortable":true,"bVisible":true,"fnCreatedCell":null,"mData":null,"mRender":null,"sCellType":"td","sClass":"","sContentPadding":"","sDefaultContent":null,"sName":"","sSortDataType":"std","sTitle":null,"sType":null,"sWidth":null};_fnHungarianMap(DataTable.defaults.column);DataTable.models.oSettings={"oFeatures":{"bAutoWidth":null,"bDeferRender":null,"bFilter":null,"bInfo":null,"bLengthChange":null,"bPaginate":null,"bProcessing":null,"bServerSide":null,"bSort":null,"bSortMulti":null,"bSortClasses":null,"bStateSave":null},"oScroll":{"bCollapse":null,"iBarWidth":0,"sX":null,"sXInner":null,"sY":null},"oLanguage":{"fnInfoCallback":null},"oBrowser":{"bScrollOversize":false,"bScrollbarLeft":false,"bBounding":false,"barWidth":0},"ajax":null,"aanFeatures":[],"aoData":[],"aiDisplay":[],"aiDisplayMaster":[],"aIds":{},"aoColumns":[],"aoHeader":[],"aoFooter":[],"oPreviousSearch":{},"aoPreSearchCols":[],"aaSorting":null,"aaSortingFixed":[],"asStripeClasses":null,"asDestroyStripes":[],"sDestroyWidth":0,"aoRowCallback":[],"aoHeaderCallback":[],"aoFooterCallback":[],"aoDrawCallback":[],"aoRowCreatedCallback":[],"aoPreDrawCallback":[],"aoInitComplete":[],"aoStateSaveParams":[],"aoStateLoadParams":[],"aoStateLoaded":[],"sTableId":"","nTable":null,"nTHead":null,"nTFoot":null,"nTBody":null,"nTableWrapper":null,"bDeferLoading":false,"bInitialised":false,"aoOpenRows":[],"sDom":null,"searchDelay":null,"sPaginationType":"two_button","iStateDuration":0,"aoStateSave":[],"aoStateLoad":[],"oSavedState":null,"oLoadedState":null,"sAjaxSource":null,"sAjaxDataProp":null,"jqXHR":null,"json":undefined,"oAjaxData":undefined,"fnServerData":null,"aoServerParams":[],"sServerMethod":null,"fnFormatNumber":null,"aLengthMenu":null,"iDraw":0,"bDrawing":false,"iDrawError":-1,"_iDisplayLength":10,"_iDisplayStart":0,"_iRecordsTotal":0,"_iRecordsDisplay":0,"oClasses":{},"bFiltered":false,"bSorted":false,"bSortCellsTop":null,"oInit":null,"aoDestroyCallback":[],"fnRecordsTotal":function()
{return _fnDataSource(this)=='ssp'?this._iRecordsTotal*1:this.aiDisplayMaster.length;},"fnRecordsDisplay":function()
{return _fnDataSource(this)=='ssp'?this._iRecordsDisplay*1:this.aiDisplay.length;},"fnDisplayEnd":function()
{var
len=this._iDisplayLength,start=this._iDisplayStart,calc=start+len,records=this.aiDisplay.length,features=this.oFeatures,paginate=features.bPaginate;if(features.bServerSide){return paginate===false||len===-1?start+records:Math.min(start+len,this._iRecordsDisplay);}
else{return!paginate||calc>records||len===-1?records:calc;}},"oInstance":null,"sInstance":null,"iTabIndex":0,"nScrollHead":null,"nScrollFoot":null,"aLastSort":[],"oPlugins":{},"rowIdFn":null,"rowId":null};DataTable.ext=_ext={buttons:{},classes:{},builder:"-source-",errMode:"alert",feature:[],search:[],selector:{cell:[],column:[],row:[]},internal:{},legacy:{ajax:null},pager:{},renderer:{pageButton:{},header:{}},order:{},type:{detect:[],search:{},order:{}},_unique:0,fnVersionCheck:DataTable.fnVersionCheck,iApiIndex:0,oJUIClasses:{},sVersion:DataTable.version};$.extend(_ext,{afnFiltering:_ext.search,aTypes:_ext.type.detect,ofnSearch:_ext.type.search,oSort:_ext.type.order,afnSortData:_ext.order,aoFeatures:_ext.feature,oApi:_ext.internal,oStdClasses:_ext.classes,oPagination:_ext.pager});$.extend(DataTable.ext.classes,{"sTable":"dataTable","sNoFooter":"no-footer","sPageButton":"paginate_button","sPageButtonActive":"current","sPageButtonDisabled":"disabled","sStripeOdd":"odd","sStripeEven":"even","sRowEmpty":"dataTables_empty","sWrapper":"dataTables_wrapper","sFilter":"dataTables_filter","sInfo":"dataTables_info","sPaging":"dataTables_paginate paging_","sLength":"dataTables_length","sProcessing":"dataTables_processing","sSortAsc":"sorting_asc","sSortDesc":"sorting_desc","sSortable":"sorting","sSortableAsc":"sorting_desc_disabled","sSortableDesc":"sorting_asc_disabled","sSortableNone":"sorting_disabled","sSortColumn":"sorting_","sFilterInput":"","sLengthSelect":"","sScrollWrapper":"dataTables_scroll","sScrollHead":"dataTables_scrollHead","sScrollHeadInner":"dataTables_scrollHeadInner","sScrollBody":"dataTables_scrollBody","sScrollFoot":"dataTables_scrollFoot","sScrollFootInner":"dataTables_scrollFootInner","sHeaderTH":"","sFooterTH":"","sSortJUIAsc":"","sSortJUIDesc":"","sSortJUI":"","sSortJUIAscAllowed":"","sSortJUIDescAllowed":"","sSortJUIWrapper":"","sSortIcon":"","sJUIHeader":"","sJUIFooter":""});var extPagination=DataTable.ext.pager;function _numbers(page,pages){var
numbers=[],buttons=extPagination.numbers_length,half=Math.floor(buttons/2),i=1;if(pages<=buttons){numbers=_range(0,pages);}
else if(page<=half){numbers=_range(0,buttons-2);numbers.push('ellipsis');numbers.push(pages-1);}
else if(page>=pages-1-half){numbers=_range(pages-(buttons-2),pages);numbers.splice(0,0,'ellipsis');numbers.splice(0,0,0);}
else{numbers=_range(page-half+2,page+half-1);numbers.push('ellipsis');numbers.push(pages-1);numbers.splice(0,0,'ellipsis');numbers.splice(0,0,0);}
numbers.DT_el='span';return numbers;}
$.extend(extPagination,{simple:function(page,pages){return['previous','next'];},full:function(page,pages){return['first','previous','next','last'];},numbers:function(page,pages){return[_numbers(page,pages)];},simple_numbers:function(page,pages){return['previous',_numbers(page,pages),'next'];},full_numbers:function(page,pages){return['first','previous',_numbers(page,pages),'next','last'];},first_last_numbers:function(page,pages){return['first',_numbers(page,pages),'last'];},_numbers:_numbers,numbers_length:7});$.extend(true,DataTable.ext.renderer,{pageButton:{_:function(settings,host,idx,buttons,page,pages){var classes=settings.oClasses;var lang=settings.oLanguage.oPaginate;var aria=settings.oLanguage.oAria.paginate||{};var btnDisplay,btnClass;var attach=function(container,buttons){var i,ien,node,button,tabIndex;var disabledClass=classes.sPageButtonDisabled;var clickHandler=function(e){_fnPageChange(settings,e.data.action,true);};for(i=0,ien=buttons.length;i<ien;i++){button=buttons[i];if(Array.isArray(button)){var inner=$('<'+(button.DT_el||'div')+'/>').appendTo(container);attach(inner,button);}
else{btnDisplay=null;btnClass=button;tabIndex=settings.iTabIndex;switch(button){case 'ellipsis':container.append('<span class="ellipsis">&#x2026;</span>');break;case 'first':btnDisplay=lang.sFirst;if(page===0){tabIndex=-1;btnClass+=' '+disabledClass;}
break;case 'previous':btnDisplay=lang.sPrevious;if(page===0){tabIndex=-1;btnClass+=' '+disabledClass;}
break;case 'next':btnDisplay=lang.sNext;if(pages===0||page===pages-1){tabIndex=-1;btnClass+=' '+disabledClass;}
break;case 'last':btnDisplay=lang.sLast;if(pages===0||page===pages-1){tabIndex=-1;btnClass+=' '+disabledClass;}
break;default:btnDisplay=settings.fnFormatNumber(button+1);btnClass=page===button?classes.sPageButtonActive:'';break;}
if(btnDisplay!==null){node=$('<a>',{'class':classes.sPageButton+' '+btnClass,'aria-controls':settings.sTableId,'aria-label':aria[button],'data-dt-idx':button,'tabindex':tabIndex,'id':idx===0&&typeof button==='string'?settings.sTableId+'_'+button:null}).html(btnDisplay).appendTo(container);_fnBindAction(node,{action:button},clickHandler);}}}};var activeEl;try{activeEl=$(host).find(document.activeElement).data('dt-idx');}
catch(e){}
attach($(host).empty(),buttons);if(activeEl!==undefined){$(host).find('[data-dt-idx='+activeEl+']').trigger('focus');}}}});$.extend(DataTable.ext.type.detect,[function(d,settings)
{var decimal=settings.oLanguage.sDecimal;return _isNumber(d,decimal)?'num'+decimal:null;},function(d,settings)
{if(d&&!(d instanceof Date)&&!_re_date.test(d)){return null;}
var parsed=Date.parse(d);return(parsed!==null&&!isNaN(parsed))||_empty(d)?'date':null;},function(d,settings)
{var decimal=settings.oLanguage.sDecimal;return _isNumber(d,decimal,true)?'num-fmt'+decimal:null;},function(d,settings)
{var decimal=settings.oLanguage.sDecimal;return _htmlNumeric(d,decimal)?'html-num'+decimal:null;},function(d,settings)
{var decimal=settings.oLanguage.sDecimal;return _htmlNumeric(d,decimal,true)?'html-num-fmt'+decimal:null;},function(d,settings)
{return _empty(d)||(typeof d==='string'&&d.indexOf('<')!==-1)?'html':null;}]);$.extend(DataTable.ext.type.search,{html:function(data){return _empty(data)?data:typeof data==='string'?data.replace(_re_new_lines," ").replace(_re_html,""):'';},string:function(data){return _empty(data)?data:typeof data==='string'?data.replace(_re_new_lines," "):data;}});var __numericReplace=function(d,decimalPlace,re1,re2){if(d!==0&&(!d||d==='-')){return-Infinity;}
if(decimalPlace){d=_numToDecimal(d,decimalPlace);}
if(d.replace){if(re1){d=d.replace(re1,'');}
if(re2){d=d.replace(re2,'');}}
return d*1;};function _addNumericSort(decimalPlace){$.each({"num":function(d){return __numericReplace(d,decimalPlace);},"num-fmt":function(d){return __numericReplace(d,decimalPlace,_re_formatted_numeric);},"html-num":function(d){return __numericReplace(d,decimalPlace,_re_html);},"html-num-fmt":function(d){return __numericReplace(d,decimalPlace,_re_html,_re_formatted_numeric);}},function(key,fn){_ext.type.order[key+decimalPlace+'-pre']=fn;if(key.match(/^html\-/)){_ext.type.search[key+decimalPlace]=_ext.type.search.html;}});}
$.extend(_ext.type.order,{"date-pre":function(d){var ts=Date.parse(d);return isNaN(ts)?-Infinity:ts;},"html-pre":function(a){return _empty(a)?'':a.replace?a.replace(/<.*?>/g,"").toLowerCase():a+'';},"string-pre":function(a){return _empty(a)?'':typeof a==='string'?a.toLowerCase():!a.toString?'':a.toString();},"string-asc":function(x,y){return((x<y)?-1:((x>y)?1:0));},"string-desc":function(x,y){return((x<y)?1:((x>y)?-1:0));}});_addNumericSort('');$.extend(true,DataTable.ext.renderer,{header:{_:function(settings,cell,column,classes){$(settings.nTable).on('order.dt.DT',function(e,ctx,sorting,columns){if(settings!==ctx){return;}
var colIdx=column.idx;cell.removeClass(classes.sSortAsc+' '+
classes.sSortDesc).addClass(columns[colIdx]=='asc'?classes.sSortAsc:columns[colIdx]=='desc'?classes.sSortDesc:column.sSortingClass);});},jqueryui:function(settings,cell,column,classes){$('<div/>').addClass(classes.sSortJUIWrapper).append(cell.contents()).append($('<span/>').addClass(classes.sSortIcon+' '+column.sSortingClassJUI)).appendTo(cell);$(settings.nTable).on('order.dt.DT',function(e,ctx,sorting,columns){if(settings!==ctx){return;}
var colIdx=column.idx;cell.removeClass(classes.sSortAsc+" "+classes.sSortDesc).addClass(columns[colIdx]=='asc'?classes.sSortAsc:columns[colIdx]=='desc'?classes.sSortDesc:column.sSortingClass);cell.find('span.'+classes.sSortIcon).removeClass(classes.sSortJUIAsc+" "+
classes.sSortJUIDesc+" "+
classes.sSortJUI+" "+
classes.sSortJUIAscAllowed+" "+
classes.sSortJUIDescAllowed).addClass(columns[colIdx]=='asc'?classes.sSortJUIAsc:columns[colIdx]=='desc'?classes.sSortJUIDesc:column.sSortingClassJUI);});}}});var __htmlEscapeEntities=function(d){if(Array.isArray(d)){d=d.join(',');}
return typeof d==='string'?d.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'):d;};function __mld(dt,momentFn,luxonFn,dateFn,arg1){if(window.moment){return dt[momentFn](arg1);}
else if(window.luxon){return dt[luxonFn](arg1);}
return dateFn?dt[dateFn](arg1):dt;}
var __mlWarning=false;function __mldObj(d,format,locale){var dt;if(window.moment){dt=window.moment.utc(d,format,locale,true);if(!dt.isValid()){return null;}}
else if(window.luxon){dt=format&&typeof d==='string'?window.luxon.DateTime.fromFormat(d,format):window.luxon.DateTime.fromISO(d);if(!dt.isValid){return null;}
dt.setLocale(locale);}
else if(!format){dt=new Date(d);}
else{if(!__mlWarning){alert('DataTables warning: Formatted date without Moment.js or Luxon - https://datatables.net/tn/17');}
__mlWarning=true;}
return dt;}
function __mlHelper(localeString){return function(from,to,locale,def){if(arguments.length===0){locale='en';to=null;from=null;}
else if(arguments.length===1){locale='en';to=from;from=null;}
else if(arguments.length===2){locale=to;to=from;from=null;}
var typeName='datetime-'+to;if(!DataTable.ext.type.order[typeName]){DataTable.ext.type.detect.unshift(function(d){return d===typeName?typeName:false;});DataTable.ext.type.order[typeName+'-asc']=function(a,b){var x=a.valueOf();var y=b.valueOf();return x===y?0:x<y?-1:1;}
DataTable.ext.type.order[typeName+'-desc']=function(a,b){var x=a.valueOf();var y=b.valueOf();return x===y?0:x>y?-1:1;}}
return function(d,type){if(d===null||d===undefined){if(def==='--now'){var local=new Date();d=new Date(Date.UTC(local.getFullYear(),local.getMonth(),local.getDate(),local.getHours(),local.getMinutes(),local.getSeconds()));}
else{d='';}}
if(type==='type'){return typeName;}
if(d===''){return type!=='sort'?'':__mldObj('0000-01-01 00:00:00',null,locale);}
if(to!==null&&from===to&&type!=='sort'&&type!=='type'&&!(d instanceof Date)){return d;}
var dt=__mldObj(d,from,locale);if(dt===null){return d;}
if(type==='sort'){return dt;}
var formatted=to===null?__mld(dt,'toDate','toJSDate','')[localeString]():__mld(dt,'format','toFormat','toISOString',to);return type==='display'?__htmlEscapeEntities(formatted):formatted;};}}
var __thousands=',';var __decimal='.';if(Intl){try{var num=new Intl.NumberFormat().formatToParts(100000.1);for(var i=0;i<num.length;i++){if(num[i].type==='group'){__thousands=num[i].value;}
else if(num[i].type==='decimal'){__decimal=num[i].value;}}}
catch(e){}}
DataTable.datetime=function(format,locale){var typeName='datetime-detect-'+format;if(!locale){locale='en';}
if(!DataTable.ext.type.order[typeName]){DataTable.ext.type.detect.unshift(function(d){var dt=__mldObj(d,format,locale);return d===''||dt?typeName:false;});DataTable.ext.type.order[typeName+'-pre']=function(d){return __mldObj(d,format,locale)||0;}}}
DataTable.render={date:__mlHelper('toLocaleDateString'),datetime:__mlHelper('toLocaleString'),time:__mlHelper('toLocaleTimeString'),number:function(thousands,decimal,precision,prefix,postfix){if(thousands===null||thousands===undefined){thousands=__thousands;}
if(decimal===null||decimal===undefined){decimal=__decimal;}
return{display:function(d){if(typeof d!=='number'&&typeof d!=='string'){return d;}
if(d===''||d===null){return d;}
var negative=d<0?'-':'';var flo=parseFloat(d);if(isNaN(flo)){return __htmlEscapeEntities(d);}
flo=flo.toFixed(precision);d=Math.abs(flo);var intPart=parseInt(d,10);var floatPart=precision?decimal+(d-intPart).toFixed(precision).substring(2):'';if(intPart===0&&parseFloat(floatPart)===0){negative='';}
return negative+(prefix||'')+
intPart.toString().replace(/\B(?=(\d{3})+(?!\d))/g,thousands)+
floatPart+
(postfix||'');}};},text:function(){return{display:__htmlEscapeEntities,filter:__htmlEscapeEntities};}};function _fnExternApiFunc(fn)
{return function(){var args=[_fnSettingsFromNode(this[DataTable.ext.iApiIndex])].concat(Array.prototype.slice.call(arguments));return DataTable.ext.internal[fn].apply(this,args);};}
$.extend(DataTable.ext.internal,{_fnExternApiFunc:_fnExternApiFunc,_fnBuildAjax:_fnBuildAjax,_fnAjaxUpdate:_fnAjaxUpdate,_fnAjaxParameters:_fnAjaxParameters,_fnAjaxUpdateDraw:_fnAjaxUpdateDraw,_fnAjaxDataSrc:_fnAjaxDataSrc,_fnAddColumn:_fnAddColumn,_fnColumnOptions:_fnColumnOptions,_fnAdjustColumnSizing:_fnAdjustColumnSizing,_fnVisibleToColumnIndex:_fnVisibleToColumnIndex,_fnColumnIndexToVisible:_fnColumnIndexToVisible,_fnVisbleColumns:_fnVisbleColumns,_fnGetColumns:_fnGetColumns,_fnColumnTypes:_fnColumnTypes,_fnApplyColumnDefs:_fnApplyColumnDefs,_fnHungarianMap:_fnHungarianMap,_fnCamelToHungarian:_fnCamelToHungarian,_fnLanguageCompat:_fnLanguageCompat,_fnBrowserDetect:_fnBrowserDetect,_fnAddData:_fnAddData,_fnAddTr:_fnAddTr,_fnNodeToDataIndex:_fnNodeToDataIndex,_fnNodeToColumnIndex:_fnNodeToColumnIndex,_fnGetCellData:_fnGetCellData,_fnSetCellData:_fnSetCellData,_fnSplitObjNotation:_fnSplitObjNotation,_fnGetObjectDataFn:_fnGetObjectDataFn,_fnSetObjectDataFn:_fnSetObjectDataFn,_fnGetDataMaster:_fnGetDataMaster,_fnClearTable:_fnClearTable,_fnDeleteIndex:_fnDeleteIndex,_fnInvalidate:_fnInvalidate,_fnGetRowElements:_fnGetRowElements,_fnCreateTr:_fnCreateTr,_fnBuildHead:_fnBuildHead,_fnDrawHead:_fnDrawHead,_fnDraw:_fnDraw,_fnReDraw:_fnReDraw,_fnAddOptionsHtml:_fnAddOptionsHtml,_fnDetectHeader:_fnDetectHeader,_fnGetUniqueThs:_fnGetUniqueThs,_fnFeatureHtmlFilter:_fnFeatureHtmlFilter,_fnFilterComplete:_fnFilterComplete,_fnFilterCustom:_fnFilterCustom,_fnFilterColumn:_fnFilterColumn,_fnFilter:_fnFilter,_fnFilterCreateSearch:_fnFilterCreateSearch,_fnEscapeRegex:_fnEscapeRegex,_fnFilterData:_fnFilterData,_fnFeatureHtmlInfo:_fnFeatureHtmlInfo,_fnUpdateInfo:_fnUpdateInfo,_fnInfoMacros:_fnInfoMacros,_fnInitialise:_fnInitialise,_fnInitComplete:_fnInitComplete,_fnLengthChange:_fnLengthChange,_fnFeatureHtmlLength:_fnFeatureHtmlLength,_fnFeatureHtmlPaginate:_fnFeatureHtmlPaginate,_fnPageChange:_fnPageChange,_fnFeatureHtmlProcessing:_fnFeatureHtmlProcessing,_fnProcessingDisplay:_fnProcessingDisplay,_fnFeatureHtmlTable:_fnFeatureHtmlTable,_fnScrollDraw:_fnScrollDraw,_fnApplyToChildren:_fnApplyToChildren,_fnCalculateColumnWidths:_fnCalculateColumnWidths,_fnThrottle:_fnThrottle,_fnConvertToWidth:_fnConvertToWidth,_fnGetWidestNode:_fnGetWidestNode,_fnGetMaxLenString:_fnGetMaxLenString,_fnStringToCss:_fnStringToCss,_fnSortFlatten:_fnSortFlatten,_fnSort:_fnSort,_fnSortAria:_fnSortAria,_fnSortListener:_fnSortListener,_fnSortAttachListener:_fnSortAttachListener,_fnSortingClasses:_fnSortingClasses,_fnSortData:_fnSortData,_fnSaveState:_fnSaveState,_fnLoadState:_fnLoadState,_fnImplementState:_fnImplementState,_fnSettingsFromNode:_fnSettingsFromNode,_fnLog:_fnLog,_fnMap:_fnMap,_fnBindAction:_fnBindAction,_fnCallbackReg:_fnCallbackReg,_fnCallbackFire:_fnCallbackFire,_fnLengthOverflow:_fnLengthOverflow,_fnRenderer:_fnRenderer,_fnDataSource:_fnDataSource,_fnRowAttributes:_fnRowAttributes,_fnExtend:_fnExtend,_fnCalculateEnd:function(){}});$.fn.dataTable=DataTable;DataTable.$=$;$.fn.dataTableSettings=DataTable.settings;$.fn.dataTableExt=DataTable.ext;$.fn.DataTable=function(opts){return $(this).dataTable(opts).api();};$.each(DataTable,function(prop,val){$.fn.DataTable[prop]=val;});return DataTable;}));/*! DataTables Bootstrap 5 integration
* 2020 SpryMedia Ltd - datatables.net/license
*/(function(factory){if(typeof define==='function'&&define.amd){define(['jquery','datatables.net'],function($){return factory($,window,document);});}
else if(typeof exports==='object'){module.exports=function(root,$){if(!root){root=window;}
if(!$){$=typeof window!=='undefined'?require('jquery'):require('jquery')(root);}
if(!$.fn.dataTable){require('datatables.net')(root,$);}
return factory($,root,root.document);};}
else{factory(jQuery,window,document);}}(function($,window,document,undefined){'use strict';var DataTable=$.fn.dataTable;$.extend(true,DataTable.defaults,{dom:"<'row'<'col-sm-12 col-md-6'l><'col-sm-12 col-md-6'f>>"+
"<'row dt-row'<'col-sm-12'tr>>"+
"<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>",renderer:'bootstrap'});$.extend(DataTable.ext.classes,{sWrapper:"dataTables_wrapper dt-bootstrap5",sFilterInput:"form-control form-control-sm",sLengthSelect:"form-select form-select-sm",sProcessing:"dataTables_processing card",sPageButton:"paginate_button page-item"});DataTable.ext.renderer.pageButton.bootstrap=function(settings,host,idx,buttons,page,pages){var api=new DataTable.Api(settings);var classes=settings.oClasses;var lang=settings.oLanguage.oPaginate;var aria=settings.oLanguage.oAria.paginate||{};var btnDisplay,btnClass;var attach=function(container,buttons){var i,ien,node,button;var clickHandler=function(e){e.preventDefault();if(!$(e.currentTarget).hasClass('disabled')&&api.page()!=e.data.action){api.page(e.data.action).draw('page');}};for(i=0,ien=buttons.length;i<ien;i++){button=buttons[i];if(Array.isArray(button)){attach(container,button);}
else{btnDisplay='';btnClass='';switch(button){case 'ellipsis':btnDisplay='&#x2026;';btnClass='disabled';break;case 'first':btnDisplay=lang.sFirst;btnClass=button+(page>0?'':' disabled');break;case 'previous':btnDisplay=lang.sPrevious;btnClass=button+(page>0?'':' disabled');break;case 'next':btnDisplay=lang.sNext;btnClass=button+(page<pages-1?'':' disabled');break;case 'last':btnDisplay=lang.sLast;btnClass=button+(page<pages-1?'':' disabled');break;default:btnDisplay=button+1;btnClass=page===button?'active':'';break;}
if(btnDisplay){node=$('<li>',{'class':classes.sPageButton+' '+btnClass,'id':idx===0&&typeof button==='string'?settings.sTableId+'_'+button:null}).append($('<a>',{'href':'#','aria-controls':settings.sTableId,'aria-label':aria[button],'data-dt-idx':button,'tabindex':settings.iTabIndex,'class':'page-link'}).html(btnDisplay)).appendTo(container);settings.oApi._fnBindAction(node,{action:button},clickHandler);}}}};var hostEl=$(host);var activeEl;try{activeEl=hostEl.find(document.activeElement).data('dt-idx');}
catch(e){}
var paginationEl=hostEl.children('ul.pagination');if(paginationEl.length){paginationEl.empty();}
else{paginationEl=hostEl.html('<ul/>').children('ul').addClass('pagination');}
attach(paginationEl,buttons);if(activeEl!==undefined){hostEl.find('[data-dt-idx='+activeEl+']').trigger('focus');}};return DataTable;}));"use strict";var defaults={"language":{"info":"Showing _START_ to _END_ of _TOTAL_ records","infoEmpty":"Showing no records","lengthMenu":"_MENU_","processing":'<span class="spinner-border w-15px h-15px text-muted align-middle me-2"></span> <span class="text-gray-600">Loading...</span>',"paginate":{"first":'<i class="first"></i>',"last":'<i class="last"></i>',"next":'<i class="next"></i>',"previous":'<i class="previous"></i>'}}};$.extend(true,$.fn.dataTable.defaults,defaults);/*! DataTables Bootstrap 4 integration
* ©2011-2017 SpryMedia Ltd - datatables.net/license
*/(function(factory){if(typeof define==='function'&&define.amd){define(['jquery','datatables.net'],function($){return factory($,window,document);});}
else if(typeof exports==='object'){module.exports=function(root,$){if(!root){root=window;}
if(!$||!$.fn.dataTable){$=require('datatables.net')(root,$).$;}
return factory($,root,root.document);};}
else{factory(jQuery,window,document);}}(function($,window,document,undefined){'use strict';var DataTable=$.fn.dataTable;$.extend(true,DataTable.defaults,{dom:"<'table-responsive'tr>"+
"<'row'"+
"<'col-sm-12 col-md-5 d-flex align-items-center justify-content-center justify-content-md-start'li>"+
"<'col-sm-12 col-md-7 d-flex align-items-center justify-content-center justify-content-md-end'p>"+
">",renderer:'bootstrap'});$.extend(DataTable.ext.classes,{sWrapper:"dataTables_wrapper dt-bootstrap4",sFilterInput:"form-control form-control-sm form-control-solid",sLengthSelect:"form-select form-select-sm form-select-solid",sProcessing:"dataTables_processing",sPageButton:"paginate_button page-item"});DataTable.ext.renderer.pageButton.bootstrap=function(settings,host,idx,buttons,page,pages){var api=new DataTable.Api(settings);var classes=settings.oClasses;var lang=settings.oLanguage.oPaginate;var aria=settings.oLanguage.oAria.paginate||{};var btnDisplay,btnClass,counter=0;var attach=function(container,buttons){var i,ien,node,button;var clickHandler=function(e){e.preventDefault();if(!$(e.currentTarget).hasClass('disabled')&&api.page()!=e.data.action){api.page(e.data.action).draw('page');}};for(i=0,ien=buttons.length;i<ien;i++){button=buttons[i];if(Array.isArray(button)){attach(container,button);}
else{btnDisplay='';btnClass='';switch(button){case 'ellipsis':btnDisplay='&#x2026;';btnClass='disabled';break;case 'first':btnDisplay=lang.sFirst;btnClass=button+(page>0?'':' disabled');break;case 'previous':btnDisplay=lang.sPrevious;btnClass=button+(page>0?'':' disabled');break;case 'next':btnDisplay=lang.sNext;btnClass=button+(page<pages-1?'':' disabled');break;case 'last':btnDisplay=lang.sLast;btnClass=button+(page<pages-1?'':' disabled');break;default:btnDisplay=button+1;btnClass=page===button?'active':'';break;}
if(btnDisplay){node=$('<li>',{'class':classes.sPageButton+' '+btnClass,'id':idx===0&&typeof button==='string'?settings.sTableId+'_'+button:null}).append($('<a>',{'href':'#','aria-controls':settings.sTableId,'aria-label':aria[button],'data-dt-idx':counter,'tabindex':settings.iTabIndex,'class':'page-link'}).html(btnDisplay)).appendTo(container);settings.oApi._fnBindAction(node,{action:button},clickHandler);counter++;}}}};var activeEl;try{activeEl=$(host).find(document.activeElement).data('dt-idx');}
catch(e){}
attach($(host).empty().html('<ul class="pagination"/>').children('ul'),buttons);if(activeEl!==undefined){$(host).find('[data-dt-idx='+activeEl+']').trigger('focus');}};return DataTable;}));/*!
JSZip v3.10.1 - A JavaScript class for generating and reading zip files
<http://stuartk.com/jszip>
(c) 2009-2016 Stuart Knightley <stuart [at] stuartk.com>
Dual licenced under the MIT license or GPLv3. See https://raw.github.com/Stuk/jszip/main/LICENSE.markdown.
JSZip uses the library pako released under the MIT license :
https://github.com/nodeca/pako/blob/main/LICENSE
* ©2016-2022 SpryMedia Ltd - datatables.net/license
*/!function(e){"function"==typeof define&&define.amd?define(["jquery","datatables.net"],function(t){return e(t,window,document)}):"object"==typeof exports?module.exports=function(t,n){return t=t||window,(n=n||("undefined"!=typeof window?require("jquery"):require("jquery")(t))).fn.dataTable||require("datatables.net")(t,n),e(n,t,t.document)}:e(jQuery,window,document)}(function(v,m,y,x){"use strict";var e=v.fn.dataTable,o=0,C=0,w=e.ext.buttons;function _(t,n,e){v.fn.animate?t.stop().fadeIn(n,e):(t.css("display","block"),e&&e.call(t))}function A(t,n,e){v.fn.animate?t.stop().fadeOut(n,e):(t.css("display","none"),e&&e.call(t))}function k(n,t){if(!(this instanceof k))return function(t){return new k(t,n).container()};!0===(t=void 0===t?{}:t)&&(t={}),Array.isArray(t)&&(t={buttons:t}),this.c=v.extend(!0,{},k.defaults,t),t.buttons&&(this.c.buttons=t.buttons),this.s={dt:new e.Api(n),buttons:[],listenKeys:"",namespace:"dtb"+o++},this.dom={container:v("<"+this.c.dom.container.tag+"/>").addClass(this.c.dom.container.className)},this._constructor()}v.extend(k.prototype,{action:function(t,n){t=this._nodeToButton(t);return n===x?t.conf.action:(t.conf.action=n,this)},active:function(t,n){var t=this._nodeToButton(t),e=this.c.dom.button.active,t=v(t.node);return n===x?t.hasClass(e):(t.toggleClass(e,n===x||n),this)},add:function(t,n,e){var o=this.s.buttons;if("string"==typeof n){for(var i=n.split("-"),s=this.s,r=0,a=i.length-1;r<a;r++)s=s.buttons[+i[r]];o=s.buttons,n=+i[i.length-1]}return this._expandButton(o,t,t!==x?t.split:x,(t===x||t.split===x||0===t.split.length)&&s!==x,!1,n),e!==x&&!0!==e||this._draw(),this},collectionRebuild:function(t,n){var e=this._nodeToButton(t);if(n!==x){for(var o=e.buttons.length-1;0<=o;o--)this.remove(e.buttons[o].node);for(o=0;o<n.length;o++){var i=n[o];this._expandButton(e.buttons,i,i!==x&&i.config!==x&&i.config.split!==x,!0,i.parentConf!==x&&i.parentConf.split!==x,o,i.parentConf)}}this._draw(e.collection,e.buttons)},container:function(){return this.dom.container},disable:function(t){t=this._nodeToButton(t);return v(t.node).addClass(this.c.dom.button.disabled).prop("disabled",!0),this},destroy:function(){v("body").off("keyup."+this.s.namespace);for(var t=this.s.buttons.slice(),n=0,e=t.length;n<e;n++)this.remove(t[n].node);this.dom.container.remove();var o=this.s.dt.settings()[0];for(n=0,e=o.length;n<e;n++)if(o.inst===this){o.splice(n,1);break}return this},enable:function(t,n){return!1===n?this.disable(t):(n=this._nodeToButton(t),v(n.node).removeClass(this.c.dom.button.disabled).prop("disabled",!1),this)},index:function(t,n,e){n||(n="",e=this.s.buttons);for(var o=0,i=e.length;o<i;o++){var s=e[o].buttons;if(e[o].node===t)return n+o;if(s&&s.length){s=this.index(t,o+"-",s);if(null!==s)return s}}return null},name:function(){return this.c.name},node:function(t){return t?(t=this._nodeToButton(t),v(t.node)):this.dom.container},processing:function(t,n){var e=this.s.dt,o=this._nodeToButton(t);return n===x?v(o.node).hasClass("processing"):(v(o.node).toggleClass("processing",n),v(e.table().node()).triggerHandler("buttons-processing.dt",[n,e.button(t),e,v(t),o.conf]),this)},remove:function(t){var n=this._nodeToButton(t),e=this._nodeToHost(t),o=this.s.dt;if(n.buttons.length)for(var i=n.buttons.length-1;0<=i;i--)this.remove(n.buttons[i].node);n.conf.destroying=!0,n.conf.destroy&&n.conf.destroy.call(o.button(t),o,v(t),n.conf),this._removeKey(n.conf),v(n.node).remove();o=v.inArray(n,e);return e.splice(o,1),this},text:function(t,n){function e(t){return"function"==typeof t?t(i,s,o.conf):t}var o=this._nodeToButton(t),t=this.c.dom.collection.buttonLiner,t=(o.inCollection&&t&&t.tag?t:this.c.dom.buttonLiner).tag,i=this.s.dt,s=v(o.node);return n===x?e(o.conf.text):(o.conf.text=n,(t?s.children(t).eq(0).filter(":not(.dt-down-arrow)"):s).html(e(n)),this)},_constructor:function(){var e=this,t=this.s.dt,o=t.settings()[0],n=this.c.buttons;o._buttons||(o._buttons=[]),o._buttons.push({inst:this,name:this.c.name});for(var i=0,s=n.length;i<s;i++)this.add(n[i]);t.on("destroy",function(t,n){n===o&&e.destroy()}),v("body").on("keyup."+this.s.namespace,function(t){var n;y.activeElement&&y.activeElement!==y.body||(n=String.fromCharCode(t.keyCode).toLowerCase(),-1!==e.s.listenKeys.toLowerCase().indexOf(n)&&e._keypress(n,t))})},_addKey:function(t){t.key&&(this.s.listenKeys+=(v.isPlainObject(t.key)?t.key:t).key)},_draw:function(t,n){t||(t=this.dom.container,n=this.s.buttons),t.children().detach();for(var e=0,o=n.length;e<o;e++)t.append(n[e].inserter),t.append(" "),n[e].buttons&&n[e].buttons.length&&this._draw(n[e].collection,n[e].buttons)},_expandButton:function(t,n,e,o,i,s,r){var a=this.s.dt,l=!1,u=Array.isArray(n)?n:[n];n===x&&(u=Array.isArray(e)?e:[e]),n!==x&&n.split!==x&&(l=!0);for(var c=0,d=u.length;c<d;c++){var f=this._resolveExtends(u[c]);if(f)if(l=!(f.config===x||!f.config.split),Array.isArray(f))this._expandButton(t,f,p!==x&&p.conf!==x?p.conf.split:x,o,r!==x&&r.split!==x,s,r);else{var p=this._buildButton(f,o,f.split!==x||f.config!==x&&f.config.split!==x,i);if(p){if(s!==x&&null!==s?(t.splice(s,0,p),s++):t.push(p),p.conf.buttons||p.conf.split){if(p.collection=v("<"+(l?this.c.dom.splitCollection:this.c.dom.collection).tag+"/>"),p.conf._collection=p.collection,p.conf.split)for(var h=0;h<p.conf.split.length;h++)"object"==typeof p.conf.split[h]&&(p.conf.split[h].parent=r,p.conf.split[h].collectionLayout===x&&(p.conf.split[h].collectionLayout=p.conf.collectionLayout),p.conf.split[h].dropup===x&&(p.conf.split[h].dropup=p.conf.dropup),p.conf.split[h].fade===x&&(p.conf.split[h].fade=p.conf.fade));else v(p.node).append(v('<span class="dt-down-arrow">'+this.c.dom.splitDropdown.text+"</span>"));this._expandButton(p.buttons,p.conf.buttons,p.conf.split,!l,l,s,p.conf)}p.conf.parent=r,f.init&&f.init.call(a.button(p.node),a,v(p.node),f),0}}}},_buildButton:function(n,t,e,o){function i(t){return"function"==typeof t?t(h,l,n):t}var s,r,a,l,u=this.c.dom.button,c=this.c.dom.buttonLiner,d=this.c.dom.collection,f=(this.c.dom.split,this.c.dom.splitCollection),p=this.c.dom.splitDropdownButton,h=this.s.dt;if(n.spacer)return r=v("<span></span>").addClass("dt-button-spacer "+n.style+" "+u.spacerClass).html(i(n.text)),{conf:n,node:r,inserter:r,buttons:[],inCollection:t,isSplit:e,inSplit:o,collection:null};if(!e&&o&&f?u=p:!e&&t&&d.button&&(u=d.button),!e&&o&&f.buttonLiner?c=f.buttonLiner:!e&&t&&d.buttonLiner&&(c=d.buttonLiner),n.available&&!n.available(h,n)&&!n.hasOwnProperty("html"))return!1;n.hasOwnProperty("html")?l=v(n.html):(s=function(t,n,e,o){o.action.call(n.button(e),t,n,e,o),v(n.table().node()).triggerHandler("buttons-action.dt",[n.button(e),n,e,o])},r=n.tag||u.tag,a=n.clickBlurs===x||n.clickBlurs,l=v("<"+r+"/>").addClass(u.className).addClass(o?this.c.dom.splitDropdownButton.className:"").attr("tabindex",this.s.dt.settings()[0].iTabIndex).attr("aria-controls",this.s.dt.table().node().id).on("click.dtb",function(t){t.preventDefault(),!l.hasClass(u.disabled)&&n.action&&s(t,h,l,n),a&&l.trigger("blur")}).on("keypress.dtb",function(t){13===t.keyCode&&(t.preventDefault(),!l.hasClass(u.disabled)&&n.action&&s(t,h,l,n))}),"a"===r.toLowerCase()&&l.attr("href","#"),"button"===r.toLowerCase()&&l.attr("type","button"),c.tag?(p=v("<"+c.tag+"/>").html(i(n.text)).addClass(c.className),"a"===c.tag.toLowerCase()&&p.attr("href","#"),l.append(p)):l.html(i(n.text)),!1===n.enabled&&l.addClass(u.disabled),n.className&&l.addClass(n.className),n.titleAttr&&l.attr("title",i(n.titleAttr)),n.attr&&l.attr(n.attr),n.namespace||(n.namespace=".dt-button-"+C++),n.config!==x&&n.config.split&&(n.split=n.config.split));var b,g,m,y,f=this.c.dom.buttonContainer,d=f&&f.tag?v("<"+f.tag+"/>").addClass(f.className).append(l):l;return this._addKey(n),this.c.buttonCreated&&(d=this.c.buttonCreated(n,d)),e&&((b=v("<div/>").addClass(this.c.dom.splitWrapper.className)).append(l),g=v.extend(n,{text:this.c.dom.splitDropdown.text,className:this.c.dom.splitDropdown.className,closeButton:!1,attr:{"aria-haspopup":"dialog","aria-expanded":!1},align:this.c.dom.splitDropdown.align,splitAlignClass:this.c.dom.splitDropdown.splitAlignClass}),this._addKey(g),m=function(t,n,e,o){w.split.action.call(n.button(b),t,n,e,o),v(n.table().node()).triggerHandler("buttons-action.dt",[n.button(e),n,e,o]),e.attr("aria-expanded",!0)},y=v('<button class="'+this.c.dom.splitDropdown.className+' dt-button"><span class="dt-btn-split-drop-arrow">'+this.c.dom.splitDropdown.text+"</span></button>").on("click.dtb",function(t){t.preventDefault(),t.stopPropagation(),y.hasClass(u.disabled)||m(t,h,y,g),a&&y.trigger("blur")}).on("keypress.dtb",function(t){13===t.keyCode&&(t.preventDefault(),y.hasClass(u.disabled)||m(t,h,y,g))}),0===n.split.length&&y.addClass("dtb-hide-drop"),b.append(y).attr(g.attr)),{conf:n,node:(e?b:l).get(0),inserter:e?b:d,buttons:[],inCollection:t,isSplit:e,inSplit:o,collection:null}},_nodeToButton:function(t,n){for(var e=0,o=(n=n||this.s.buttons).length;e<o;e++){if(n[e].node===t)return n[e];if(n[e].buttons.length){var i=this._nodeToButton(t,n[e].buttons);if(i)return i}}},_nodeToHost:function(t,n){for(var e=0,o=(n=n||this.s.buttons).length;e<o;e++){if(n[e].node===t)return n;if(n[e].buttons.length){var i=this._nodeToHost(t,n[e].buttons);if(i)return i}}},_keypress:function(s,r){var a;r._buttonsHandled||(a=function(t){for(var n,e,o=0,i=t.length;o<i;o++)n=t[o].conf,e=t[o].node,!n.key||n.key!==s&&(!v.isPlainObject(n.key)||n.key.key!==s||n.key.shiftKey&&!r.shiftKey||n.key.altKey&&!r.altKey||n.key.ctrlKey&&!r.ctrlKey||n.key.metaKey&&!r.metaKey)||(r._buttonsHandled=!0,v(e).click()),t[o].buttons.length&&a(t[o].buttons)})(this.s.buttons)},_removeKey:function(t){var n;t.key&&(t=(v.isPlainObject(t.key)?t.key:t).key,n=this.s.listenKeys.split(""),t=v.inArray(t,n),n.splice(t,1),this.s.listenKeys=n.join(""))},_resolveExtends:function(e){function t(t){for(var n=0;!v.isPlainObject(t)&&!Array.isArray(t);){if(t===x)return;if("function"==typeof t){if(!(t=t.call(i,s,e)))return!1}else if("string"==typeof t){if(!w[t])return{html:t};t=w[t]}if(30<++n)throw"Buttons: Too many iterations"}return Array.isArray(t)?t:v.extend({},t)}var n,o,i=this,s=this.s.dt;for(e=t(e);e&&e.extend;){if(!w[e.extend])throw"Cannot extend unknown button type: "+e.extend;var r=t(w[e.extend]);if(Array.isArray(r))return r;if(!r)return!1;var a=r.className,l=(e.config!==x&&r.config!==x&&(e.config=v.extend({},r.config,e.config)),e=v.extend({},r,e),a&&e.className!==a&&(e.className=a+" "+e.className),e.postfixButtons);if(l){for(e.buttons||(e.buttons=[]),n=0,o=l.length;n<o;n++)e.buttons.push(l[n]);e.postfixButtons=null}var u=e.prefixButtons;if(u){for(e.buttons||(e.buttons=[]),n=0,o=u.length;n<o;n++)e.buttons.splice(n,0,u[n]);e.prefixButtons=null}e.extend=r.extend}return e},_popover:function(o,t,n,e){function i(){h=!0,A(v(".dt-button-collection"),b.fade,function(){v(this).detach()}),v(f.buttons('[aria-haspopup="dialog"][aria-expanded="true"]').nodes()).attr("aria-expanded","false"),v("div.dt-button-background").off("click.dtb-collection"),k.background(!1,b.backgroundClassName,b.fade,g),v(m).off("resize.resize.dtb-collection"),v("body").off(".dtb-collection"),f.off("buttons-action.b-internal"),f.off("destroy")}var s,r,a,l,u,c,d,f=t,p=this.c,h=!1,b=v.extend({align:"button-left",autoClose:!1,background:!0,backgroundClassName:"dt-button-background",closeButton:!0,contentClassName:p.dom.collection.className,collectionLayout:"",collectionTitle:"",dropup:!1,fade:400,popoverTitle:"",rightAlignClassName:"dt-button-right",tag:p.dom.collection.tag},n),g=t.node();!1===o?i():((p=v(f.buttons('[aria-haspopup="dialog"][aria-expanded="true"]').nodes())).length&&(g.closest("div.dt-button-collection").length&&(g=p.eq(0)),i()),n=v(".dt-button",o).length,p="",3===n?p="dtb-b3":2===n?p="dtb-b2":1===n&&(p="dtb-b1"),s=v("<div/>").addClass("dt-button-collection").addClass(b.collectionLayout).addClass(b.splitAlignClass).addClass(p).css("display","none").attr({"aria-modal":!0,role:"dialog"}),o=v(o).addClass(b.contentClassName).attr("role","menu").appendTo(s),g.attr("aria-expanded","true"),g.parents("body")[0]!==y.body&&(g=y.body.lastChild),b.popoverTitle?s.prepend('<div class="dt-button-collection-title">'+b.popoverTitle+"</div>"):b.collectionTitle&&s.prepend('<div class="dt-button-collection-title">'+b.collectionTitle+"</div>"),b.closeButton&&s.prepend('<div class="dtb-popover-close">x</div>').addClass("dtb-collection-closeable"),_(s.insertAfter(g),b.fade),n=v(t.table().container()),d=s.css("position"),"container"!==b.span&&"dt-container"!==b.align||(g=g.parent(),s.css("width",n.width())),"absolute"===d?(p=v(g[0].offsetParent),t=g.position(),n=g.offset(),r=p.offset(),a=p.position(),l=m.getComputedStyle(p[0]),r.height=p.outerHeight(),r.width=p.width()+parseFloat(l.paddingLeft),r.right=r.left+r.width,r.bottom=r.top+r.height,p=t.top+g.outerHeight(),u=t.left,s.css({top:p,left:u}),l=m.getComputedStyle(s[0]),(c=s.offset()).height=s.outerHeight(),c.width=s.outerWidth(),c.right=c.left+c.width,c.bottom=c.top+c.height,c.marginTop=parseFloat(l.marginTop),c.marginBottom=parseFloat(l.marginBottom),b.dropup&&(p=t.top-c.height-c.marginTop-c.marginBottom),"button-right"!==b.align&&!s.hasClass(b.rightAlignClassName)||(u=t.left-c.width+g.outerWidth()),"dt-container"!==b.align&&"container"!==b.align||(u=u<t.left?-t.left:u)+c.width>r.width&&(u=r.width-c.width),a.left+u+c.width>v(m).width()&&(u=v(m).width()-c.width-a.left),n.left+u<0&&(u=-n.left),a.top+p+c.height>v(m).height()+v(m).scrollTop()&&(p=t.top-c.height-c.marginTop-c.marginBottom),a.top+p<v(m).scrollTop()&&(p=t.top+g.outerHeight()),s.css({top:p,left:u})):((d=function(){var t=v(m).height()/2,n=s.height()/2;s.css("marginTop",-1*(n=t<n?t:n))})(),v(m).on("resize.dtb-collection",function(){d()})),b.background&&k.background(!0,b.backgroundClassName,b.fade,b.backgroundHost||g),v("div.dt-button-background").on("click.dtb-collection",function(){}),b.autoClose&&setTimeout(function(){f.on("buttons-action.b-internal",function(t,n,e,o){o[0]!==g[0]&&i()})},0),v(s).trigger("buttons-popover.dt"),f.on("destroy",i),setTimeout(function(){h=!1,v("body").on("click.dtb-collection",function(t){var n,e;h||(n=v.fn.addBack?"addBack":"andSelf",e=v(t.target).parent()[0],(v(t.target).parents()[n]().filter(o).length||v(e).hasClass("dt-buttons"))&&!v(t.target).hasClass("dt-button-background")||i())}).on("keyup.dtb-collection",function(t){27===t.keyCode&&i()}).on("keydown.dtb-collection",function(t){var n=v("a, button",o),e=y.activeElement;9===t.keyCode&&(-1===n.index(e)?(n.first().focus(),t.preventDefault()):t.shiftKey?e===n[0]&&(n.last().focus(),t.preventDefault()):e===n.last()[0]&&(n.first().focus(),t.preventDefault()))})},0))}}),k.background=function(t,n,e,o){e===x&&(e=400),o=o||y.body,t?_(v("<div/>").addClass(n).css("display","none").insertAfter(o),e):A(v("div."+n),e,function(){v(this).removeClass(n).remove()})},k.instanceSelector=function(t,i){var s,r,a;return t===x||null===t?v.map(i,function(t){return t.inst}):(s=[],r=v.map(i,function(t){return t.name}),(a=function(t){var n;if(Array.isArray(t))for(var e=0,o=t.length;e<o;e++)a(t[e]);else"string"==typeof t?-1!==t.indexOf(",")?a(t.split(",")):-1!==(n=v.inArray(t.trim(),r))&&s.push(i[n].inst):"number"==typeof t?s.push(i[t].inst):"object"==typeof t&&s.push(t)})(t),s)},k.buttonSelector=function(t,n){for(var u=[],c=function(t,n,e){for(var o,i,s=0,r=n.length;s<r;s++)(o=n[s])&&(t.push({node:o.node,name:o.conf.name,idx:i=e!==x?e+s:s+""}),o.buttons&&c(t,o.buttons,i+"-"))},d=function(t,n){var e=[],o=(c(e,n.s.buttons),v.map(e,function(t){return t.node}));if(Array.isArray(t)||t instanceof v)for(s=0,r=t.length;s<r;s++)d(t[s],n);else if(null===t||t===x||"*"===t)for(s=0,r=e.length;s<r;s++)u.push({inst:n,node:e[s].node});else if("number"==typeof t)n.s.buttons[t]&&u.push({inst:n,node:n.s.buttons[t].node});else if("string"==typeof t)if(-1!==t.indexOf(","))for(var i=t.split(","),s=0,r=i.length;s<r;s++)d(i[s].trim(),n);else if(t.match(/^\d+(\-\d+)*$/)){var a=v.map(e,function(t){return t.idx});u.push({inst:n,node:e[v.inArray(t,a)].node})}else if(-1!==t.indexOf(":name")){var l=t.replace(":name","");for(s=0,r=e.length;s<r;s++)e[s].name===l&&u.push({inst:n,node:e[s].node})}else v(o).filter(t).each(function(){u.push({inst:n,node:this})});else"object"!=typeof t||!t.nodeName||-1!==(a=v.inArray(t,o))&&u.push({inst:n,node:o[a]})},e=0,o=t.length;e<o;e++){var i=t[e];d(n,i)}return u},k.stripData=function(t,n){return"string"==typeof t&&(t=(t=t.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,"")).replace(/<!\-\-.*?\-\->/g,""),n&&!n.stripHtml||(t=t.replace(/<[^>]*>/g,"")),n&&!n.trim||(t=t.replace(/^\s+|\s+$/g,"")),n&&!n.stripNewlines||(t=t.replace(/\n/g," ")),n&&!n.decodeEntities||(l.innerHTML=t,t=l.value)),t},k.defaults={buttons:["copy","excel","csv","pdf","print"],name:"main",tabIndex:0,dom:{container:{tag:"div",className:"dt-buttons"},collection:{tag:"div",className:""},button:{tag:"button",className:"dt-button",active:"active",disabled:"disabled",spacerClass:""},buttonLiner:{tag:"span",className:""},split:{tag:"div",className:"dt-button-split"},splitWrapper:{tag:"div",className:"dt-btn-split-wrapper"},splitDropdown:{tag:"button",text:"&#x25BC;",className:"dt-btn-split-drop",align:"split-right",splitAlignClass:"dt-button-split-left"},splitDropdownButton:{tag:"button",className:"dt-btn-split-drop-button dt-button"},splitCollection:{tag:"div",className:"dt-button-split-collection"}}},v.extend(w,{collection:{text:function(t){return t.i18n("buttons.collection","Collection")},className:"buttons-collection",closeButton:!(k.version="2.3.3"),init:function(t,n,e){n.attr("aria-expanded",!1)},action:function(t,n,e,o){o._collection.parents("body").length?this.popover(!1,o):this.popover(o._collection,o),"keypress"===t.type&&v("a, button",o._collection).eq(0).focus()},attr:{"aria-haspopup":"dialog"}},split:{text:function(t){return t.i18n("buttons.split","Split")},className:"buttons-split",closeButton:!1,init:function(t,n,e){return n.attr("aria-expanded",!1)},action:function(t,n,e,o){this.popover(o._collection,o)},attr:{"aria-haspopup":"dialog"}},copy:function(t,n){if(w.copyHtml5)return"copyHtml5"},csv:function(t,n){if(w.csvHtml5&&w.csvHtml5.available(t,n))return"csvHtml5"},excel:function(t,n){if(w.excelHtml5&&w.excelHtml5.available(t,n))return"excelHtml5"},pdf:function(t,n){if(w.pdfHtml5&&w.pdfHtml5.available(t,n))return"pdfHtml5"},pageLength:function(t){var n=t.settings()[0].aLengthMenu,e=[],o=[];if(Array.isArray(n[0]))e=n[0],o=n[1];else for(var i=0;i<n.length;i++){var s=n[i];v.isPlainObject(s)?(e.push(s.value),o.push(s.label)):(e.push(s),o.push(s))}return{extend:"collection",text:function(t){return t.i18n("buttons.pageLength",{"-1":"Show all rows",_:"Show %d rows"},t.page.len())},className:"buttons-page-length",autoClose:!0,buttons:v.map(e,function(s,t){return{text:o[t],className:"button-page-length",action:function(t,n){n.page.len(s).draw()},init:function(t,n,e){function o(){i.active(t.page.len()===s)}var i=this;t.on("length.dt"+e.namespace,o),o()},destroy:function(t,n,e){t.off("length.dt"+e.namespace)}}}),init:function(t,n,e){var o=this;t.on("length.dt"+e.namespace,function(){o.text(e.text)})},destroy:function(t,n,e){t.off("length.dt"+e.namespace)}}},spacer:{style:"empty",spacer:!0,text:function(t){return t.i18n("buttons.spacer","")}}}),e.Api.register("buttons()",function(n,e){e===x&&(e=n,n=x),this.selector.buttonGroup=n;var t=this.iterator(!0,"table",function(t){if(t._buttons)return k.buttonSelector(k.instanceSelector(n,t._buttons),e)},!0);return t._groupSelector=n,t}),e.Api.register("button()",function(t,n){t=this.buttons(t,n);return 1<t.length&&t.splice(1,t.length),t}),e.Api.registerPlural("buttons().active()","button().active()",function(n){return n===x?this.map(function(t){return t.inst.active(t.node)}):this.each(function(t){t.inst.active(t.node,n)})}),e.Api.registerPlural("buttons().action()","button().action()",function(n){return n===x?this.map(function(t){return t.inst.action(t.node)}):this.each(function(t){t.inst.action(t.node,n)})}),e.Api.registerPlural("buttons().collectionRebuild()","button().collectionRebuild()",function(e){return this.each(function(t){for(var n=0;n<e.length;n++)"object"==typeof e[n]&&(e[n].parentConf=t);t.inst.collectionRebuild(t.node,e)})}),e.Api.register(["buttons().enable()","button().enable()"],function(n){return this.each(function(t){t.inst.enable(t.node,n)})}),e.Api.register(["buttons().disable()","button().disable()"],function(){return this.each(function(t){t.inst.disable(t.node)})}),e.Api.register("button().index()",function(){var n=null;return this.each(function(t){t=t.inst.index(t.node);null!==t&&(n=t)}),n}),e.Api.registerPlural("buttons().nodes()","button().node()",function(){var n=v();return v(this.each(function(t){n=n.add(t.inst.node(t.node))})),n}),e.Api.registerPlural("buttons().processing()","button().processing()",function(n){return n===x?this.map(function(t){return t.inst.processing(t.node)}):this.each(function(t){t.inst.processing(t.node,n)})}),e.Api.registerPlural("buttons().text()","button().text()",function(n){return n===x?this.map(function(t){return t.inst.text(t.node)}):this.each(function(t){t.inst.text(t.node,n)})}),e.Api.registerPlural("buttons().trigger()","button().trigger()",function(){return this.each(function(t){t.inst.node(t.node).trigger("click")})}),e.Api.register("button().popover()",function(n,e){return this.map(function(t){return t.inst._popover(n,this.button(this[0].node),e)})}),e.Api.register("buttons().containers()",function(){var i=v(),s=this._groupSelector;return this.iterator(!0,"table",function(t){if(t._buttons)for(var n=k.instanceSelector(s,t._buttons),e=0,o=n.length;e<o;e++)i=i.add(n[e].container())}),i}),e.Api.register("buttons().container()",function(){return this.containers().eq(0)}),e.Api.register("button().add()",function(t,n,e){var o=this.context;return o.length&&(o=k.instanceSelector(this._groupSelector,o[0]._buttons)).length&&o[0].add(n,t,e),this.button(this._groupSelector,t)}),e.Api.register("buttons().destroy()",function(){return this.pluck("inst").unique().each(function(t){t.destroy()}),this}),e.Api.registerPlural("buttons().remove()","buttons().remove()",function(){return this.each(function(t){t.inst.remove(t.node)}),this}),e.Api.register("buttons.info()",function(t,n,e){var o=this;return!1===t?(this.off("destroy.btn-info"),A(v("#datatables_buttons_info"),400,function(){v(this).remove()}),clearTimeout(i),i=null):(i&&clearTimeout(i),v("#datatables_buttons_info").length&&v("#datatables_buttons_info").remove(),t=t?"<h2>"+t+"</h2>":"",_(v('<div id="datatables_buttons_info" class="dt-button-info"/>').html(t).append(v("<div/>")["string"==typeof n?"html":"append"](n)).css("display","none").appendTo("body")),e!==x&&0!==e&&(i=setTimeout(function(){o.buttons.info(!1)},e)),this.on("destroy.btn-info",function(){o.buttons.info(!1)})),this}),e.Api.register("buttons.exportData()",function(t){if(this.context.length)return u(new e.Api(this.context[0]),t)}),e.Api.register("buttons.exportInfo()",function(t){return{filename:n(t=t||{}),title:r(t),messageTop:a(this,t.message||t.messageTop,"top"),messageBottom:a(this,t.messageBottom,"bottom")}});var i,n=function(t){var n;return(n="function"==typeof(n="*"===t.filename&&"*"!==t.title&&t.title!==x&&null!==t.title&&""!==t.title?t.title:t.filename)?n():n)===x||null===n?null:(n=(n=-1!==n.indexOf("*")?n.replace("*",v("head > title").text()).trim():n).replace(/[^a-zA-Z0-9_\u00A1-\uFFFF\.,\-_ !\(\)]/g,""))+(s(t.extension)||"")},s=function(t){return null===t||t===x?null:"function"==typeof t?t():t},r=function(t){t=s(t.title);return null===t?null:-1!==t.indexOf("*")?t.replace("*",v("head > title").text()||"Exported data"):t},a=function(t,n,e){n=s(n);return null===n?null:(t=v("caption",t.table().container()).eq(0),"*"===n?t.css("caption-side")!==e?null:t.length?t.text():"":n)},l=v("<textarea/>")[0],u=function(e,t){for(var o=v.extend(!0,{},{rows:null,columns:"",modifier:{search:"applied",order:"applied"},orthogonal:"display",stripHtml:!0,stripNewlines:!0,decodeEntities:!0,trim:!0,format:{header:function(t){return k.stripData(t,o)},footer:function(t){return k.stripData(t,o)},body:function(t){return k.stripData(t,o)}},customizeData:null},t),t=e.columns(o.columns).indexes().map(function(t){var n=e.column(t).header();return o.format.header(n.innerHTML,t,n)}).toArray(),n=e.table().footer()?e.columns(o.columns).indexes().map(function(t){var n=e.column(t).footer();return o.format.footer(n?n.innerHTML:"",t,n)}).toArray():null,i=v.extend({},o.modifier),i=(e.select&&"function"==typeof e.select.info&&i.selected===x&&e.rows(o.rows,v.extend({selected:!0},i)).any()&&v.extend(i,{selected:!0}),e.rows(o.rows,i).indexes().toArray()),i=e.cells(i,o.columns),s=i.render(o.orthogonal).toArray(),r=i.nodes().toArray(),a=t.length,l=[],u=0,c=0,d=0<a?s.length/a:0;c<d;c++){for(var f=[a],p=0;p<a;p++)f[p]=o.format.body(s[u],c,p,r[u]),u++;l[c]=f}i={header:t,footer:n,body:l};return o.customizeData&&o.customizeData(i),i};function t(t,n){t=new e.Api(t),n=n||t.init().buttons||e.defaults.buttons;return new k(t,n).container()}return v.fn.dataTable.Buttons=k,v.fn.DataTable.Buttons=k,v(y).on("init.dt plugin-init.dt",function(t,n){"dt"===t.namespace&&(t=n.oInit.buttons||e.defaults.buttons)&&!n._buttons&&new k(n,t).container()}),e.ext.feature.push({fnInit:t,cFeature:"B"}),e.ext.features&&e.ext.features.register("buttons",t),e});/*! Bootstrap integration for DataTables' Buttons
* ©2016 SpryMedia Ltd - datatables.net/license
*/!function(e){"function"==typeof define&&define.amd?define(["jquery","datatables.net-bs5","datatables.net-buttons"],function(t){return e(t,window,document)}):"object"==typeof exports?module.exports=function(t,n){return t=t||window,(n=n||("undefined"!=typeof window?require("jquery"):require("jquery")(t))).fn.dataTable||require("datatables.net-bs5")(t,n),n.fn.dataTable.Buttons||require("datatables.net-buttons")(t,n),e(n,0,t.document)}:e(jQuery,window,document)}(function(e,t,n,o){"use strict";var a=e.fn.dataTable;return e.extend(!0,a.Buttons.defaults,{dom:{container:{className:"dt-buttons btn-group flex-wrap"},button:{className:"btn btn-secondary"},collection:{tag:"div",className:"dropdown-menu",closeButton:!1,button:{tag:"a",className:"dt-button dropdown-item",active:"active",disabled:"disabled"}},splitWrapper:{tag:"div",className:"dt-btn-split-wrapper btn-group",closeButton:!1},splitDropdown:{tag:"button",text:"",className:"btn btn-secondary dt-btn-split-drop dropdown-toggle dropdown-toggle-split",closeButton:!1,align:"split-left",splitAlignClass:"dt-button-split-left"},splitDropdownButton:{tag:"button",className:"dt-btn-split-drop-button btn btn-secondary",closeButton:!1}},buttonCreated:function(t,n){return t.buttons?e('<div class="btn-group"/>').append(n):n}}),a.ext.buttons.collection.className+=" dropdown-toggle",a.ext.buttons.collection.rightAlignClassName="dropdown-menu-right",a});/*!
* Column visibility buttons for Buttons and DataTables.
* 2016 SpryMedia Ltd - datatables.net/license
*/(function(factory){if(typeof define==='function'&&define.amd){define(['jquery','datatables.net','datatables.net-buttons'],function($){return factory($,window,document);});}
else if(typeof exports==='object'){module.exports=function(root,$){if(!root){root=window;}
if(!$){$=typeof window!=='undefined'?require('jquery'):require('jquery')(root);}
if(!$.fn.dataTable){require('datatables.net')(root,$);}
if(!$.fn.dataTable.Buttons){require('datatables.net-buttons')(root,$);}
return factory($,root,root.document);};}
else{factory(jQuery,window,document);}}(function($,window,document,undefined){'use strict';var DataTable=$.fn.dataTable;$.extend(DataTable.ext.buttons,{colvis:function(dt,conf){var node=null;var buttonConf={extend:'collection',init:function(dt,n){node=n;},text:function(dt){return dt.i18n('buttons.colvis','Column visibility');},className:'buttons-colvis',closeButton:false,buttons:[{extend:'columnsToggle',columns:conf.columns,columnText:conf.columnText}]};dt.on('column-reorder.dt'+conf.namespace,function(e,settings,details){dt.button(null,dt.button(null,node).node()).collectionRebuild([{extend:'columnsToggle',columns:conf.columns,columnText:conf.columnText}]);});return buttonConf;},columnsToggle:function(dt,conf){var columns=dt.columns(conf.columns).indexes().map(function(idx){return{extend:'columnToggle',columns:idx,columnText:conf.columnText};}).toArray();return columns;},columnToggle:function(dt,conf){return{extend:'columnVisibility',columns:conf.columns,columnText:conf.columnText};},columnsVisibility:function(dt,conf){var columns=dt.columns(conf.columns).indexes().map(function(idx){return{extend:'columnVisibility',columns:idx,visibility:conf.visibility,columnText:conf.columnText};}).toArray();return columns;},columnVisibility:{columns:undefined,text:function(dt,button,conf){return conf._columnText(dt,conf);},className:'buttons-columnVisibility',action:function(e,dt,button,conf){var col=dt.columns(conf.columns);var curr=col.visible();col.visible(conf.visibility!==undefined?conf.visibility:!(curr.length?curr[0]:false));},init:function(dt,button,conf){var that=this;button.attr('data-cv-idx',conf.columns);dt.on('column-visibility.dt'+conf.namespace,function(e,settings){if(!settings.bDestroying&&settings.nTable==dt.settings()[0].nTable){that.active(dt.column(conf.columns).visible());}}).on('column-reorder.dt'+conf.namespace,function(e,settings,details){if(conf.destroying){return;}
if(dt.columns(conf.columns).count()!==1){return;}
that.text(conf._columnText(dt,conf));that.active(dt.column(conf.columns).visible());});this.active(dt.column(conf.columns).visible());},destroy:function(dt,button,conf){dt.off('column-visibility.dt'+conf.namespace).off('column-reorder.dt'+conf.namespace);},_columnText:function(dt,conf){var idx=dt.column(conf.columns).index();var title=dt.settings()[0].aoColumns[idx].sTitle;if(!title){title=dt.column(idx).header().innerHTML;}
title=title.replace(/\n/g," ").replace(/<br\s*\/?>/gi," ").replace(/<select(.*?)<\/select>/g,"").replace(/<!\-\-.*?\-\->/g,"").replace(/<.*?>/g,"").replace(/^\s+|\s+$/g,"");return conf.columnText?conf.columnText(dt,idx,title):title;}},colvisRestore:{className:'buttons-colvisRestore',text:function(dt){return dt.i18n('buttons.colvisRestore','Restore visibility');},init:function(dt,button,conf){conf._visOriginal=dt.columns().indexes().map(function(idx){return dt.column(idx).visible();}).toArray();},action:function(e,dt,button,conf){dt.columns().every(function(i){var idx=dt.colReorder&&dt.colReorder.transpose?dt.colReorder.transpose(i,'toOriginal'):i;this.visible(conf._visOriginal[idx]);});}},colvisGroup:{className:'buttons-colvisGroup',action:function(e,dt,button,conf){dt.columns(conf.show).visible(true,false);dt.columns(conf.hide).visible(false,false);dt.columns.adjust();},show:[],hide:[]}});return DataTable;}));/*!
* Flash export buttons for Buttons and DataTables.
* 2015 SpryMedia Ltd - datatables.net/license
*
* ZeroClipbaord - MIT license
* Copyright (c) 2012 Joseph Huckaby
*/(function(factory){if(typeof define==='function'&&define.amd){define(['jquery','datatables.net','datatables.net-buttons'],function($){return factory($,window,document);});}
else if(typeof exports==='object'){module.exports=function(root,$){if(!root){root=window;}
if(!$||!$.fn.dataTable){$=require('datatables.net')(root,$).$;}
if(!$.fn.dataTable.Buttons){require('datatables.net-buttons')(root,$);}
return factory($,root,root.document);};}
else{factory(jQuery,window,document);}}(function($,window,document,undefined){'use strict';var DataTable=$.fn.dataTable;var ZeroClipboard_TableTools={version:"1.0.4-TableTools2",clients:{},moviePath:'',nextId:1,$:function(thingy){if(typeof(thingy)=='string'){thingy=document.getElementById(thingy);}
if(!thingy.addClass){thingy.hide=function(){this.style.display='none';};thingy.show=function(){this.style.display='';};thingy.addClass=function(name){this.removeClass(name);this.className+=' '+name;};thingy.removeClass=function(name){this.className=this.className.replace(new RegExp("\\s*"+name+"\\s*")," ").replace(/^\s+/,'').replace(/\s+$/,'');};thingy.hasClass=function(name){return!!this.className.match(new RegExp("\\s*"+name+"\\s*"));};}
return thingy;},setMoviePath:function(path){this.moviePath=path;},dispatch:function(id,eventName,args){var client=this.clients[id];if(client){client.receiveEvent(eventName,args);}},log:function(str){console.log('Flash: '+str);},register:function(id,client){this.clients[id]=client;},getDOMObjectPosition:function(obj){var info={left:0,top:0,width:obj.width?obj.width:obj.offsetWidth,height:obj.height?obj.height:obj.offsetHeight};if(obj.style.width!==""){info.width=obj.style.width.replace("px","");}
if(obj.style.height!==""){info.height=obj.style.height.replace("px","");}
while(obj){info.left+=obj.offsetLeft;info.top+=obj.offsetTop;obj=obj.offsetParent;}
return info;},Client:function(elem){this.handlers={};this.id=ZeroClipboard_TableTools.nextId++;this.movieId='ZeroClipboard_TableToolsMovie_'+this.id;ZeroClipboard_TableTools.register(this.id,this);if(elem){this.glue(elem);}}};ZeroClipboard_TableTools.Client.prototype={id:0,ready:false,movie:null,clipText:'',fileName:'',action:'copy',handCursorEnabled:true,cssEffects:true,handlers:null,sized:false,sheetName:'',glue:function(elem,title){this.domElement=ZeroClipboard_TableTools.$(elem);var zIndex=99;if(this.domElement.style.zIndex){zIndex=parseInt(this.domElement.style.zIndex,10)+1;}
var box=ZeroClipboard_TableTools.getDOMObjectPosition(this.domElement);this.div=document.createElement('div');var style=this.div.style;style.position='absolute';style.left='0px';style.top='0px';style.width=(box.width)+'px';style.height=box.height+'px';style.zIndex=zIndex;if(typeof title!="undefined"&&title!==""){this.div.title=title;}
if(box.width!==0&&box.height!==0){this.sized=true;}
if(this.domElement){this.domElement.appendChild(this.div);this.div.innerHTML=this.getHTML(box.width,box.height).replace(/&/g,'&amp;');}},positionElement:function(){var box=ZeroClipboard_TableTools.getDOMObjectPosition(this.domElement);var style=this.div.style;style.position='absolute';style.width=box.width+'px';style.height=box.height+'px';if(box.width!==0&&box.height!==0){this.sized=true;}else{return;}
var flash=this.div.childNodes[0];flash.width=box.width;flash.height=box.height;},getHTML:function(width,height){var html='';var flashvars='id='+this.id+
'&width='+width+
'&height='+height;if(navigator.userAgent.match(/MSIE/)){var protocol=location.href.match(/^https/i)?'https://':'http://';html+='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="'+protocol+'download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=10,0,0,0" width="'+width+'" height="'+height+'" id="'+this.movieId+'" align="middle"><param name="allowScriptAccess" value="always" /><param name="allowFullScreen" value="false" /><param name="movie" value="'+ZeroClipboard_TableTools.moviePath+'" /><param name="loop" value="false" /><param name="menu" value="false" /><param name="quality" value="best" /><param name="bgcolor" value="#ffffff" /><param name="flashvars" value="'+flashvars+'"/><param name="wmode" value="transparent"/></object>';}
else{html+='<embed id="'+this.movieId+'" src="'+ZeroClipboard_TableTools.moviePath+'" loop="false" menu="false" quality="best" bgcolor="#ffffff" width="'+width+'" height="'+height+'" name="'+this.movieId+'" align="middle" allowScriptAccess="always" allowFullScreen="false" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" flashvars="'+flashvars+'" wmode="transparent" />';}
return html;},hide:function(){if(this.div){this.div.style.left='-2000px';}},show:function(){this.reposition();},destroy:function(){var that=this;if(this.domElement&&this.div){$(this.div).remove();this.domElement=null;this.div=null;$.each(ZeroClipboard_TableTools.clients,function(id,client){if(client===that){delete ZeroClipboard_TableTools.clients[id];}});}},reposition:function(elem){if(elem){this.domElement=ZeroClipboard_TableTools.$(elem);if(!this.domElement){this.hide();}}
if(this.domElement&&this.div){var box=ZeroClipboard_TableTools.getDOMObjectPosition(this.domElement);var style=this.div.style;style.left=''+box.left+'px';style.top=''+box.top+'px';}},clearText:function(){this.clipText='';if(this.ready){this.movie.clearText();}},appendText:function(newText){this.clipText+=newText;if(this.ready){this.movie.appendText(newText);}},setText:function(newText){this.clipText=newText;if(this.ready){this.movie.setText(newText);}},setFileName:function(newText){this.fileName=newText;if(this.ready){this.movie.setFileName(newText);}},setSheetData:function(data){if(this.ready){this.movie.setSheetData(JSON.stringify(data));}},setAction:function(newText){this.action=newText;if(this.ready){this.movie.setAction(newText);}},addEventListener:function(eventName,func){eventName=eventName.toString().toLowerCase().replace(/^on/,'');if(!this.handlers[eventName]){this.handlers[eventName]=[];}
this.handlers[eventName].push(func);},setHandCursor:function(enabled){this.handCursorEnabled=enabled;if(this.ready){this.movie.setHandCursor(enabled);}},setCSSEffects:function(enabled){this.cssEffects=!!enabled;},receiveEvent:function(eventName,args){var self;eventName=eventName.toString().toLowerCase().replace(/^on/,'');switch(eventName){case 'load':this.movie=document.getElementById(this.movieId);if(!this.movie){self=this;setTimeout(function(){self.receiveEvent('load',null);},1);return;}
if(!this.ready&&navigator.userAgent.match(/Firefox/)&&navigator.userAgent.match(/Windows/)){self=this;setTimeout(function(){self.receiveEvent('load',null);},100);this.ready=true;return;}
this.ready=true;this.movie.clearText();this.movie.appendText(this.clipText);this.movie.setFileName(this.fileName);this.movie.setAction(this.action);this.movie.setHandCursor(this.handCursorEnabled);break;case 'mouseover':if(this.domElement&&this.cssEffects){if(this.recoverActive){this.domElement.addClass('active');}}
break;case 'mouseout':if(this.domElement&&this.cssEffects){this.recoverActive=false;if(this.domElement.hasClass('active')){this.domElement.removeClass('active');this.recoverActive=true;}}
break;case 'mousedown':if(this.domElement&&this.cssEffects){this.domElement.addClass('active');}
break;case 'mouseup':if(this.domElement&&this.cssEffects){this.domElement.removeClass('active');this.recoverActive=false;}
break;}
if(this.handlers[eventName]){for(var idx=0,len=this.handlers[eventName].length;idx<len;idx++){var func=this.handlers[eventName][idx];if(typeof(func)=='function'){func(this,args);}
else if((typeof(func)=='object')&&(func.length==2)){func[0][func[1]](this,args);}
else if(typeof(func)=='string'){window[func](this,args);}}}}};ZeroClipboard_TableTools.hasFlash=function()
{try{var fo=new ActiveXObject('ShockwaveFlash.ShockwaveFlash');if(fo){return true;}}
catch(e){if(navigator.mimeTypes&&navigator.mimeTypes['application/x-shockwave-flash']!==undefined&&navigator.mimeTypes['application/x-shockwave-flash'].enabledPlugin){return true;}}
return false;};window.ZeroClipboard_TableTools=ZeroClipboard_TableTools;var _glue=function(flash,node)
{var id=node.attr('id');if(node.parents('html').length){flash.glue(node[0],'');}
else{setTimeout(function(){_glue(flash,node);},500);}};var _filename=function(config,incExtension)
{var filename=config.filename==='*'&&config.title!=='*'&&config.title!==undefined?config.title:config.filename;if(typeof filename==='function'){filename=filename();}
if(filename.indexOf('*')!==-1){filename=$.trim(filename.replace('*',$('title').text()));}
filename=filename.replace(/[^a-zA-Z0-9_\u00A1-\uFFFF\.,\-_ !\(\)]/g,"");return incExtension===undefined||incExtension===true?filename+config.extension:filename;};var _sheetname=function(config)
{var sheetName='Sheet1';if(config.sheetName){sheetName=config.sheetName.replace(/[\[\]\*\/\\\?\:]/g,'');}
return sheetName;};var _title=function(config)
{var title=config.title;if(typeof title==='function'){title=title();}
return title.indexOf('*')!==-1?title.replace('*',$('title').text()||'Exported data'):title;};var _setText=function(flash,data)
{var parts=data.match(/[\s\S]{1,8192}/g)||[];flash.clearText();for(var i=0,len=parts.length;i<len;i++)
{flash.appendText(parts[i]);}};var _newLine=function(config)
{return config.newline?config.newline:navigator.userAgent.match(/Windows/)?'\r\n':'\n';};var _exportData=function(dt,config)
{var newLine=_newLine(config);var data=dt.buttons.exportData(config.exportOptions);var boundary=config.fieldBoundary;var separator=config.fieldSeparator;var reBoundary=new RegExp(boundary,'g');var escapeChar=config.escapeChar!==undefined?config.escapeChar:'\\';var join=function(a){var s='';for(var i=0,ien=a.length;i<ien;i++){if(i>0){s+=separator;}
s+=boundary?boundary+(''+a[i]).replace(reBoundary,escapeChar+boundary)+boundary:a[i];}
return s;};var header=config.header?join(data.header)+newLine:'';var footer=config.footer&&data.footer?newLine+join(data.footer):'';var body=[];for(var i=0,ien=data.body.length;i<ien;i++){body.push(join(data.body[i]));}
return{str:header+body.join(newLine)+footer,rows:body.length};};var flashButton={available:function(){return ZeroClipboard_TableTools.hasFlash();},init:function(dt,button,config){ZeroClipboard_TableTools.moviePath=DataTable.Buttons.swfPath;var flash=new ZeroClipboard_TableTools.Client();flash.setHandCursor(true);flash.addEventListener('mouseDown',function(client){config._fromFlash=true;dt.button(button[0]).trigger();config._fromFlash=false;});_glue(flash,button);config._flash=flash;},destroy:function(dt,button,config){config._flash.destroy();},fieldSeparator:',',fieldBoundary:'"',exportOptions:{},title:'*',filename:'*',extension:'.csv',header:true,footer:false};function createCellPos(n){var ordA='A'.charCodeAt(0);var ordZ='Z'.charCodeAt(0);var len=ordZ-ordA+1;var s="";while(n>=0){s=String.fromCharCode(n%len+ordA)+s;n=Math.floor(n/len)-1;}
return s;}
function _createNode(doc,nodeName,opts){var tempNode=doc.createElement(nodeName);if(opts){if(opts.attr){$(tempNode).attr(opts.attr);}
if(opts.children){$.each(opts.children,function(key,value){tempNode.appendChild(value);});}
if(opts.text){tempNode.appendChild(doc.createTextNode(opts.text));}}
return tempNode;}
function _excelColWidth(data,col){var max=data.header[col].length;var len,lineSplit,str;if(data.footer&&data.footer[col].length>max){max=data.footer[col].length;}
for(var i=0,ien=data.body.length;i<ien;i++){var point=data.body[i][col];str=point!==null&&point!==undefined?point.toString():'';if(str.indexOf('\n')!==-1){lineSplit=str.split('\n');lineSplit.sort(function(a,b){return b.length-a.length;});len=lineSplit[0].length;}
else{len=str.length;}
if(len>max){max=len;}
if(max>40){return 52;}}
max*=1.3;return max>6?max:6;}
var _serialiser="";if(typeof window.XMLSerializer==='undefined'){_serialiser=new function(){this.serializeToString=function(input){return input.xml}};}else{_serialiser=new XMLSerializer();}
var _ieExcel;function _xlsxToStrings(obj){if(_ieExcel===undefined){_ieExcel=_serialiser.serializeToString($.parseXML(excelStrings['xl/worksheets/sheet1.xml'])).indexOf('xmlns:r')===-1;}
$.each(obj,function(name,val){if($.isPlainObject(val)){_xlsxToStrings(val);}
else{if(_ieExcel){var worksheet=val.childNodes[0];var i,ien;var attrs=[];for(i=worksheet.attributes.length-1;i>=0;i--){var attrName=worksheet.attributes[i].nodeName;var attrValue=worksheet.attributes[i].nodeValue;if(attrName.indexOf(':')!==-1){attrs.push({name:attrName,value:attrValue});worksheet.removeAttribute(attrName);}}
for(i=0,ien=attrs.length;i<ien;i++){var attr=val.createAttribute(attrs[i].name.replace(':','_dt_b_namespace_token_'));attr.value=attrs[i].value;worksheet.setAttributeNode(attr);}}
var str=_serialiser.serializeToString(val);if(_ieExcel){if(str.indexOf('<?xml')===-1){str='<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'+str;}
str=str.replace(/_dt_b_namespace_token_/g,':');}
str=str.replace(/<([^<>]*?) xmlns=""([^<>]*?)>/g,'<$1 $2>');obj[name]=str;}});}
var excelStrings={"_rels/.rels":'<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'+
'<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'+
'<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/>'+
'</Relationships>',"xl/_rels/workbook.xml.rels":'<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'+
'<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'+
'<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/>'+
'<Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>'+
'</Relationships>',"[Content_Types].xml":'<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'+
'<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">'+
'<Default Extension="xml" ContentType="application/xml" />'+
'<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml" />'+
'<Default Extension="jpeg" ContentType="image/jpeg" />'+
'<Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml" />'+
'<Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml" />'+
'<Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml" />'+
'</Types>',"xl/workbook.xml":'<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'+
'<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">'+
'<fileVersion appName="xl" lastEdited="5" lowestEdited="5" rupBuild="24816"/>'+
'<workbookPr showInkAnnotation="0" autoCompressPictures="0"/>'+
'<bookViews>'+
'<workbookView xWindow="0" yWindow="0" windowWidth="25600" windowHeight="19020" tabRatio="500"/>'+
'</bookViews>'+
'<sheets>'+
'<sheet name="" sheetId="1" r:id="rId1"/>'+
'</sheets>'+
'</workbook>',"xl/worksheets/sheet1.xml":'<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'+
'<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" mc:Ignorable="x14ac" xmlns:x14ac="http://schemas.microsoft.com/office/spreadsheetml/2009/9/ac">'+
'<sheetData/>'+
'</worksheet>',"xl/styles.xml":'<?xml version="1.0" encoding="UTF-8"?>'+
'<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" mc:Ignorable="x14ac" xmlns:x14ac="http://schemas.microsoft.com/office/spreadsheetml/2009/9/ac">'+
'<numFmts count="6">'+
'<numFmt numFmtId="164" formatCode="#,##0.00_-\ [$$-45C]"/>'+
'<numFmt numFmtId="165" formatCode="&quot;£&quot;#,##0.00"/>'+
'<numFmt numFmtId="166" formatCode="[$€-2]\ #,##0.00"/>'+
'<numFmt numFmtId="167" formatCode="0.0%"/>'+
'<numFmt numFmtId="168" formatCode="#,##0;(#,##0)"/>'+
'<numFmt numFmtId="169" formatCode="#,##0.00;(#,##0.00)"/>'+
'</numFmts>'+
'<fonts count="5" x14ac:knownFonts="1">'+
'<font>'+
'<sz val="11" />'+
'<name val="Calibri" />'+
'</font>'+
'<font>'+
'<sz val="11" />'+
'<name val="Calibri" />'+
'<color rgb="FFFFFFFF" />'+
'</font>'+
'<font>'+
'<sz val="11" />'+
'<name val="Calibri" />'+
'<b />'+
'</font>'+
'<font>'+
'<sz val="11" />'+
'<name val="Calibri" />'+
'<i />'+
'</font>'+
'<font>'+
'<sz val="11" />'+
'<name val="Calibri" />'+
'<u />'+
'</font>'+
'</fonts>'+
'<fills count="6">'+
'<fill>'+
'<patternFill patternType="none" />'+
'</fill>'+
'<fill/>'+
'<fill>'+
'<patternFill patternType="solid">'+
'<fgColor rgb="FFD9D9D9" />'+
'<bgColor indexed="64" />'+
'</patternFill>'+
'</fill>'+
'<fill>'+
'<patternFill patternType="solid">'+
'<fgColor rgb="FFD99795" />'+
'<bgColor indexed="64" />'+
'</patternFill>'+
'</fill>'+
'<fill>'+
'<patternFill patternType="solid">'+
'<fgColor rgb="ffc6efce" />'+
'<bgColor indexed="64" />'+
'</patternFill>'+
'</fill>'+
'<fill>'+
'<patternFill patternType="solid">'+
'<fgColor rgb="ffc6cfef" />'+
'<bgColor indexed="64" />'+
'</patternFill>'+
'</fill>'+
'</fills>'+
'<borders count="2">'+
'<border>'+
'<left />'+
'<right />'+
'<top />'+
'<bottom />'+
'<diagonal />'+
'</border>'+
'<border diagonalUp="false" diagonalDown="false">'+
'<left style="thin">'+
'<color auto="1" />'+
'</left>'+
'<right style="thin">'+
'<color auto="1" />'+
'</right>'+
'<top style="thin">'+
'<color auto="1" />'+
'</top>'+
'<bottom style="thin">'+
'<color auto="1" />'+
'</bottom>'+
'<diagonal />'+
'</border>'+
'</borders>'+
'<cellStyleXfs count="1">'+
'<xf numFmtId="0" fontId="0" fillId="0" borderId="0" />'+
'</cellStyleXfs>'+
'<cellXfs count="61">'+
'<xf numFmtId="0" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>'+
'<xf numFmtId="0" fontId="1" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>'+
'<xf numFmtId="0" fontId="2" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>'+
'<xf numFmtId="0" fontId="3" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>'+
'<xf numFmtId="0" fontId="4" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>'+
'<xf numFmtId="0" fontId="0" fillId="2" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>'+
'<xf numFmtId="0" fontId="1" fillId="2" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>'+
'<xf numFmtId="0" fontId="2" fillId="2" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>'+
'<xf numFmtId="0" fontId="3" fillId="2" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>'+
'<xf numFmtId="0" fontId="4" fillId="2" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>'+
'<xf numFmtId="0" fontId="0" fillId="3" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>'+
'<xf numFmtId="0" fontId="1" fillId="3" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>'+
'<xf numFmtId="0" fontId="2" fillId="3" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>'+
'<xf numFmtId="0" fontId="3" fillId="3" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>'+
'<xf numFmtId="0" fontId="4" fillId="3" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>'+
'<xf numFmtId="0" fontId="0" fillId="4" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>'+
'<xf numFmtId="0" fontId="1" fillId="4" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>'+
'<xf numFmtId="0" fontId="2" fillId="4" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>'+
'<xf numFmtId="0" fontId="3" fillId="4" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>'+
'<xf numFmtId="0" fontId="4" fillId="4" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>'+
'<xf numFmtId="0" fontId="0" fillId="5" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>'+
'<xf numFmtId="0" fontId="1" fillId="5" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>'+
'<xf numFmtId="0" fontId="2" fillId="5" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>'+
'<xf numFmtId="0" fontId="3" fillId="5" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>'+
'<xf numFmtId="0" fontId="4" fillId="5" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>'+
'<xf numFmtId="0" fontId="0" fillId="0" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>'+
'<xf numFmtId="0" fontId="1" fillId="0" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>'+
'<xf numFmtId="0" fontId="2" fillId="0" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>'+
'<xf numFmtId="0" fontId="3" fillId="0" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>'+
'<xf numFmtId="0" fontId="4" fillId="0" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>'+
'<xf numFmtId="0" fontId="0" fillId="2" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>'+
'<xf numFmtId="0" fontId="1" fillId="2" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>'+
'<xf numFmtId="0" fontId="2" fillId="2" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>'+
'<xf numFmtId="0" fontId="3" fillId="2" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>'+
'<xf numFmtId="0" fontId="4" fillId="2" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>'+
'<xf numFmtId="0" fontId="0" fillId="3" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>'+
'<xf numFmtId="0" fontId="1" fillId="3" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>'+
'<xf numFmtId="0" fontId="2" fillId="3" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>'+
'<xf numFmtId="0" fontId="3" fillId="3" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>'+
'<xf numFmtId="0" fontId="4" fillId="3" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>'+
'<xf numFmtId="0" fontId="0" fillId="4" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>'+
'<xf numFmtId="0" fontId="1" fillId="4" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>'+
'<xf numFmtId="0" fontId="2" fillId="4" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>'+
'<xf numFmtId="0" fontId="3" fillId="4" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>'+
'<xf numFmtId="0" fontId="4" fillId="4" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>'+
'<xf numFmtId="0" fontId="0" fillId="5" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>'+
'<xf numFmtId="0" fontId="1" fillId="5" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>'+
'<xf numFmtId="0" fontId="2" fillId="5" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>'+
'<xf numFmtId="0" fontId="3" fillId="5" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>'+
'<xf numFmtId="0" fontId="4" fillId="5" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>'+
'<xf numFmtId="0" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyAlignment="1">'+
'<alignment horizontal="left"/>'+
'</xf>'+
'<xf numFmtId="0" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyAlignment="1">'+
'<alignment horizontal="center"/>'+
'</xf>'+
'<xf numFmtId="0" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyAlignment="1">'+
'<alignment horizontal="right"/>'+
'</xf>'+
'<xf numFmtId="0" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyAlignment="1">'+
'<alignment horizontal="fill"/>'+
'</xf>'+
'<xf numFmtId="0" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyAlignment="1">'+
'<alignment textRotation="90"/>'+
'</xf>'+
'<xf numFmtId="0" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyAlignment="1">'+
'<alignment wrapText="1"/>'+
'</xf>'+
'<xf numFmtId="9"   fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/>'+
'<xf numFmtId="164" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/>'+
'<xf numFmtId="165" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/>'+
'<xf numFmtId="166" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/>'+
'<xf numFmtId="167" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/>'+
'<xf numFmtId="168" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/>'+
'<xf numFmtId="169" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/>'+
'<xf numFmtId="3" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/>'+
'<xf numFmtId="4" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/>'+
'</cellXfs>'+
'<cellStyles count="1">'+
'<cellStyle name="Normal" xfId="0" builtinId="0" />'+
'</cellStyles>'+
'<dxfs count="0" />'+
'<tableStyles count="0" defaultTableStyle="TableStyleMedium9" defaultPivotStyle="PivotStyleMedium4" />'+
'</styleSheet>'};var _excelSpecials=[{match:/^\-?\d+\.\d%$/,style:60,fmt:function(d){return d/100;}},{match:/^\-?\d+\.?\d*%$/,style:56,fmt:function(d){return d/100;}},{match:/^\-?\$[\d,]+.?\d*$/,style:57},{match:/^\-?£[\d,]+.?\d*$/,style:58},{match:/^\-?€[\d,]+.?\d*$/,style:59},{match:/^\([\d,]+\)$/,style:61,fmt:function(d){return-1*d.replace(/[\(\)]/g,'');}},{match:/^\([\d,]+\.\d{2}\)$/,style:62,fmt:function(d){return-1*d.replace(/[\(\)]/g,'');}},{match:/^[\d,]+$/,style:63},{match:/^[\d,]+\.\d{2}$/,style:64}];DataTable.Buttons.swfPath='//cdn.datatables.net/buttons/1.2.4/swf/flashExport.swf';DataTable.Api.register('buttons.resize()',function(){$.each(ZeroClipboard_TableTools.clients,function(i,client){if(client.domElement!==undefined&&client.domElement.parentNode){client.positionElement();}});});DataTable.ext.buttons.copyFlash=$.extend({},flashButton,{className:'buttons-copy buttons-flash',text:function(dt){return dt.i18n('buttons.copy','Copy');},action:function(e,dt,button,config){if(!config._fromFlash){return;}
this.processing(true);var flash=config._flash;var data=_exportData(dt,config);var output=config.customize?config.customize(data.str,config):data.str;flash.setAction('copy');_setText(flash,output);this.processing(false);dt.buttons.info(dt.i18n('buttons.copyTitle','Copy to clipboard'),dt.i18n('buttons.copySuccess',{_:'Copied %d rows to clipboard',1:'Copied 1 row to clipboard'},data.rows),3000);},fieldSeparator:'\t',fieldBoundary:''});DataTable.ext.buttons.csvFlash=$.extend({},flashButton,{className:'buttons-csv buttons-flash',text:function(dt){return dt.i18n('buttons.csv','CSV');},action:function(e,dt,button,config){var flash=config._flash;var data=_exportData(dt,config);var output=config.customize?config.customize(data.str,config):data.str;flash.setAction('csv');flash.setFileName(_filename(config));_setText(flash,output);},escapeChar:'"'});DataTable.ext.buttons.excelFlash=$.extend({},flashButton,{className:'buttons-excel buttons-flash',text:function(dt){return dt.i18n('buttons.excel','Excel');},action:function(e,dt,button,config){this.processing(true);var flash=config._flash;var rowPos=0;var rels=$.parseXML(excelStrings['xl/worksheets/sheet1.xml']);var relsGet=rels.getElementsByTagName("sheetData")[0];var xlsx={_rels:{".rels":$.parseXML(excelStrings['_rels/.rels'])},xl:{_rels:{"workbook.xml.rels":$.parseXML(excelStrings['xl/_rels/workbook.xml.rels'])},"workbook.xml":$.parseXML(excelStrings['xl/workbook.xml']),"styles.xml":$.parseXML(excelStrings['xl/styles.xml']),"worksheets":{"sheet1.xml":rels}},"[Content_Types].xml":$.parseXML(excelStrings['[Content_Types].xml'])};var data=dt.buttons.exportData(config.exportOptions);var currentRow,rowNode;var addRow=function(row){currentRow=rowPos+1;rowNode=_createNode(rels,"row",{attr:{r:currentRow}});for(var i=0,ien=row.length;i<ien;i++){var cellId=createCellPos(i)+''+currentRow;var cell=null;if(row[i]===null||row[i]===undefined||row[i]===''){continue;}
row[i]=$.trim(row[i]);for(var j=0,jen=_excelSpecials.length;j<jen;j++){var special=_excelSpecials[j];if(row[i].match&&!row[i].match(/^0\d+/)&&row[i].match(special.match)){var val=row[i].replace(/[^\d\.\-]/g,'');if(special.fmt){val=special.fmt(val);}
cell=_createNode(rels,'c',{attr:{r:cellId,s:special.style},children:[_createNode(rels,'v',{text:val})]});break;}}
if(!cell){if(typeof row[i]==='number'||(row[i].match&&row[i].match(/^-?\d+(\.\d+)?$/)&&!row[i].match(/^0\d+/))){cell=_createNode(rels,'c',{attr:{t:'n',r:cellId},children:[_createNode(rels,'v',{text:row[i]})]});}
else{var text=!row[i].replace?row[i]:row[i].replace(/[\x00-\x09\x0B\x0C\x0E-\x1F\x7F-\x9F]/g,'');cell=_createNode(rels,'c',{attr:{t:'inlineStr',r:cellId},children:{row:_createNode(rels,'is',{children:{row:_createNode(rels,'t',{text:text})}})}});}}
rowNode.appendChild(cell);}
relsGet.appendChild(rowNode);rowPos++;};$('sheets sheet',xlsx.xl['workbook.xml']).attr('name',_sheetname(config));if(config.customizeData){config.customizeData(data);}
if(config.header){addRow(data.header,rowPos);$('row c',rels).attr('s','2');}
for(var n=0,ie=data.body.length;n<ie;n++){addRow(data.body[n],rowPos);}
if(config.footer&&data.footer){addRow(data.footer,rowPos);$('row:last c',rels).attr('s','2');}
var cols=_createNode(rels,'cols');$('worksheet',rels).prepend(cols);for(var i=0,ien=data.header.length;i<ien;i++){cols.appendChild(_createNode(rels,'col',{attr:{min:i+1,max:i+1,width:_excelColWidth(data,i),customWidth:1}}));}
if(config.customize){config.customize(xlsx);}
_xlsxToStrings(xlsx);flash.setAction('excel');flash.setFileName(_filename(config));flash.setSheetData(xlsx);_setText(flash,'');this.processing(false);},extension:'.xlsx'});DataTable.ext.buttons.pdfFlash=$.extend({},flashButton,{className:'buttons-pdf buttons-flash',text:function(dt){return dt.i18n('buttons.pdf','PDF');},action:function(e,dt,button,config){this.processing(true);var flash=config._flash;var data=dt.buttons.exportData(config.exportOptions);var totalWidth=dt.table().node().offsetWidth;var ratios=dt.columns(config.columns).indexes().map(function(idx){return dt.column(idx).header().offsetWidth/totalWidth;});flash.setAction('pdf');flash.setFileName(_filename(config));_setText(flash,JSON.stringify({title:_filename(config,false),message:typeof config.message=='function'?config.message(dt,button,config):config.message,colWidth:ratios.toArray(),orientation:config.orientation,size:config.pageSize,header:config.header?data.header:null,footer:config.footer?data.footer:null,body:data.body}));this.processing(false);},extension:'.pdf',orientation:'portrait',pageSize:'A4',message:'',newline:'\n'});return DataTable.Buttons;}));/*!
* HTML5 export buttons for Buttons and DataTables.
* 2016 SpryMedia Ltd - datatables.net/license
*
* FileSaver.js (1.3.3) - MIT license
* Copyright © 2016 Eli Grey - http://eligrey.com
*/(function(factory){if(typeof define==='function'&&define.amd){define(['jquery','datatables.net','datatables.net-buttons'],function($){return factory($,window,document);});}
else if(typeof exports==='object'){module.exports=function(root,$,jszip,pdfmake){if(!root){root=window;}
if(!$){$=typeof window!=='undefined'?require('jquery'):require('jquery')(root);}
if(!$.fn.dataTable){require('datatables.net')(root,$);}
if(!$.fn.dataTable.Buttons){require('datatables.net-buttons')(root,$);}
return factory($,root,root.document,jszip,pdfmake);};}
else{factory(jQuery,window,document);}}(function($,window,document,jszip,pdfmake,undefined){'use strict';var DataTable=$.fn.dataTable;var useJszip;var usePdfmake;function _jsZip(){return useJszip||window.JSZip;}
function _pdfMake(){return usePdfmake||window.pdfMake;}
DataTable.Buttons.pdfMake=function(_){if(!_){return _pdfMake();}
usePdfmake=_;}
DataTable.Buttons.jszip=function(_){if(!_){return _jsZip();}
useJszip=_;}
var _saveAs=(function(view){"use strict";if(typeof view==="undefined"||typeof navigator!=="undefined"&&/MSIE [1-9]\./.test(navigator.userAgent)){return;}
var
doc=view.document,get_URL=function(){return view.URL||view.webkitURL||view;},save_link=doc.createElementNS("http://www.w3.org/1999/xhtml","a"),can_use_save_link="download"in save_link,click=function(node){var event=new MouseEvent("click");node.dispatchEvent(event);},is_safari=/constructor/i.test(view.HTMLElement)||view.safari,is_chrome_ios=/CriOS\/[\d]+/.test(navigator.userAgent),throw_outside=function(ex){(view.setImmediate||view.setTimeout)(function(){throw ex;},0);},force_saveable_type="application/octet-stream",arbitrary_revoke_timeout=1000*40,revoke=function(file){var revoker=function(){if(typeof file==="string"){get_URL().revokeObjectURL(file);}else{file.remove();}};setTimeout(revoker,arbitrary_revoke_timeout);},dispatch=function(filesaver,event_types,event){event_types=[].concat(event_types);var i=event_types.length;while(i--){var listener=filesaver["on"+event_types[i]];if(typeof listener==="function"){try{listener.call(filesaver,event||filesaver);}catch(ex){throw_outside(ex);}}}},auto_bom=function(blob){if(/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(blob.type)){return new Blob([String.fromCharCode(0xFEFF),blob],{type:blob.type});}
return blob;},FileSaver=function(blob,name,no_auto_bom){if(!no_auto_bom){blob=auto_bom(blob);}
var
filesaver=this,type=blob.type,force=type===force_saveable_type,object_url,dispatch_all=function(){dispatch(filesaver,"writestart progress write writeend".split(" "));},fs_error=function(){if((is_chrome_ios||(force&&is_safari))&&view.FileReader){var reader=new FileReader();reader.onloadend=function(){var url=is_chrome_ios?reader.result:reader.result.replace(/^data:[^;]*;/,'data:attachment/file;');var popup=view.open(url,'_blank');if(!popup)view.location.href=url;url=undefined;filesaver.readyState=filesaver.DONE;dispatch_all();};reader.readAsDataURL(blob);filesaver.readyState=filesaver.INIT;return;}
if(!object_url){object_url=get_URL().createObjectURL(blob);}
if(force){view.location.href=object_url;}else{var opened=view.open(object_url,"_blank");if(!opened){view.location.href=object_url;}}
filesaver.readyState=filesaver.DONE;dispatch_all();revoke(object_url);};filesaver.readyState=filesaver.INIT;if(can_use_save_link){object_url=get_URL().createObjectURL(blob);setTimeout(function(){save_link.href=object_url;save_link.download=name;click(save_link);dispatch_all();revoke(object_url);filesaver.readyState=filesaver.DONE;});return;}
fs_error();},FS_proto=FileSaver.prototype,saveAs=function(blob,name,no_auto_bom){return new FileSaver(blob,name||blob.name||"download",no_auto_bom);};if(typeof navigator!=="undefined"&&navigator.msSaveOrOpenBlob){return function(blob,name,no_auto_bom){name=name||blob.name||"download";if(!no_auto_bom){blob=auto_bom(blob);}
return navigator.msSaveOrOpenBlob(blob,name);};}
FS_proto.abort=function(){};FS_proto.readyState=FS_proto.INIT=0;FS_proto.WRITING=1;FS_proto.DONE=2;FS_proto.error=FS_proto.onwritestart=FS_proto.onprogress=FS_proto.onwrite=FS_proto.onabort=FS_proto.onerror=FS_proto.onwriteend=null;return saveAs;}(typeof self!=="undefined"&&self||typeof window!=="undefined"&&window||this.content));DataTable.fileSave=_saveAs;var _sheetname=function(config)
{var sheetName='Sheet1';if(config.sheetName){sheetName=config.sheetName.replace(/[\[\]\*\/\\\?\:]/g,'');}
return sheetName;};var _newLine=function(config)
{return config.newline?config.newline:navigator.userAgent.match(/Windows/)?'\r\n':'\n';};var _exportData=function(dt,config)
{var newLine=_newLine(config);var data=dt.buttons.exportData(config.exportOptions);var boundary=config.fieldBoundary;var separator=config.fieldSeparator;var reBoundary=new RegExp(boundary,'g');var escapeChar=config.escapeChar!==undefined?config.escapeChar:'\\';var join=function(a){var s='';for(var i=0,ien=a.length;i<ien;i++){if(i>0){s+=separator;}
s+=boundary?boundary+(''+a[i]).replace(reBoundary,escapeChar+boundary)+boundary:a[i];}
return s;};var header=config.header?join(data.header)+newLine:'';var footer=config.footer&&data.footer?newLine+join(data.footer):'';var body=[];for(var i=0,ien=data.body.length;i<ien;i++){body.push(join(data.body[i]));}
return{str:header+body.join(newLine)+footer,rows:body.length};};var _isDuffSafari=function()
{var safari=navigator.userAgent.indexOf('Safari')!==-1&&navigator.userAgent.indexOf('Chrome')===-1&&navigator.userAgent.indexOf('Opera')===-1;if(!safari){return false;}
var version=navigator.userAgent.match(/AppleWebKit\/(\d+\.\d+)/);if(version&&version.length>1&&version[1]*1<603.1){return true;}
return false;};function createCellPos(n){var ordA='A'.charCodeAt(0);var ordZ='Z'.charCodeAt(0);var len=ordZ-ordA+1;var s="";while(n>=0){s=String.fromCharCode(n%len+ordA)+s;n=Math.floor(n/len)-1;}
return s;}
try{var _serialiser=new XMLSerializer();var _ieExcel;}
catch(t){}
function _addToZip(zip,obj){if(_ieExcel===undefined){_ieExcel=_serialiser.serializeToString((new window.DOMParser()).parseFromString(excelStrings['xl/worksheets/sheet1.xml'],'text/xml')).indexOf('xmlns:r')===-1;}
$.each(obj,function(name,val){if($.isPlainObject(val)){var newDir=zip.folder(name);_addToZip(newDir,val);}
else{if(_ieExcel){var worksheet=val.childNodes[0];var i,ien;var attrs=[];for(i=worksheet.attributes.length-1;i>=0;i--){var attrName=worksheet.attributes[i].nodeName;var attrValue=worksheet.attributes[i].nodeValue;if(attrName.indexOf(':')!==-1){attrs.push({name:attrName,value:attrValue});worksheet.removeAttribute(attrName);}}
for(i=0,ien=attrs.length;i<ien;i++){var attr=val.createAttribute(attrs[i].name.replace(':','_dt_b_namespace_token_'));attr.value=attrs[i].value;worksheet.setAttributeNode(attr);}}
var str=_serialiser.serializeToString(val);if(_ieExcel){if(str.indexOf('<?xml')===-1){str='<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'+str;}
str=str.replace(/_dt_b_namespace_token_/g,':');str=str.replace(/xmlns:NS[\d]+="" NS[\d]+:/g,'');}
str=str.replace(/<([^<>]*?) xmlns=""([^<>]*?)>/g,'<$1 $2>');zip.file(name,str);}});}
function _createNode(doc,nodeName,opts){var tempNode=doc.createElement(nodeName);if(opts){if(opts.attr){$(tempNode).attr(opts.attr);}
if(opts.children){$.each(opts.children,function(key,value){tempNode.appendChild(value);});}
if(opts.text!==null&&opts.text!==undefined){tempNode.appendChild(doc.createTextNode(opts.text));}}
return tempNode;}
function _excelColWidth(data,col){var max=data.header[col].length;var len,lineSplit,str;if(data.footer&&data.footer[col].length>max){max=data.footer[col].length;}
for(var i=0,ien=data.body.length;i<ien;i++){var point=data.body[i][col];str=point!==null&&point!==undefined?point.toString():'';if(str.indexOf('\n')!==-1){lineSplit=str.split('\n');lineSplit.sort(function(a,b){return b.length-a.length;});len=lineSplit[0].length;}
else{len=str.length;}
if(len>max){max=len;}
if(max>40){return 54;}}
max*=1.35;return max>6?max:6;}
var excelStrings={"_rels/.rels":'<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'+
'<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'+
'<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/>'+
'</Relationships>',"xl/_rels/workbook.xml.rels":'<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'+
'<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'+
'<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/>'+
'<Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>'+
'</Relationships>',"[Content_Types].xml":'<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'+
'<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">'+
'<Default Extension="xml" ContentType="application/xml" />'+
'<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml" />'+
'<Default Extension="jpeg" ContentType="image/jpeg" />'+
'<Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml" />'+
'<Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml" />'+
'<Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml" />'+
'</Types>',"xl/workbook.xml":'<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'+
'<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">'+
'<fileVersion appName="xl" lastEdited="5" lowestEdited="5" rupBuild="24816"/>'+
'<workbookPr showInkAnnotation="0" autoCompressPictures="0"/>'+
'<bookViews>'+
'<workbookView xWindow="0" yWindow="0" windowWidth="25600" windowHeight="19020" tabRatio="500"/>'+
'</bookViews>'+
'<sheets>'+
'<sheet name="Sheet1" sheetId="1" r:id="rId1"/>'+
'</sheets>'+
'<definedNames/>'+
'</workbook>',"xl/worksheets/sheet1.xml":'<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'+
'<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" mc:Ignorable="x14ac" xmlns:x14ac="http://schemas.microsoft.com/office/spreadsheetml/2009/9/ac">'+
'<sheetData/>'+
'<mergeCells count="0"/>'+
'</worksheet>',"xl/styles.xml":'<?xml version="1.0" encoding="UTF-8"?>'+
'<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" mc:Ignorable="x14ac" xmlns:x14ac="http://schemas.microsoft.com/office/spreadsheetml/2009/9/ac">'+
'<numFmts count="6">'+
'<numFmt numFmtId="164" formatCode="#,##0.00_-\ [$$-45C]"/>'+
'<numFmt numFmtId="165" formatCode="&quot;£&quot;#,##0.00"/>'+
'<numFmt numFmtId="166" formatCode="[$€-2]\ #,##0.00"/>'+
'<numFmt numFmtId="167" formatCode="0.0%"/>'+
'<numFmt numFmtId="168" formatCode="#,##0;(#,##0)"/>'+
'<numFmt numFmtId="169" formatCode="#,##0.00;(#,##0.00)"/>'+
'</numFmts>'+
'<fonts count="5" x14ac:knownFonts="1">'+
'<font>'+
'<sz val="11" />'+
'<name val="Calibri" />'+
'</font>'+
'<font>'+
'<sz val="11" />'+
'<name val="Calibri" />'+
'<color rgb="FFFFFFFF" />'+
'</font>'+
'<font>'+
'<sz val="11" />'+
'<name val="Calibri" />'+
'<b />'+
'</font>'+
'<font>'+
'<sz val="11" />'+
'<name val="Calibri" />'+
'<i />'+
'</font>'+
'<font>'+
'<sz val="11" />'+
'<name val="Calibri" />'+
'<u />'+
'</font>'+
'</fonts>'+
'<fills count="6">'+
'<fill>'+
'<patternFill patternType="none" />'+
'</fill>'+
'<fill>'+
'<patternFill patternType="none" />'+
'</fill>'+
'<fill>'+
'<patternFill patternType="solid">'+
'<fgColor rgb="FFD9D9D9" />'+
'<bgColor indexed="64" />'+
'</patternFill>'+
'</fill>'+
'<fill>'+
'<patternFill patternType="solid">'+
'<fgColor rgb="FFD99795" />'+
'<bgColor indexed="64" />'+
'</patternFill>'+
'</fill>'+
'<fill>'+
'<patternFill patternType="solid">'+
'<fgColor rgb="ffc6efce" />'+
'<bgColor indexed="64" />'+
'</patternFill>'+
'</fill>'+
'<fill>'+
'<patternFill patternType="solid">'+
'<fgColor rgb="ffc6cfef" />'+
'<bgColor indexed="64" />'+
'</patternFill>'+
'</fill>'+
'</fills>'+
'<borders count="2">'+
'<border>'+
'<left />'+
'<right />'+
'<top />'+
'<bottom />'+
'<diagonal />'+
'</border>'+
'<border diagonalUp="false" diagonalDown="false">'+
'<left style="thin">'+
'<color auto="1" />'+
'</left>'+
'<right style="thin">'+
'<color auto="1" />'+
'</right>'+
'<top style="thin">'+
'<color auto="1" />'+
'</top>'+
'<bottom style="thin">'+
'<color auto="1" />'+
'</bottom>'+
'<diagonal />'+
'</border>'+
'</borders>'+
'<cellStyleXfs count="1">'+
'<xf numFmtId="0" fontId="0" fillId="0" borderId="0" />'+
'</cellStyleXfs>'+
'<cellXfs count="68">'+
'<xf numFmtId="0" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>'+
'<xf numFmtId="0" fontId="1" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>'+
'<xf numFmtId="0" fontId="2" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>'+
'<xf numFmtId="0" fontId="3" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>'+
'<xf numFmtId="0" fontId="4" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>'+
'<xf numFmtId="0" fontId="0" fillId="2" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>'+
'<xf numFmtId="0" fontId="1" fillId="2" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>'+
'<xf numFmtId="0" fontId="2" fillId="2" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>'+
'<xf numFmtId="0" fontId="3" fillId="2" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>'+
'<xf numFmtId="0" fontId="4" fillId="2" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>'+
'<xf numFmtId="0" fontId="0" fillId="3" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>'+
'<xf numFmtId="0" fontId="1" fillId="3" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>'+
'<xf numFmtId="0" fontId="2" fillId="3" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>'+
'<xf numFmtId="0" fontId="3" fillId="3" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>'+
'<xf numFmtId="0" fontId="4" fillId="3" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>'+
'<xf numFmtId="0" fontId="0" fillId="4" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>'+
'<xf numFmtId="0" fontId="1" fillId="4" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>'+
'<xf numFmtId="0" fontId="2" fillId="4" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>'+
'<xf numFmtId="0" fontId="3" fillId="4" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>'+
'<xf numFmtId="0" fontId="4" fillId="4" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>'+
'<xf numFmtId="0" fontId="0" fillId="5" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>'+
'<xf numFmtId="0" fontId="1" fillId="5" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>'+
'<xf numFmtId="0" fontId="2" fillId="5" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>'+
'<xf numFmtId="0" fontId="3" fillId="5" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>'+
'<xf numFmtId="0" fontId="4" fillId="5" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>'+
'<xf numFmtId="0" fontId="0" fillId="0" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>'+
'<xf numFmtId="0" fontId="1" fillId="0" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>'+
'<xf numFmtId="0" fontId="2" fillId="0" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>'+
'<xf numFmtId="0" fontId="3" fillId="0" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>'+
'<xf numFmtId="0" fontId="4" fillId="0" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>'+
'<xf numFmtId="0" fontId="0" fillId="2" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>'+
'<xf numFmtId="0" fontId="1" fillId="2" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>'+
'<xf numFmtId="0" fontId="2" fillId="2" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>'+
'<xf numFmtId="0" fontId="3" fillId="2" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>'+
'<xf numFmtId="0" fontId="4" fillId="2" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>'+
'<xf numFmtId="0" fontId="0" fillId="3" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>'+
'<xf numFmtId="0" fontId="1" fillId="3" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>'+
'<xf numFmtId="0" fontId="2" fillId="3" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>'+
'<xf numFmtId="0" fontId="3" fillId="3" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>'+
'<xf numFmtId="0" fontId="4" fillId="3" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>'+
'<xf numFmtId="0" fontId="0" fillId="4" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>'+
'<xf numFmtId="0" fontId="1" fillId="4" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>'+
'<xf numFmtId="0" fontId="2" fillId="4" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>'+
'<xf numFmtId="0" fontId="3" fillId="4" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>'+
'<xf numFmtId="0" fontId="4" fillId="4" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>'+
'<xf numFmtId="0" fontId="0" fillId="5" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>'+
'<xf numFmtId="0" fontId="1" fillId="5" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>'+
'<xf numFmtId="0" fontId="2" fillId="5" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>'+
'<xf numFmtId="0" fontId="3" fillId="5" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>'+
'<xf numFmtId="0" fontId="4" fillId="5" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>'+
'<xf numFmtId="0" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyAlignment="1">'+
'<alignment horizontal="left"/>'+
'</xf>'+
'<xf numFmtId="0" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyAlignment="1">'+
'<alignment horizontal="center"/>'+
'</xf>'+
'<xf numFmtId="0" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyAlignment="1">'+
'<alignment horizontal="right"/>'+
'</xf>'+
'<xf numFmtId="0" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyAlignment="1">'+
'<alignment horizontal="fill"/>'+
'</xf>'+
'<xf numFmtId="0" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyAlignment="1">'+
'<alignment textRotation="90"/>'+
'</xf>'+
'<xf numFmtId="0" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyAlignment="1">'+
'<alignment wrapText="1"/>'+
'</xf>'+
'<xf numFmtId="9"   fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/>'+
'<xf numFmtId="164" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/>'+
'<xf numFmtId="165" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/>'+
'<xf numFmtId="166" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/>'+
'<xf numFmtId="167" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/>'+
'<xf numFmtId="168" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/>'+
'<xf numFmtId="169" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/>'+
'<xf numFmtId="3" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/>'+
'<xf numFmtId="4" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/>'+
'<xf numFmtId="1" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/>'+
'<xf numFmtId="2" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/>'+
'<xf numFmtId="14" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/>'+
'</cellXfs>'+
'<cellStyles count="1">'+
'<cellStyle name="Normal" xfId="0" builtinId="0" />'+
'</cellStyles>'+
'<dxfs count="0" />'+
'<tableStyles count="0" defaultTableStyle="TableStyleMedium9" defaultPivotStyle="PivotStyleMedium4" />'+
'</styleSheet>'};var _excelSpecials=[{match:/^\-?\d+\.\d%$/,style:60,fmt:function(d){return d/100;}},{match:/^\-?\d+\.?\d*%$/,style:56,fmt:function(d){return d/100;}},{match:/^\-?\$[\d,]+.?\d*$/,style:57},{match:/^\-?£[\d,]+.?\d*$/,style:58},{match:/^\-?€[\d,]+.?\d*$/,style:59},{match:/^\-?\d+$/,style:65},{match:/^\-?\d+\.\d{2}$/,style:66},{match:/^\([\d,]+\)$/,style:61,fmt:function(d){return-1*d.replace(/[\(\)]/g,'');}},{match:/^\([\d,]+\.\d{2}\)$/,style:62,fmt:function(d){return-1*d.replace(/[\(\)]/g,'');}},{match:/^\-?[\d,]+$/,style:63},{match:/^\-?[\d,]+\.\d{2}$/,style:64},{match:/^[\d]{4}\-[01][\d]\-[0123][\d]$/,style:67,fmt:function(d){return Math.round(25569+(Date.parse(d)/(86400*1000)));}}];DataTable.ext.buttons.copyHtml5={className:'buttons-copy buttons-html5',text:function(dt){return dt.i18n('buttons.copy','Copy');},action:function(e,dt,button,config){this.processing(true);var that=this;var exportData=_exportData(dt,config);var info=dt.buttons.exportInfo(config);var newline=_newLine(config);var output=exportData.str;var hiddenDiv=$('<div/>').css({height:1,width:1,overflow:'hidden',position:'fixed',top:0,left:0});if(info.title){output=info.title+newline+newline+output;}
if(info.messageTop){output=info.messageTop+newline+newline+output;}
if(info.messageBottom){output=output+newline+newline+info.messageBottom;}
if(config.customize){output=config.customize(output,config,dt);}
var textarea=$('<textarea readonly/>').val(output).appendTo(hiddenDiv);if(document.queryCommandSupported('copy')){hiddenDiv.appendTo(dt.table().container());textarea[0].focus();textarea[0].select();try{var successful=document.execCommand('copy');hiddenDiv.remove();if(successful){dt.buttons.info(dt.i18n('buttons.copyTitle','Copy to clipboard'),dt.i18n('buttons.copySuccess',{1:'Copied one row to clipboard',_:'Copied %d rows to clipboard'},exportData.rows),2000);this.processing(false);return;}}
catch(t){}}
var message=$('<span>'+dt.i18n('buttons.copyKeys','Press <i>ctrl</i> or <i>\u2318</i> + <i>C</i> to copy the table data<br>to your system clipboard.<br><br>'+
'To cancel, click this message or press escape.')+'</span>').append(hiddenDiv);dt.buttons.info(dt.i18n('buttons.copyTitle','Copy to clipboard'),message,0);textarea[0].focus();textarea[0].select();var container=$(message).closest('.dt-button-info');var close=function(){container.off('click.buttons-copy');$(document).off('.buttons-copy');dt.buttons.info(false);};container.on('click.buttons-copy',close);$(document).on('keydown.buttons-copy',function(e){if(e.keyCode===27){close();that.processing(false);}}).on('copy.buttons-copy cut.buttons-copy',function(){close();that.processing(false);});},exportOptions:{},fieldSeparator:'\t',fieldBoundary:'',header:true,footer:false,title:'*',messageTop:'*',messageBottom:'*'};DataTable.ext.buttons.csvHtml5={bom:false,className:'buttons-csv buttons-html5',available:function(){return window.FileReader!==undefined&&window.Blob;},text:function(dt){return dt.i18n('buttons.csv','CSV');},action:function(e,dt,button,config){this.processing(true);var output=_exportData(dt,config).str;var info=dt.buttons.exportInfo(config);var charset=config.charset;if(config.customize){output=config.customize(output,config,dt);}
if(charset!==false){if(!charset){charset=document.characterSet||document.charset;}
if(charset){charset=';charset='+charset;}}
else{charset='';}
if(config.bom){output=String.fromCharCode(0xFEFF)+output;}
_saveAs(new Blob([output],{type:'text/csv'+charset}),info.filename,true);this.processing(false);},filename:'*',extension:'.csv',exportOptions:{},fieldSeparator:',',fieldBoundary:'"',escapeChar:'"',charset:null,header:true,footer:false};DataTable.ext.buttons.excelHtml5={className:'buttons-excel buttons-html5',available:function(){return window.FileReader!==undefined&&_jsZip()!==undefined&&!_isDuffSafari()&&_serialiser;},text:function(dt){return dt.i18n('buttons.excel','Excel');},action:function(e,dt,button,config){this.processing(true);var that=this;var rowPos=0;var dataStartRow,dataEndRow;var getXml=function(type){var str=excelStrings[type];return $.parseXML(str);};var rels=getXml('xl/worksheets/sheet1.xml');var relsGet=rels.getElementsByTagName("sheetData")[0];var xlsx={_rels:{".rels":getXml('_rels/.rels')},xl:{_rels:{"workbook.xml.rels":getXml('xl/_rels/workbook.xml.rels')},"workbook.xml":getXml('xl/workbook.xml'),"styles.xml":getXml('xl/styles.xml'),"worksheets":{"sheet1.xml":rels}},"[Content_Types].xml":getXml('[Content_Types].xml')};var data=dt.buttons.exportData(config.exportOptions);var currentRow,rowNode;var addRow=function(row){currentRow=rowPos+1;rowNode=_createNode(rels,"row",{attr:{r:currentRow}});for(var i=0,ien=row.length;i<ien;i++){var cellId=createCellPos(i)+''+currentRow;var cell=null;if(row[i]===null||row[i]===undefined||row[i]===''){if(config.createEmptyCells===true){row[i]='';}
else{continue;}}
var originalContent=row[i];row[i]=typeof row[i].trim==='function'?row[i].trim():row[i];for(var j=0,jen=_excelSpecials.length;j<jen;j++){var special=_excelSpecials[j];if(row[i].match&&!row[i].match(/^0\d+/)&&row[i].match(special.match)){var val=row[i].replace(/[^\d\.\-]/g,'');if(special.fmt){val=special.fmt(val);}
cell=_createNode(rels,'c',{attr:{r:cellId,s:special.style},children:[_createNode(rels,'v',{text:val})]});break;}}
if(!cell){if(typeof row[i]==='number'||(row[i].match&&row[i].match(/^-?\d+(\.\d+)?([eE]\-?\d+)?$/)&&!row[i].match(/^0\d+/))){cell=_createNode(rels,'c',{attr:{t:'n',r:cellId},children:[_createNode(rels,'v',{text:row[i]})]});}
else{var text=!originalContent.replace?originalContent:originalContent.replace(/[\x00-\x09\x0B\x0C\x0E-\x1F\x7F-\x9F]/g,'');cell=_createNode(rels,'c',{attr:{t:'inlineStr',r:cellId},children:{row:_createNode(rels,'is',{children:{row:_createNode(rels,'t',{text:text,attr:{'xml:space':'preserve'}})}})}});}}
rowNode.appendChild(cell);}
relsGet.appendChild(rowNode);rowPos++;};if(config.customizeData){config.customizeData(data);}
var mergeCells=function(row,colspan){var mergeCells=$('mergeCells',rels);mergeCells[0].appendChild(_createNode(rels,'mergeCell',{attr:{ref:'A'+row+':'+createCellPos(colspan)+row}}));mergeCells.attr('count',parseFloat(mergeCells.attr('count'))+1);$('row:eq('+(row-1)+') c',rels).attr('s','51');};var exportInfo=dt.buttons.exportInfo(config);if(exportInfo.title){addRow([exportInfo.title],rowPos);mergeCells(rowPos,data.header.length-1);}
if(exportInfo.messageTop){addRow([exportInfo.messageTop],rowPos);mergeCells(rowPos,data.header.length-1);}
if(config.header){addRow(data.header,rowPos);$('row:last c',rels).attr('s','2');}
dataStartRow=rowPos;for(var n=0,ie=data.body.length;n<ie;n++){addRow(data.body[n],rowPos);}
dataEndRow=rowPos;if(config.footer&&data.footer){addRow(data.footer,rowPos);$('row:last c',rels).attr('s','2');}
if(exportInfo.messageBottom){addRow([exportInfo.messageBottom],rowPos);mergeCells(rowPos,data.header.length-1);}
var cols=_createNode(rels,'cols');$('worksheet',rels).prepend(cols);for(var i=0,ien=data.header.length;i<ien;i++){cols.appendChild(_createNode(rels,'col',{attr:{min:i+1,max:i+1,width:_excelColWidth(data,i),customWidth:1}}));}
var workbook=xlsx.xl['workbook.xml'];$('sheets sheet',workbook).attr('name',_sheetname(config));if(config.autoFilter){$('mergeCells',rels).before(_createNode(rels,'autoFilter',{attr:{ref:'A'+dataStartRow+':'+createCellPos(data.header.length-1)+dataEndRow}}));$('definedNames',workbook).append(_createNode(workbook,'definedName',{attr:{name:'_xlnm._FilterDatabase',localSheetId:'0',hidden:1},text:_sheetname(config)+'!$A$'+dataStartRow+':'+createCellPos(data.header.length-1)+dataEndRow}));}
if(config.customize){config.customize(xlsx,config,dt);}
if($('mergeCells',rels).children().length===0){$('mergeCells',rels).remove();}
var jszip=_jsZip();var zip=new jszip();var zipConfig={compression:"DEFLATE",type:'blob',mimeType:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'};_addToZip(zip,xlsx);var filename=exportInfo.filename;if(filename>175){filename=filename.substr(0,175);}
if(zip.generateAsync){zip.generateAsync(zipConfig).then(function(blob){_saveAs(blob,filename);that.processing(false);});}
else{_saveAs(zip.generate(zipConfig),filename);this.processing(false);}},filename:'*',extension:'.xlsx',exportOptions:{},header:true,footer:false,title:'*',messageTop:'*',messageBottom:'*',createEmptyCells:false,autoFilter:false,sheetName:''};DataTable.ext.buttons.pdfHtml5={className:'buttons-pdf buttons-html5',available:function(){return window.FileReader!==undefined&&_pdfMake();},text:function(dt){return dt.i18n('buttons.pdf','PDF');},action:function(e,dt,button,config){this.processing(true);var that=this;var data=dt.buttons.exportData(config.exportOptions);var info=dt.buttons.exportInfo(config);var rows=[];if(config.header){rows.push($.map(data.header,function(d){return{text:typeof d==='string'?d:d+'',style:'tableHeader'};}));}
for(var i=0,ien=data.body.length;i<ien;i++){rows.push($.map(data.body[i],function(d){if(d===null||d===undefined){d='';}
return{text:typeof d==='string'?d:d+'',style:i%2?'tableBodyEven':'tableBodyOdd'};}));}
if(config.footer&&data.footer){rows.push($.map(data.footer,function(d){return{text:typeof d==='string'?d:d+'',style:'tableFooter'};}));}
var doc={pageSize:config.pageSize,pageOrientation:config.orientation,content:[{table:{headerRows:1,body:rows},layout:'noBorders'}],styles:{tableHeader:{bold:true,fontSize:11,color:'white',fillColor:'#2d4154',alignment:'center'},tableBodyEven:{},tableBodyOdd:{fillColor:'#f3f3f3'},tableFooter:{bold:true,fontSize:11,color:'white',fillColor:'#2d4154'},title:{alignment:'center',fontSize:15},message:{}},defaultStyle:{fontSize:10}};if(info.messageTop){doc.content.unshift({text:info.messageTop,style:'message',margin:[0,0,0,12]});}
if(info.messageBottom){doc.content.push({text:info.messageBottom,style:'message',margin:[0,0,0,12]});}
if(info.title){doc.content.unshift({text:info.title,style:'title',margin:[0,0,0,12]});}
if(config.customize){config.customize(doc,config,dt);}
var pdf=_pdfMake().createPdf(doc);if(config.download==='open'&&!_isDuffSafari()){pdf.open();}
else{pdf.download(info.filename);}
this.processing(false);},title:'*',filename:'*',extension:'.pdf',exportOptions:{},orientation:'portrait',pageSize:'A4',header:true,footer:false,messageTop:'*',messageBottom:'*',customize:null,download:'download'};return DataTable;}));/*!
* Print button for Buttons and DataTables.
* 2016 SpryMedia Ltd - datatables.net/license
*/(function(factory){if(typeof define==='function'&&define.amd){define(['jquery','datatables.net','datatables.net-buttons'],function($){return factory($,window,document);});}
else if(typeof exports==='object'){module.exports=function(root,$){if(!root){root=window;}
if(!$){$=typeof window!=='undefined'?require('jquery'):require('jquery')(root);}
if(!$.fn.dataTable){require('datatables.net')(root,$);}
if(!$.fn.dataTable.Buttons){require('datatables.net-buttons')(root,$);}
return factory($,root,root.document);};}
else{factory(jQuery,window,document);}}(function($,window,document,undefined){'use strict';var DataTable=$.fn.dataTable;var _link=document.createElement('a');var _styleToAbs=function(el){var url;var clone=$(el).clone()[0];var linkHost;if(clone.nodeName.toLowerCase()==='link'){clone.href=_relToAbs(clone.href);}
return clone.outerHTML;};var _relToAbs=function(href){_link.href=href;var linkHost=_link.host;if(linkHost.indexOf('/')===-1&&_link.pathname.indexOf('/')!==0){linkHost+='/';}
return _link.protocol+"//"+linkHost+_link.pathname+_link.search;};DataTable.ext.buttons.print={className:'buttons-print',text:function(dt){return dt.i18n('buttons.print','Print');},action:function(e,dt,button,config){var data=dt.buttons.exportData($.extend({decodeEntities:false},config.exportOptions));var exportInfo=dt.buttons.exportInfo(config);var columnClasses=dt.columns(config.exportOptions.columns).flatten().map(function(idx){return dt.settings()[0].aoColumns[dt.column(idx).index()].sClass;}).toArray();var addRow=function(d,tag){var str='<tr>';for(var i=0,ien=d.length;i<ien;i++){var dataOut=d[i]===null||d[i]===undefined?'':d[i];var classAttr=columnClasses[i]?'class="'+columnClasses[i]+'"':'';str+='<'+tag+' '+classAttr+'>'+dataOut+'</'+tag+'>';}
return str+'</tr>';};var html='<table class="'+dt.table().node().className+'">';if(config.header){html+='<thead>'+addRow(data.header,'th')+'</thead>';}
html+='<tbody>';for(var i=0,ien=data.body.length;i<ien;i++){html+=addRow(data.body[i],'td');}
html+='</tbody>';if(config.footer&&data.footer){html+='<tfoot>'+addRow(data.footer,'th')+'</tfoot>';}
html+='</table>';var win=window.open('','');if(!win){dt.buttons.info(dt.i18n('buttons.printErrorTitle','Unable to open print view'),dt.i18n('buttons.printErrorMsg','Please allow popups in your browser for this site to be able to view the print view.'),5000);return;}
win.document.close();var head='<title>'+exportInfo.title+'</title>';$('style, link').each(function(){head+=_styleToAbs(this);});try{win.document.head.innerHTML=head;}
catch(e){$(win.document.head).html(head);}
win.document.body.innerHTML='<h1>'+exportInfo.title+'</h1>'+
'<div>'+(exportInfo.messageTop||'')+'</div>'+
html+
'<div>'+(exportInfo.messageBottom||'')+'</div>';$(win.document.body).addClass('dt-print-view');$('img',win.document.body).each(function(i,img){img.setAttribute('src',_relToAbs(img.getAttribute('src')));});if(config.customize){config.customize(win,config,dt);}
var autoPrint=function(){if(config.autoPrint){win.print();win.close();}};if(navigator.userAgent.match(/Trident\/\d.\d/)){autoPrint();}
else{win.setTimeout(autoPrint,1000);}},title:'*',messageTop:'*',messageBottom:'*',exportOptions:{},header:true,footer:false,autoPrint:true,customize:null};return DataTable;}));/*! ColReorder 1.6.1
* ©2010-2022 SpryMedia Ltd - datatables.net/license
*/!function(o){"function"==typeof define&&define.amd?define(["jquery","datatables.net"],function(t){return o(t,window,document)}):"object"==typeof exports?module.exports=function(t,e){return t=t||window,(e=e||("undefined"!=typeof window?require("jquery"):require("jquery")(t))).fn.dataTable||require("datatables.net")(t,e),o(e,0,t.document)}:o(jQuery,window,document)}(function(R,t,s,b){"use strict";var n=R.fn.dataTable;function T(t){for(var e=[],o=0,n=t.length;o<n;o++)e[t[o]]=o;return e}function v(t,e,o){e=t.splice(e,1)[0];t.splice(o,0,e)}function S(t,e,o){for(var n=[],s=0,r=t.childNodes.length;s<r;s++)1==t.childNodes[s].nodeType&&n.push(t.childNodes[s]);e=n[e];null!==o?t.insertBefore(e,n[o]):t.appendChild(e)}R.fn.dataTableExt.oApi.fnColReorder=function(o,t,e,n,s){function r(t,e,o){var n,s;t[e]&&"function"!=typeof t[e]&&(s=(n=t[e].split(".")).shift(),isNaN(+s)||(t[e]=o[+s]+"."+n.join(".")))}var i,a,l,d,f,u,h=o.aoColumns.length;if(t!=e)if(t<0||h<=t)this.oApi._fnLog(o,1,"ColReorder 'from' index is out of bounds: "+t);else if(e<0||h<=e)this.oApi._fnLog(o,1,"ColReorder 'to' index is out of bounds: "+e);else{var c=[];for(p=0,i=h;p<i;p++)c[p]=p;v(c,t,e);var g=T(c);for(p=0,i=o.aaSorting.length;p<i;p++)o.aaSorting[p][0]=g[o.aaSorting[p][0]];if(null!==o.aaSortingFixed)for(p=0,i=o.aaSortingFixed.length;p<i;p++)o.aaSortingFixed[p][0]=g[o.aaSortingFixed[p][0]];for(p=0,i=h;p<i;p++){for(a=0,l=(u=o.aoColumns[p]).aDataSort.length;a<l;a++)u.aDataSort[a]=g[u.aDataSort[a]];u.idx=g[u.idx]}for(R.each(o.aLastSort,function(t,e){o.aLastSort[t].src=g[e.src]}),p=0,i=h;p<i;p++)"number"==typeof(u=o.aoColumns[p]).mData?u.mData=g[u.mData]:R.isPlainObject(u.mData)&&(r(u.mData,"_",g),r(u.mData,"filter",g),r(u.mData,"sort",g),r(u.mData,"type",g));if(o.aoColumns[t].bVisible){for(var m=this.oApi._fnColumnIndexToVisible(o,t),C=null,p=e<t?e:e+1;null===C&&p<h;)C=this.oApi._fnColumnIndexToVisible(o,p),p++;for(p=0,i=(f=o.nTHead.getElementsByTagName("tr")).length;p<i;p++)S(f[p],m,C);if(null!==o.nTFoot)for(p=0,i=(f=o.nTFoot.getElementsByTagName("tr")).length;p<i;p++)S(f[p],m,C);for(p=0,i=o.aoData.length;p<i;p++)null!==o.aoData[p].nTr&&S(o.aoData[p].nTr,m,C)}for(v(o.aoColumns,t,e),p=0,i=h;p<i;p++)o.oApi._fnColumnOptions(o,p,{});for(v(o.aoPreSearchCols,t,e),p=0,i=o.aoData.length;p<i;p++){var _=o.aoData[p],x=_.anCells;if(x)for(v(x,t,e),a=0,d=x.length;a<d;a++)x[a]&&x[a]._DT_CellIndex&&(x[a]._DT_CellIndex.column=a);Array.isArray(_._aData)&&v(_._aData,t,e)}for(p=0,i=o.aoHeader.length;p<i;p++)v(o.aoHeader[p],t,e);if(null!==o.aoFooter)for(p=0,i=o.aoFooter.length;p<i;p++)v(o.aoFooter[p],t,e);for(!s&&s!==b||R.fn.dataTable.Api(o).rows().invalidate("data"),p=0,i=h;p<i;p++)R(o.aoColumns[p].nTh).off(".DT"),this.oApi._fnSortAttachListener(o,o.aoColumns[p].nTh,p);R(o.oInstance).trigger("column-reorder.dt",[o,{from:t,to:e,mapping:g,drop:n,iFrom:t,iTo:e,aiInvertMapping:g}])}};function r(t,e){if((t=new R.fn.dataTable.Api(t).settings()[0])._colReorder)return t._colReorder;!0===e&&(e={});var o=R.fn.dataTable.camelToHungarian;return o&&(o(r.defaults,r.defaults,!0),o(r.defaults,e||{})),this.s={dt:null,enable:null,init:R.extend(!0,{},r.defaults,e),fixed:0,fixedRight:0,reorderCallback:null,mouse:{startX:-1,startY:-1,offsetX:-1,offsetY:-1,target:-1,targetIndex:-1,fromIndex:-1},aoTargets:[]},this.dom={drag:null,pointer:null},this.s.enable=this.s.init.bEnable,this.s.dt=t,(this.s.dt._colReorder=this)._fnConstruct(),this}return R.extend(r.prototype,{fnEnable:function(t){if(!1===t)return fnDisable();this.s.enable=!0},fnDisable:function(){this.s.enable=!1},fnReset:function(){return this._fnOrderColumns(this.fnOrder()),this},fnGetCurrentOrder:function(){return this.fnOrder()},fnOrder:function(t,e){var o=[],n=this.s.dt.aoColumns;if(t===b){for(r=0,i=n.length;r<i;r++)o.push(n[r]._ColReorder_iOrigCol);return o}if(e){for(var s=this.fnOrder(),r=0,i=t.length;r<i;r++)o.push(R.inArray(t[r],s));t=o}return this._fnOrderColumns(T(t)),this},fnTranspose:function(t,e){e=e||"toCurrent";var o=this.fnOrder(),n=this.s.dt.aoColumns;return"toCurrent"===e?Array.isArray(t)?R.map(t,function(t){return R.inArray(t,o)}):R.inArray(t,o):Array.isArray(t)?R.map(t,function(t){return n[t]._ColReorder_iOrigCol}):n[t]._ColReorder_iOrigCol},_fnConstruct:function(){var t,o=this,e=this.s.dt.aoColumns.length,n=this.s.dt.nTable;for(this.s.init.iFixedColumns&&(this.s.fixed=this.s.init.iFixedColumns),this.s.init.iFixedColumnsLeft&&(this.s.fixed=this.s.init.iFixedColumnsLeft),this.s.fixedRight=this.s.init.iFixedColumnsRight||0,this.s.init.fnReorderCallback&&(this.s.reorderCallback=this.s.init.fnReorderCallback),t=0;t<e;t++)t>this.s.fixed-1&&t<e-this.s.fixedRight&&this._fnMouseListener(t,this.s.dt.aoColumns[t].nTh),this.s.dt.aoColumns[t]._ColReorder_iOrigCol=t;this.s.dt.oApi._fnCallbackReg(this.s.dt,"aoStateSaveParams",function(t,e){o._fnStateSave.call(o,e)},"ColReorder_State"),this.s.dt.oApi._fnCallbackReg(this.s.dt,"aoStateLoadParams",function(t,e){o.s.dt._colReorder.fnOrder(e.ColReorder,!0)});var s,r,i=null;this.s.init.aiOrder&&(i=this.s.init.aiOrder.slice()),(i=this.s.dt.oLoadedState&&void 0!==this.s.dt.oLoadedState.ColReorder&&this.s.dt.oLoadedState.ColReorder.length==this.s.dt.aoColumns.length?this.s.dt.oLoadedState.ColReorder:i)?o.s.dt._bInitComplete?(s=T(i),o._fnOrderColumns.call(o,s)):(r=!1,R(n).on("draw.dt.colReorder",function(){var t;o.s.dt._bInitComplete||r||(r=!0,t=T(i),o._fnOrderColumns.call(o,t))})):this._fnSetColumnIndexes(),R(n).on("destroy.dt.colReorder",function(){o.fnReset(),R(n).off("destroy.dt.colReorder draw.dt.colReorder"),R.each(o.s.dt.aoColumns,function(t,e){R(e.nTh).off(".ColReorder"),R(e.nTh).removeAttr("data-column-index")}),o.s.dt._colReorder=null,o.s=null})},_fnOrderColumns:function(t){var e=!1;if(t.length!=this.s.dt.aoColumns.length)this.s.dt.oInstance.oApi._fnLog(this.s.dt,1,"ColReorder - array reorder does not match known number of columns. Skipping.");else{for(var o=0,n=t.length;o<n;o++){var s=R.inArray(o,t);o!=s&&(v(t,s,o),this.s.dt.oInstance.fnColReorder(s,o,!0,!1),e=!0)}this._fnSetColumnIndexes(),e&&(R.fn.dataTable.Api(this.s.dt).rows().invalidate("data"),""===this.s.dt.oScroll.sX&&""===this.s.dt.oScroll.sY||this.s.dt.oInstance.fnAdjustColumnSizing(!1),this.s.dt.oInstance.oApi._fnSaveState(this.s.dt),null!==this.s.reorderCallback&&this.s.reorderCallback.call(this))}},_fnStateSave:function(t){if(null!==this.s){var e,o=this.s.dt.aoColumns;if(t.ColReorder=[],t.aaSorting){for(s=0;s<t.aaSorting.length;s++)t.aaSorting[s][0]=o[t.aaSorting[s][0]]._ColReorder_iOrigCol;for(var n=R.extend(!0,[],t.aoSearchCols),s=0,r=o.length;s<r;s++)e=o[s]._ColReorder_iOrigCol,t.aoSearchCols[e]=n[s],t.abVisCols[e]=o[s].bVisible,t.ColReorder.push(e)}else if(t.order){for(s=0;s<t.order.length;s++)t.order[s][0]=o[t.order[s][0]]._ColReorder_iOrigCol;var i=R.extend(!0,[],t.columns);for(s=0,r=o.length;s<r;s++)e=o[s]._ColReorder_iOrigCol,t.columns[e]=i[s],t.ColReorder.push(e)}}},_fnMouseListener:function(t,e){var o=this;R(e).on("mousedown.ColReorder",function(t){o.s.enable&&1===t.which&&o._fnMouseDown.call(o,t,e)}).on("touchstart.ColReorder",function(t){o.s.enable&&o._fnMouseDown.call(o,t,e)})},_fnMouseDown:function(t,e){var o=this,n=R(t.target).closest("th, td").offset(),e=parseInt(R(e).attr("data-column-index"),10);e!==b&&(this.s.mouse.startX=this._fnCursorPosition(t,"pageX"),this.s.mouse.startY=this._fnCursorPosition(t,"pageY"),this.s.mouse.offsetX=this._fnCursorPosition(t,"pageX")-n.left,this.s.mouse.offsetY=this._fnCursorPosition(t,"pageY")-n.top,this.s.mouse.target=this.s.dt.aoColumns[e].nTh,this.s.mouse.targetIndex=e,this.s.mouse.fromIndex=e,this._fnRegions(),R(s).on("mousemove.ColReorder touchmove.ColReorder",function(t){o._fnMouseMove.call(o,t)}).on("mouseup.ColReorder touchend.ColReorder",function(t){o._fnMouseUp.call(o,t)}))},_fnMouseMove:function(t){var e,o=this;if(null===this.dom.drag){if(Math.pow(Math.pow(this._fnCursorPosition(t,"pageX")-this.s.mouse.startX,2)+Math.pow(this._fnCursorPosition(t,"pageY")-this.s.mouse.startY,2),.5)<5)return;this._fnCreateDragNode()}this.dom.drag.css({left:this._fnCursorPosition(t,"pageX")-this.s.mouse.offsetX,top:this._fnCursorPosition(t,"pageY")-this.s.mouse.offsetY});for(var n=this.s.mouse.toIndex,s=this._fnCursorPosition(t,"pageX"),t=function(){for(var t=o.s.aoTargets.length-1;0<t;t--)if(o.s.aoTargets[t].x!==o.s.aoTargets[t-1].x)return o.s.aoTargets[t]},r=1;r<this.s.aoTargets.length;r++){var i=function(t){for(;0<=t;){if(--t<=0)return null;if(o.s.aoTargets[t+1].x!==o.s.aoTargets[t].x)return o.s.aoTargets[t]}}(r),a=(i=i||function(){for(var t=0;t<o.s.aoTargets.length-1;t++)if(o.s.aoTargets[t].x!==o.s.aoTargets[t+1].x)return o.s.aoTargets[t]}()).x+(this.s.aoTargets[r].x-i.x)/2;if(this._fnIsLtr()){if(s<a){e=i;break}}else if(a<s){e=i;break}}e?(this.dom.pointer.css("left",e.x),this.s.mouse.toIndex=e.to):(this.dom.pointer.css("left",t().x),this.s.mouse.toIndex=t().to),this.s.init.bRealtime&&n!==this.s.mouse.toIndex&&(this.s.dt.oInstance.fnColReorder(this.s.mouse.fromIndex,this.s.mouse.toIndex),this.s.mouse.fromIndex=this.s.mouse.toIndex,""===this.s.dt.oScroll.sX&&""===this.s.dt.oScroll.sY||this.s.dt.oInstance.fnAdjustColumnSizing(!1),this._fnRegions())},_fnMouseUp:function(t){R(s).off(".ColReorder"),null!==this.dom.drag&&(this.dom.drag.remove(),this.dom.pointer.remove(),this.dom.drag=null,this.dom.pointer=null,this.s.dt.oInstance.fnColReorder(this.s.mouse.fromIndex,this.s.mouse.toIndex,!0),this._fnSetColumnIndexes(),""===this.s.dt.oScroll.sX&&""===this.s.dt.oScroll.sY||this.s.dt.oInstance.fnAdjustColumnSizing(!1),this.s.dt.oInstance.oApi._fnSaveState(this.s.dt),null!==this.s.reorderCallback&&this.s.reorderCallback.call(this))},_fnRegions:function(){var t=this.s.dt.aoColumns,n=this._fnIsLtr(),s=(this.s.aoTargets.splice(0,this.s.aoTargets.length),R(this.s.dt.nTable).offset().left),r=[],e=(R.each(t,function(t,e){var o;e.bVisible&&"none"!==e.nTh.style.display?(o=(e=R(e.nTh)).offset().left,n&&(o+=e.outerWidth()),r.push({index:t,bound:o}),s=o):r.push({index:t,bound:s})}),r[0]),t=R(t[e.index].nTh).outerWidth();this.s.aoTargets.push({to:0,x:e.bound-t});for(var o=0;o<r.length;o++){var i=r[o],a=i.index;i.index<this.s.mouse.fromIndex&&a++,this.s.aoTargets.push({to:a,x:i.bound})}0!==this.s.fixedRight&&this.s.aoTargets.splice(this.s.aoTargets.length-this.s.fixedRight),0!==this.s.fixed&&this.s.aoTargets.splice(0,this.s.fixed)},_fnCreateDragNode:function(){var t=""!==this.s.dt.oScroll.sX||""!==this.s.dt.oScroll.sY,e=this.s.dt.aoColumns[this.s.mouse.targetIndex].nTh,o=e.parentNode,n=o.parentNode,s=n.parentNode,r=R(e).clone();this.dom.drag=R(s.cloneNode(!1)).addClass("DTCR_clonedTable").append(R(n.cloneNode(!1)).append(R(o.cloneNode(!1)).append(r[0]))).css({position:"absolute",top:0,left:0,width:R(e).outerWidth(),height:R(e).outerHeight()}).appendTo("body"),this.dom.pointer=R("<div></div>").addClass("DTCR_pointer").css({position:"absolute",top:R(t?R(this.s.dt.nScrollBody).parent():this.s.dt.nTable).offset().top,height:R(t?R(this.s.dt.nScrollBody).parent():this.s.dt.nTable).height()}).appendTo("body")},_fnSetColumnIndexes:function(){R.each(this.s.dt.aoColumns,function(t,e){R(e.nTh).attr("data-column-index",t)})},_fnCursorPosition:function(t,e){return(-1!==t.type.indexOf("touch")?t.originalEvent.touches[0]:t)[e]},_fnIsLtr:function(){return"rtl"!==R(this.s.dt.nTable).css("direction")}}),r.defaults={aiOrder:null,bEnable:!0,bRealtime:!0,iFixedColumnsLeft:0,iFixedColumnsRight:0,fnReorderCallback:null},r.version="1.6.1",R.fn.dataTable.ColReorder=r,R.fn.DataTable.ColReorder=r,"function"==typeof R.fn.dataTable&&"function"==typeof R.fn.dataTableExt.fnVersionCheck&&R.fn.dataTableExt.fnVersionCheck("1.10.8")?R.fn.dataTableExt.aoFeatures.push({fnInit:function(t){var e=t.oInstance;return t._colReorder?e.oApi._fnLog(t,1,"ColReorder attempted to initialise twice. Ignoring second"):(e=(e=t.oInit).colReorder||e.oColReorder||{},new r(t,e)),null},cFeature:"R",sFeature:"ColReorder"}):alert("Warning: ColReorder requires DataTables 1.10.8 or greater - www.datatables.net/download"),R(s).on("preInit.dt.colReorder",function(t,e){var o;"dt"===t.namespace&&(t=e.oInit.colReorder,o=n.defaults.colReorder,(t||o)&&(o=R.extend({},t,o),!1!==t&&new r(e,o)))}),R.fn.dataTable.Api.register("colReorder.reset()",function(){return this.iterator("table",function(t){t._colReorder.fnReset()})}),R.fn.dataTable.Api.register("colReorder.order()",function(e,o){return e?this.iterator("table",function(t){t._colReorder.fnOrder(e,o)}):this.context.length?this.context[0]._colReorder.fnOrder():null}),R.fn.dataTable.Api.register("colReorder.transpose()",function(t,e){return this.context.length&&this.context[0]._colReorder?this.context[0]._colReorder.fnTranspose(t,e):t}),R.fn.dataTable.Api.register("colReorder.move()",function(t,e,o,n){return this.context.length&&(this.context[0]._colReorder.s.dt.oInstance.fnColReorder(t,e,o,n),this.context[0]._colReorder._fnSetColumnIndexes()),this}),R.fn.dataTable.Api.register("colReorder.enable()",function(e){return this.iterator("table",function(t){t._colReorder&&t._colReorder.fnEnable(e)})}),R.fn.dataTable.Api.register("colReorder.disable()",function(){return this.iterator("table",function(t){t._colReorder&&t._colReorder.fnDisable()})}),n});/*! Bootstrap 5 styling wrapper for ColReorder
* ©2018 SpryMedia Ltd - datatables.net/license
*/(function(factory){if(typeof define==='function'&&define.amd){define(['jquery','datatables.net-bs5','datatables.net-colreorder'],function($){return factory($,window,document);});}
else if(typeof exports==='object'){module.exports=function(root,$){if(!root){root=window;}
if(!$){$=typeof window!=='undefined'?require('jquery'):require('jquery')(root);}
if(!$.fn.dataTable){require('datatables.net-bs5')(root,$);}
if(!$.fn.dataTable){require('datatables.net-colreorder')(root,$);}
return factory($,root,root.document);};}
else{factory(jQuery,window,document);}}(function($,window,document,undefined){'use strict';var DataTable=$.fn.dataTable;(function(factory){if(typeof define==='function'&&define.amd){define(['jquery','datatables.net-bs5','datatables.net-colreorder'],function($){return factory($,window,document);});}
else if(typeof exports==='object'){module.exports=function(root,$){if(!root){root=window;}
if(!$||!$.fn.dataTable){$=require('datatables.net-bs5')(root,$).$;}
if(!$.fn.dataTable.ColReorder){require('datatables.net-colreorder')(root,$);}
return factory($,root,root.document);};}
else{factory(jQuery,window,document);}}(function($,window,document,undefined){return $.fn.dataTable;}));return DataTable;}));/*! FixedColumns 4.2.1
* 2019-2022 SpryMedia Ltd - datatables.net/license
*/!function(e){"function"==typeof define&&define.amd?define(["jquery","datatables.net"],function(t){return e(t,window,document)}):"object"==typeof exports?module.exports=function(t,s){return t=t||window,(s=s||("undefined"!=typeof window?require("jquery"):require("jquery")(t))).fn.dataTable||require("datatables.net")(t,s),e(s,0,t.document)}:e(jQuery,window,document)}(function(l,t,s,F){"use strict";var q,i,e,o,r=l.fn.dataTable;function d(t,s){var e=this;if(i&&i.versionCheck&&i.versionCheck("1.10.0"))return t=new i.Api(t),this.classes=q.extend(!0,{},d.classes),this.c=q.extend(!0,{},d.defaults,s),s&&s.left!==F||this.c.leftColumns===F||(this.c.left=this.c.leftColumns),s&&s.right!==F||this.c.rightColumns===F||(this.c.right=this.c.rightColumns),this.s={barWidth:0,dt:t,rtl:"rtl"===q("body").css("direction")},s={bottom:"0px",display:"block",position:"absolute",width:this.s.barWidth+1+"px"},this.dom={leftBottomBlocker:q("<div>").css(s).css("left",0).addClass(this.classes.leftBottomBlocker),leftTopBlocker:q("<div>").css(s).css({left:0,top:0}).addClass(this.classes.leftTopBlocker),rightBottomBlocker:q("<div>").css(s).css("right",0).addClass(this.classes.rightBottomBlocker),rightTopBlocker:q("<div>").css(s).css({right:0,top:0}).addClass(this.classes.rightTopBlocker)},this.s.dt.settings()[0]._bInitComplete?(this._addStyles(),this._setKeyTableListener()):t.one("init.dt",function(){e._addStyles(),e._setKeyTableListener()}),t.on("column-sizing.dt",function(){return e._addStyles()}),t.settings()[0]._fixedColumns=this;throw new Error("StateRestore requires DataTables 1.10 or newer")}function h(t,s){void 0===s&&(s=null);t=new r.Api(t),s=s||t.init().fixedColumns||r.defaults.fixedColumns;new e(t,s)}return d.prototype.left=function(t){return t!==F&&(this.c.left=t,this._addStyles()),this.c.left},d.prototype.right=function(t){return t!==F&&(this.c.right=t,this._addStyles()),this.c.right},d.prototype._addStyles=function(){this.s.dt.settings()[0].oScroll.sY&&(s=q(this.s.dt.table().node()).closest("div.dataTables_scrollBody")[0],e=this.s.dt.settings()[0].oBrowser.barWidth,s.offsetWidth-s.clientWidth>=e?this.s.barWidth=e:this.s.barWidth=0,this.dom.rightTopBlocker.css("width",this.s.barWidth+1),this.dom.leftTopBlocker.css("width",this.s.barWidth+1),this.dom.rightBottomBlocker.css("width",this.s.barWidth+1),this.dom.leftBottomBlocker.css("width",this.s.barWidth+1));for(var t=null,s=this.s.dt.column(0).header(),e=null,i=(null!==s&&(e=(s=q(s)).outerHeight()+1,t=q(s.closest("div.dataTables_scroll")).css("position","relative")),this.s.dt.column(0).footer()),l=null,o=(null!==i&&(l=(i=q(i)).outerHeight(),null===t&&(t=q(i.closest("div.dataTables_scroll")).css("position","relative"))),this.s.dt.columns().data().toArray().length),r=0,d=0,h=q(this.s.dt.table().node()).children("tbody").children("tr"),a=0,n=new Map,c=0;c<o;c++){var f=this.s.dt.column(c);if(0<c&&n.set(c-1,a),f.visible()){var u=q(f.header()),g=q(f.footer());if(c-a<this.c.left){if(q(this.s.dt.table().node()).addClass(this.classes.tableFixedLeft),t.addClass(this.classes.tableFixedLeft),0<c-a)for(var C=c;C+1<o;){if((k=this.s.dt.column(C-1,{page:"current"})).visible()){r+=q(k.nodes()[0]).outerWidth(),d+=k.header()||k.footer()?q(k.header()).outerWidth():0;break}C--}for(var m=0,p=h;m<p.length;m++){var x=p[m];q(q(x).children()[c-a]).css(this._getCellCSS(!1,r,"left")).addClass(this.classes.fixedLeft)}u.css(this._getCellCSS(!0,d,"left")).addClass(this.classes.fixedLeft),g.css(this._getCellCSS(!0,d,"left")).addClass(this.classes.fixedLeft)}else{for(var b=0,v=h;b<v.length;b++){x=v[b];(R=q(q(x).children()[c-a])).hasClass(this.classes.fixedLeft)&&R.css(this._clearCellCSS("left")).removeClass(this.classes.fixedLeft)}u.hasClass(this.classes.fixedLeft)&&u.css(this._clearCellCSS("left")).removeClass(this.classes.fixedLeft),g.hasClass(this.classes.fixedLeft)&&g.css(this._clearCellCSS("left")).removeClass(this.classes.fixedLeft)}}else a++}for(var y=0,B=0,S=0,c=o-1;0<=c;c--)if((f=this.s.dt.column(c)).visible()){var u=q(f.header()),g=q(f.footer()),_=n.get(c);if(_===F&&(_=a),c+S>=o-this.c.right){if(q(this.s.dt.table().node()).addClass(this.classes.tableFixedRight),t.addClass(this.classes.tableFixedRight),c+1+S<o)for(var k,C=c;C+1<o;){if((k=this.s.dt.column(C+1,{page:"current"})).visible()){y+=q(k.nodes()[0]).outerWidth(),B+=k.header()||k.footer()?q(k.header()).outerWidth():0;break}C++}for(var T=0,w=h;T<w.length;T++){x=w[T];q(q(x).children()[c-_]).css(this._getCellCSS(!1,y,"right")).addClass(this.classes.fixedRight)}u.css(this._getCellCSS(!0,B,"right")).addClass(this.classes.fixedRight),g.css(this._getCellCSS(!0,B,"right")).addClass(this.classes.fixedRight)}else{for(var L=0,W=h;L<W.length;L++){var R,x=W[L];(R=q(q(x).children()[c-_])).hasClass(this.classes.fixedRight)&&R.css(this._clearCellCSS("right")).removeClass(this.classes.fixedRight)}u.hasClass(this.classes.fixedRight)&&u.css(this._clearCellCSS("right")).removeClass(this.classes.fixedRight),g.hasClass(this.classes.fixedRight)&&g.css(this._clearCellCSS("right")).removeClass(this.classes.fixedRight)}}else S++;s&&(this.s.rtl?(this.dom.leftTopBlocker.outerHeight(e),t.append(this.dom.leftTopBlocker)):(this.dom.rightTopBlocker.outerHeight(e),t.append(this.dom.rightTopBlocker))),i&&(this.s.rtl?(this.dom.leftBottomBlocker.outerHeight(l),t.append(this.dom.leftBottomBlocker)):(this.dom.rightBottomBlocker.outerHeight(l),t.append(this.dom.rightBottomBlocker)))},d.prototype._getCellCSS=function(t,s,e){return"left"===e?this.s.rtl?{position:"sticky",right:s+"px"}:{left:s+"px",position:"sticky"}:this.s.rtl?{left:s+(t?this.s.barWidth:0)+"px",position:"sticky"}:{position:"sticky",right:s+(t?this.s.barWidth:0)+"px"}},d.prototype._clearCellCSS=function(t){return"left"===t?this.s.rtl?{position:"",right:""}:{left:"",position:""}:this.s.rtl?{left:"",position:""}:{position:"",right:""}},d.prototype._setKeyTableListener=function(){var h=this;this.s.dt.on("key-focus",function(t,s,e){var i,l,o,r=q(e.node()).offset(),d=q(q(h.s.dt.table().node()).closest("div.dataTables_scrollBody"));0<h.c.left&&(i=(l=q(h.s.dt.column(h.c.left-1).header())).offset(),l=l.outerWidth(),r.left<i.left+l&&(o=d.scrollLeft(),d.scrollLeft(o-(i.left+l-r.left)))),0<h.c.right&&(i=h.s.dt.columns().data().toArray().length,l=q(e.node()).outerWidth(),e=q(h.s.dt.column(i-h.c.right).header()).offset(),r.left+l>e.left&&(o=d.scrollLeft(),d.scrollLeft(o-(e.left-(r.left+l)))))}),this.s.dt.on("draw",function(){h._addStyles()}),this.s.dt.on("column-reorder",function(){h._addStyles()}),this.s.dt.on("column-visibility",function(t,s,e,i,l){l&&!s.bDestroying&&setTimeout(function(){h._addStyles()},50)})},d.version="4.2.1",d.classes={fixedLeft:"dtfc-fixed-left",fixedRight:"dtfc-fixed-right",leftBottomBlocker:"dtfc-left-bottom-blocker",leftTopBlocker:"dtfc-left-top-blocker",rightBottomBlocker:"dtfc-right-bottom-blocker",rightTopBlocker:"dtfc-right-top-blocker",tableFixedLeft:"dtfc-has-left",tableFixedRight:"dtfc-has-right"},d.defaults={i18n:{button:"FixedColumns"},left:1,right:0},e=d,i=(q=l).fn.dataTable,l.fn.dataTable.FixedColumns=e,l.fn.DataTable.FixedColumns=e,(o=r.Api.register)("fixedColumns()",function(){return this}),o("fixedColumns().left()",function(t){var s=this.context[0];return t!==F?(s._fixedColumns.left(t),this):s._fixedColumns.left()}),o("fixedColumns().right()",function(t){var s=this.context[0];return t!==F?(s._fixedColumns.right(t),this):s._fixedColumns.right()}),r.ext.buttons.fixedColumns={action:function(t,s,e,i){l(e).attr("active")?(l(e).removeAttr("active").removeClass("active"),s.fixedColumns().left(0),s.fixedColumns().right(0)):(l(e).attr("active","true").addClass("active"),s.fixedColumns().left(i.config.left),s.fixedColumns().right(i.config.right))},config:{left:1,right:0},init:function(t,s,e){t.settings()[0]._fixedColumns===F&&h(t.settings(),e),l(s).attr("active","true").addClass("active"),t.button(s).text(e.text||t.i18n("buttons.fixedColumns",t.settings()[0]._fixedColumns.c.i18n.button))},text:null},l(s).on("plugin-init.dt",function(t,s){"dt"!==t.namespace||!s.oInit.fixedColumns&&!r.defaults.fixedColumns||s._fixedColumns||h(s,null)}),r});/*! Bootstrap 5 integration for DataTables' FixedColumns
* © SpryMedia Ltd - datatables.net/license
*/(function(factory){if(typeof define==='function'&&define.amd){define(['jquery','datatables.net-bs5','datatables.net-fixedcolumns'],function($){return factory($,window,document);});}
else if(typeof exports==='object'){module.exports=function(root,$){if(!root){root=window;}
if(!$){$=typeof window!=='undefined'?require('jquery'):require('jquery')(root);}
if(!$.fn.dataTable){require('datatables.net-bs5')(root,$);}
if(!$.fn.dataTable){require('datatables.net-fixedcolumns')(root,$);}
return factory($,root,root.document);};}
else{factory(jQuery,window,document);}}(function($,window,document,undefined){'use strict';var DataTable=$.fn.dataTable;return DataTable;}));/*! FixedHeader 3.3.1
* ©2009-2022 SpryMedia Ltd - datatables.net/license
*/!function(o){"function"==typeof define&&define.amd?define(["jquery","datatables.net"],function(t){return o(t,window,document)}):"object"==typeof exports?module.exports=function(t,e){return t=t||window,(e=e||("undefined"!=typeof window?require("jquery"):require("jquery")(t))).fn.dataTable||require("datatables.net")(t,e),o(e,t,t.document)}:o(jQuery,window,document)}(function(m,H,x,v){"use strict";function s(t,e){if(!(this instanceof s))throw"FixedHeader must be initialised with the 'new' keyword.";if(!0===e&&(e={}),t=new r.Api(t),this.c=m.extend(!0,{},s.defaults,e),this.s={dt:t,position:{theadTop:0,tbodyTop:0,tfootTop:0,tfootBottom:0,width:0,left:0,tfootHeight:0,theadHeight:0,windowHeight:m(H).height(),visible:!0},headerMode:null,footerMode:null,autoWidth:t.settings()[0].oFeatures.bAutoWidth,namespace:".dtfc"+o++,scrollLeft:{header:-1,footer:-1},enable:!0},this.dom={floatingHeader:null,thead:m(t.table().header()),tbody:m(t.table().body()),tfoot:m(t.table().footer()),header:{host:null,floating:null,floatingParent:m('<div class="dtfh-floatingparent">'),placeholder:null},footer:{host:null,floating:null,floatingParent:m('<div class="dtfh-floatingparent">'),placeholder:null}},this.dom.header.host=this.dom.thead.parent(),this.dom.footer.host=this.dom.tfoot.parent(),(e=t.settings()[0])._fixedHeader)throw"FixedHeader already initialised on table "+e.nTable.id;(e._fixedHeader=this)._constructor()}var r=m.fn.dataTable,o=0;return m.extend(s.prototype,{destroy:function(){var t=this.dom;this.s.dt.off(".dtfc"),m(H).off(this.s.namespace),t.header.rightBlocker&&t.header.rightBlocker.remove(),t.header.leftBlocker&&t.header.leftBlocker.remove(),t.footer.rightBlocker&&t.footer.rightBlocker.remove(),t.footer.leftBlocker&&t.footer.leftBlocker.remove(),this.c.header&&this._modeChange("in-place","header",!0),this.c.footer&&t.tfoot.length&&this._modeChange("in-place","footer",!0)},enable:function(t,e){this.s.enable=t,!e&&e!==v||(this._positions(),this._scroll(!0))},enabled:function(){return this.s.enable},headerOffset:function(t){return t!==v&&(this.c.headerOffset=t,this.update()),this.c.headerOffset},footerOffset:function(t){return t!==v&&(this.c.footerOffset=t,this.update()),this.c.footerOffset},update:function(t){var e;this.s.enable&&(e=this.s.dt.table().node(),m(e).is(":visible")?this.enable(!0,!1):this.enable(!1,!1),0!==m(e).children("thead").length&&(this._positions(),this._scroll(t===v||t)))},_constructor:function(){var o=this,i=this.s.dt,t=(m(H).on("scroll"+this.s.namespace,function(){o._scroll()}).on("resize"+this.s.namespace,r.util.throttle(function(){o.s.position.windowHeight=m(H).height(),o.update()},50)),m(".fh-fixedHeader")),t=(!this.c.headerOffset&&t.length&&(this.c.headerOffset=t.outerHeight()),m(".fh-fixedFooter"));!this.c.footerOffset&&t.length&&(this.c.footerOffset=t.outerHeight()),i.on("column-reorder.dt.dtfc column-visibility.dt.dtfc column-sizing.dt.dtfc responsive-display.dt.dtfc",function(t,e){o.update()}).on("draw.dt.dtfc",function(t,e){o.update(e!==i.settings()[0])}),i.on("destroy.dtfc",function(){o.destroy()}),this._positions(),this._scroll()},_clone:function(t,e){var o,i,s,r,n=this,d=this.s.dt,a=this.dom[t],f="header"===t?this.dom.thead:this.dom.tfoot;"footer"===t&&this._scrollEnabled()||(!e&&a.floating?a.floating.removeClass("fixedHeader-floating fixedHeader-locked"):(e=m(x).scrollLeft(),o=m(x).scrollTop(),a.floating&&(null!==a.placeholder&&a.placeholder.remove(),this._unsize(t),a.floating.children().detach(),a.floating.remove()),i=m(d.table().node()),s=m(i.parent()),r=this._scrollEnabled(),a.floating=m(d.table().node().cloneNode(!1)).attr("aria-hidden","true").css({"table-layout":"fixed",top:0,left:0}).removeAttr("id").append(f),a.floatingParent.css({width:s.width(),overflow:"hidden",height:"fit-content",position:"fixed",left:r?i.offset().left+s.scrollLeft():0}).css("header"===t?{top:this.c.headerOffset,bottom:""}:{top:"",bottom:this.c.footerOffset}).addClass("footer"===t?"dtfh-floatingparentfoot":"dtfh-floatingparenthead").append(a.floating).appendTo("body"),this._stickyPosition(a.floating,"-"),(d=function(){var t=s.scrollLeft();n.s.scrollLeft={footer:t,header:t},a.floatingParent.scrollLeft(n.s.scrollLeft.header)})(),s.off("scroll.dtfh").on("scroll.dtfh",d),a.placeholder=f.clone(!1),a.placeholder.find("*[id]").removeAttr("id"),a.host.prepend(a.placeholder),this._matchWidths(a.placeholder,a.floating),m(x).scrollTop(o).scrollLeft(e)))},_stickyPosition:function(t,i){var s,r;this._scrollEnabled()&&(r="rtl"===m((s=this).s.dt.table().node()).css("direction"),t.find("th").each(function(){var t,e,o;"sticky"===m(this).css("position")&&(t=m(this).css("right"),e=m(this).css("left"),"auto"===t||r?"auto"!==e&&r&&(o=+e.replace(/px/g,"")+("-"===i?-1:1)*s.s.dt.settings()[0].oBrowser.barWidth,m(this).css("left",0<o?o:0)):(o=+t.replace(/px/g,"")+("-"===i?-1:1)*s.s.dt.settings()[0].oBrowser.barWidth,m(this).css("right",0<o?o:0)))}))},_matchWidths:function(e,o){function t(t){return m(t,e).map(function(){return+m(this).css("width").replace(/[^\d\.]/g,"")}).toArray()}function i(t,e){m(t,o).each(function(t){m(this).css({width:e[t],minWidth:e[t]})})}var s=t("th"),r=t("td");i("th",s),i("td",r)},_unsize:function(t){var e=this.dom[t].floating;e&&("footer"===t||"header"===t&&!this.s.autoWidth)?m("th, td",e).css({width:"",minWidth:""}):e&&"header"===t&&m("th, td",e).css("min-width","")},_horizontal:function(t,e){var o,i=this.dom[t],s=(this.s.position,this.s.scrollLeft);i.floating&&s[t]!==e&&(this._scrollEnabled()&&(o=m(m(this.s.dt.table().node()).parent()).scrollLeft(),i.floating.scrollLeft(o),i.floatingParent.scrollLeft(o)),s[t]=e)},_modeChange:function(t,e,o){this.s.dt;var i,s,r,n,d,a,f,h=this.dom[e],l=this.s.position,c=this._scrollEnabled();"footer"===e&&c||(i=function(o){h.floating.attr("style",function(t,e){return(e||"")+"width: "+o+"px !important;"}),c||h.floatingParent.attr("style",function(t,e){return(e||"")+"width: "+o+"px !important;"})},n=this.dom["footer"===e?"tfoot":"thead"],s=m.contains(n[0],x.activeElement)?x.activeElement:null,d=m(m(this.s.dt.table().node()).parent()),"in-place"===t?(h.placeholder&&(h.placeholder.remove(),h.placeholder=null),this._unsize(e),"header"===e?h.host.prepend(n):h.host.append(n),h.floating&&(h.floating.remove(),h.floating=null,this._stickyPosition(h.host,"+")),h.floatingParent&&h.floatingParent.remove(),m(m(h.host.parent()).parent()).scrollLeft(d.scrollLeft())):"in"===t?(this._clone(e,o),n=d.offset(),f=(r=m(x).scrollTop())+m(H).height(),a=c?n.top:l.tbodyTop,n=c?n.top+d.outerHeight():l.tfootTop,d="footer"===e?f<a?l.tfootHeight:a+l.tfootHeight-f:r+this.c.headerOffset+l.theadHeight-n,a="header"===e?"top":"bottom",f=this.c[e+"Offset"]-(0<d?d:0),h.floating.addClass("fixedHeader-floating"),h.floatingParent.css(a,f).css({left:l.left,height:"header"===e?l.theadHeight:l.tfootHeight,"z-index":2}).append(h.floating),i(l.width),"footer"===e&&h.floating.css("top","")):"below"===t?(this._clone(e,o),h.floating.addClass("fixedHeader-locked"),h.floatingParent.css({position:"absolute",top:l.tfootTop-l.theadHeight,left:l.left+"px"}),i(l.width)):"above"===t&&(this._clone(e,o),h.floating.addClass("fixedHeader-locked"),h.floatingParent.css({position:"absolute",top:l.tbodyTop,left:l.left+"px"}),i(l.width)),s&&s!==x.activeElement&&setTimeout(function(){s.focus()},10),this.s.scrollLeft.header=-1,this.s.scrollLeft.footer=-1,this.s[e+"Mode"]=t)},_positions:function(){var t=this.s.dt,e=t.table(),o=this.s.position,i=this.dom,e=m(e.node()),s=this._scrollEnabled(),r=m(t.table().header()),t=m(t.table().footer()),i=i.tbody,n=e.parent();o.visible=e.is(":visible"),o.width=e.outerWidth(),o.left=e.offset().left,o.theadTop=r.offset().top,o.tbodyTop=(s?n:i).offset().top,o.tbodyHeight=(s?n:i).outerHeight(),o.theadHeight=r.outerHeight(),o.theadBottom=o.theadTop+o.theadHeight,t.length?(o.tfootTop=o.tbodyTop+o.tbodyHeight,o.tfootBottom=o.tfootTop+t.outerHeight(),o.tfootHeight=t.outerHeight()):(o.tfootTop=o.tbodyTop+i.outerHeight(),o.tfootBottom=o.tfootTop,o.tfootHeight=o.tfootTop)},_scroll:function(t){var e,o,i,s,r,n,d,a,f,h,l,c,p,u,g,b;this.s.dt.settings()[0].bDestroying||(e=this._scrollEnabled(),o=(h=m(this.s.dt.table().node()).parent()).offset(),c=h.outerHeight(),i=m(x).scrollLeft(),s=m(x).scrollTop(),a=(l=m(H).height())+s,p=this.s.position,b=e?o.top:p.tbodyTop,n=(e?o:p).left,c=e?o.top+c:p.tfootTop,d=e?h.outerWidth():p.tbodyWidth,a=s+l,this.c.header&&(!this.s.enable||!p.visible||s+this.c.headerOffset+p.theadHeight<=b?f="in-place":s+this.c.headerOffset+p.theadHeight>b&&s+this.c.headerOffset+p.theadHeight<c?(f="in",h=m(m(this.s.dt.table().node()).parent()),s+this.c.headerOffset+p.theadHeight>c||this.dom.header.floatingParent===v?t=!0:this.dom.header.floatingParent.css({top:this.c.headerOffset,position:"fixed"}).append(this.dom.header.floating)):f="below",!t&&f===this.s.headerMode||this._modeChange(f,"header",t),this._horizontal("header",i)),u={offset:{top:0,left:0},height:0},g={offset:{top:0,left:0},height:0},this.c.footer&&this.dom.tfoot.length&&(!this.s.enable||!p.visible||p.tfootBottom+this.c.footerOffset<=a?r="in-place":c+p.tfootHeight+this.c.footerOffset>a&&b+this.c.footerOffset<a?(r="in",t=!0):r="above",!t&&r===this.s.footerMode||this._modeChange(r,"footer",t),this._horizontal("footer",i),l=function(t){return{offset:t.offset(),height:t.outerHeight()}},u=this.dom.header.floating?l(this.dom.header.floating):l(this.dom.thead),g=this.dom.footer.floating?l(this.dom.footer.floating):l(this.dom.tfoot),e&&g.offset.top>s&&(p=a+((c=s-o.top)>-u.height?c:0)-(u.offset.top+(c<-u.height?u.height:0)+g.height),h.outerHeight(p=p<0?0:p),Math.round(h.outerHeight())>=Math.round(p)?m(this.dom.tfoot.parent()).addClass("fixedHeader-floating"):m(this.dom.tfoot.parent()).removeClass("fixedHeader-floating"))),this.dom.header.floating&&this.dom.header.floatingParent.css("left",n-i),this.dom.footer.floating&&this.dom.footer.floatingParent.css("left",n-i),this.s.dt.settings()[0]._fixedColumns!==v&&(this.dom.header.rightBlocker=(b=function(t,e,o){var i;return null!==(o=o===v?0===(i=m("div.dtfc-"+t+"-"+e+"-blocker")).length?null:i.clone().css("z-index",1):o)&&("in"===f||"below"===f?o.appendTo("body").css({top:("top"===e?u:g).offset.top,left:"right"===t?n+d-o.width():n}):o.detach()),o})("right","top",this.dom.header.rightBlocker),this.dom.header.leftBlocker=b("left","top",this.dom.header.leftBlocker),this.dom.footer.rightBlocker=b("right","bottom",this.dom.footer.rightBlocker),this.dom.footer.leftBlocker=b("left","bottom",this.dom.footer.leftBlocker)))},_scrollEnabled:function(){var t=this.s.dt.settings()[0].oScroll;return""!==t.sY||""!==t.sX}}),s.version="3.3.1",s.defaults={header:!0,footer:!1,headerOffset:0,footerOffset:0},m.fn.dataTable.FixedHeader=s,m.fn.DataTable.FixedHeader=s,m(x).on("init.dt.dtfh",function(t,e,o){var i;"dt"===t.namespace&&(t=e.oInit.fixedHeader,i=r.defaults.fixedHeader,!t&&!i||e._fixedHeader||(i=m.extend({},i,t),!1!==t&&new s(e,i)))}),r.Api.register("fixedHeader()",function(){}),r.Api.register("fixedHeader.adjust()",function(){return this.iterator("table",function(t){t=t._fixedHeader;t&&t.update()})}),r.Api.register("fixedHeader.enable()",function(e){return this.iterator("table",function(t){t=t._fixedHeader;e=e===v||e,t&&e!==t.enabled()&&t.enable(e)})}),r.Api.register("fixedHeader.enabled()",function(){if(this.context.length){var t=this.context[0]._fixedHeader;if(t)return t.enabled()}return!1}),r.Api.register("fixedHeader.disable()",function(){return this.iterator("table",function(t){t=t._fixedHeader;t&&t.enabled()&&t.enable(!1)})}),m.each(["header","footer"],function(t,o){r.Api.register("fixedHeader."+o+"Offset()",function(e){var t=this.context;return e===v?t.length&&t[0]._fixedHeader?t[0]._fixedHeader[o+"Offset"]():v:this.iterator("table",function(t){t=t._fixedHeader;t&&t[o+"Offset"](e)})})}),r});/*! Bootstrap 5 styling wrapper for FixedHeader
* © SpryMedia Ltd - datatables.net/license
*/(function(factory){if(typeof define==='function'&&define.amd){define(['jquery','datatables.net-bs5','datatables.net-fixedheader'],function($){return factory($,window,document);});}
else if(typeof exports==='object'){module.exports=function(root,$){if(!root){root=window;}
if(!$){$=typeof window!=='undefined'?require('jquery'):require('jquery')(root);}
if(!$.fn.dataTable){require('datatables.net-bs5')(root,$);}
if(!$.fn.dataTable){require('datatables.net-fixedheader')(root,$);}
return factory($,root,root.document);};}
else{factory(jQuery,window,document);}}(function($,window,document,undefined){'use strict';var DataTable=$.fn.dataTable;return DataTable;}));/*! Responsive 2.4.0
* 2014-2022 SpryMedia Ltd - datatables.net/license
*/!function(n){"function"==typeof define&&define.amd?define(["jquery","datatables.net"],function(e){return n(e,window,document)}):"object"==typeof exports?module.exports=function(e,t){return e=e||window,(t=t||("undefined"!=typeof window?require("jquery"):require("jquery")(e))).fn.dataTable||require("datatables.net")(e,t),n(t,e,e.document)}:n(jQuery,window,document)}(function(f,m,o,h){"use strict";function d(e,t){if(!r.versionCheck||!r.versionCheck("1.10.10"))throw"DataTables Responsive requires DataTables 1.10.10 or newer";this.s={childNodeStore:{},columns:[],current:[],dt:new r.Api(e)},this.s.dt.settings()[0].responsive||(t&&"string"==typeof t.details?t.details={type:t.details}:t&&!1===t.details?t.details={type:!1}:t&&!0===t.details&&(t.details={type:"inline"}),this.c=f.extend(!0,{},d.defaults,r.defaults.responsive,t),(e.responsive=this)._constructor())}var r=f.fn.dataTable,e=(f.extend(d.prototype,{_constructor:function(){var s=this,i=this.s.dt,e=i.settings()[0],t=f(m).innerWidth(),e=(i.settings()[0]._responsive=this,f(m).on("resize.dtr orientationchange.dtr",r.util.throttle(function(){var e=f(m).innerWidth();e!==t&&(s._resize(),t=e)})),e.oApi._fnCallbackReg(e,"aoRowCreatedCallback",function(e,t,n){-1!==f.inArray(!1,s.s.current)&&f(">td, >th",e).each(function(e){e=i.column.index("toData",e);!1===s.s.current[e]&&f(this).css("display","none")})}),i.on("destroy.dtr",function(){i.off(".dtr"),f(i.table().body()).off(".dtr"),f(m).off("resize.dtr orientationchange.dtr"),i.cells(".dtr-control").nodes().to$().removeClass("dtr-control"),f.each(s.s.current,function(e,t){!1===t&&s._setColumnVis(e,!0)})}),this.c.breakpoints.sort(function(e,t){return e.width<t.width?1:e.width>t.width?-1:0}),this._classLogic(),this._resizeAuto(),this.c.details);!1!==e.type&&(s._detailsInit(),i.on("column-visibility.dtr",function(){s._timer&&clearTimeout(s._timer),s._timer=setTimeout(function(){s._timer=null,s._classLogic(),s._resizeAuto(),s._resize(!0),s._redrawChildren()},100)}),i.on("draw.dtr",function(){s._redrawChildren()}),f(i.table().node()).addClass("dtr-"+e.type)),i.on("column-reorder.dtr",function(e,t,n){s._classLogic(),s._resizeAuto(),s._resize(!0)}),i.on("column-sizing.dtr",function(){s._resizeAuto(),s._resize()}),i.on("column-calc.dt",function(e,t){for(var n=s.s.current,i=0;i<n.length;i++){var r=t.visible.indexOf(i);!1===n[i]&&0<=r&&t.visible.splice(r,1)}}),i.on("preXhr.dtr",function(){var e=[];i.rows().every(function(){this.child.isShown()&&e.push(this.id(!0))}),i.one("draw.dtr",function(){s._resizeAuto(),s._resize(),i.rows(e).every(function(){s._detailsDisplay(this,!1)})})}),i.on("draw.dtr",function(){s._controlClass()}).on("init.dtr",function(e,t,n){"dt"===e.namespace&&(s._resizeAuto(),s._resize(),f.inArray(!1,s.s.current)&&i.columns.adjust())}),this._resize()},_childNodes:function(e,t,n){var i=t+"-"+n;if(this.s.childNodeStore[i])return this.s.childNodeStore[i];for(var r=[],s=e.cell(t,n).node().childNodes,o=0,d=s.length;o<d;o++)r.push(s[o]);return this.s.childNodeStore[i]=r},_childNodesRestore:function(e,t,n){var i=t+"-"+n;if(this.s.childNodeStore[i]){for(var r=e.cell(t,n).node(),s=this.s.childNodeStore[i][0].parentNode.childNodes,o=[],d=0,a=s.length;d<a;d++)o.push(s[d]);for(var l=0,c=o.length;l<c;l++)r.appendChild(o[l]);this.s.childNodeStore[i]=h}},_columnsVisiblity:function(n){for(var i=this.s.dt,e=this.s.columns,t=e.map(function(e,t){return{columnIdx:t,priority:e.priority}}).sort(function(e,t){return e.priority!==t.priority?e.priority-t.priority:e.columnIdx-t.columnIdx}),r=f.map(e,function(e,t){return!1===i.column(t).visible()?"not-visible":(!e.auto||null!==e.minWidth)&&(!0===e.auto?"-":-1!==f.inArray(n,e.includeIn))}),s=0,o=0,d=r.length;o<d;o++)!0===r[o]&&(s+=e[o].minWidth);var a=i.settings()[0].oScroll,a=a.sY||a.sX?a.iBarWidth:0,l=i.table().container().offsetWidth-a-s;for(o=0,d=r.length;o<d;o++)e[o].control&&(l-=e[o].minWidth);var c=!1;for(o=0,d=t.length;o<d;o++){var u=t[o].columnIdx;"-"===r[u]&&!e[u].control&&e[u].minWidth&&(c||l-e[u].minWidth<0?r[u]=!(c=!0):r[u]=!0,l-=e[u].minWidth)}var h=!1;for(o=0,d=e.length;o<d;o++)if(!e[o].control&&!e[o].never&&!1===r[o]){h=!0;break}for(o=0,d=e.length;o<d;o++)e[o].control&&(r[o]=h),"not-visible"===r[o]&&(r[o]=!1);return-1===f.inArray(!0,r)&&(r[0]=!0),r},_classLogic:function(){function d(e,t,n,i){var r,s,o;if(n){if("max-"===n)for(r=a._find(t).width,s=0,o=l.length;s<o;s++)l[s].width<=r&&u(e,l[s].name);else if("min-"===n)for(r=a._find(t).width,s=0,o=l.length;s<o;s++)l[s].width>=r&&u(e,l[s].name);else if("not-"===n)for(s=0,o=l.length;s<o;s++)-1===l[s].name.indexOf(i)&&u(e,l[s].name)}else c[e].includeIn.push(t)}var a=this,l=this.c.breakpoints,i=this.s.dt,c=i.columns().eq(0).map(function(e){var t=this.column(e),n=t.header().className,e=i.settings()[0].aoColumns[e].responsivePriority,t=t.header().getAttribute("data-priority");return e===h&&(e=t===h||null===t?1e4:+t),{className:n,includeIn:[],auto:!1,control:!1,never:!!n.match(/\b(dtr\-)?never\b/),priority:e}}),u=function(e,t){e=c[e].includeIn;-1===f.inArray(t,e)&&e.push(t)};c.each(function(e,r){for(var t=e.className.split(" "),s=!1,n=0,i=t.length;n<i;n++){var o=t[n].trim();if("all"===o||"dtr-all"===o)return s=!0,void(e.includeIn=f.map(l,function(e){return e.name}));if("none"===o||"dtr-none"===o||e.never)return void(s=!0);if("control"===o||"dtr-control"===o)return s=!0,void(e.control=!0);f.each(l,function(e,t){var n=t.name.split("-"),i=new RegExp("(min\\-|max\\-|not\\-)?("+n[0]+")(\\-[_a-zA-Z0-9])?"),i=o.match(i);i&&(s=!0,i[2]===n[0]&&i[3]==="-"+n[1]?d(r,t.name,i[1],i[2]+i[3]):i[2]!==n[0]||i[3]||d(r,t.name,i[1],i[2]))})}s||(e.auto=!0)}),this.s.columns=c},_controlClass:function(){var e,t,n;"inline"===this.c.details.type&&(e=this.s.dt,t=this.s.current,n=f.inArray(!0,t),e.cells(null,function(e){return e!==n},{page:"current"}).nodes().to$().filter(".dtr-control").removeClass("dtr-control"),e.cells(null,n,{page:"current"}).nodes().to$().addClass("dtr-control"))},_detailsDisplay:function(e,t){var n,i=this,r=this.s.dt,s=this.c.details;s&&!1!==s.type&&(n="string"==typeof s.renderer?d.renderer[s.renderer]():s.renderer,!0!==(s=s.display(e,t,function(){return n.call(i,r,e[0],i._detailsObj(e[0]))}))&&!1!==s||f(r.table().node()).triggerHandler("responsive-display.dt",[r,e,s,t]))},_detailsInit:function(){var n=this,i=this.s.dt,e=this.c.details,r=("inline"===e.type&&(e.target="td.dtr-control, th.dtr-control"),i.on("draw.dtr",function(){n._tabIndexes()}),n._tabIndexes(),f(i.table().body()).on("keyup.dtr","td, th",function(e){13===e.keyCode&&f(this).data("dtr-keyboard")&&f(this).click()}),e.target),e="string"==typeof r?r:"td, th";r===h&&null===r||f(i.table().body()).on("click.dtr mousedown.dtr mouseup.dtr",e,function(e){if(f(i.table().node()).hasClass("collapsed")&&-1!==f.inArray(f(this).closest("tr").get(0),i.rows().nodes().toArray())){if("number"==typeof r){var t=r<0?i.columns().eq(0).length+r:r;if(i.cell(this).index().column!==t)return}t=i.row(f(this).closest("tr"));"click"===e.type?n._detailsDisplay(t,!1):"mousedown"===e.type?f(this).css("outline","none"):"mouseup"===e.type&&f(this).trigger("blur").css("outline","")}})},_detailsObj:function(n){var i=this,r=this.s.dt;return f.map(this.s.columns,function(e,t){if(!e.never&&!e.control)return{className:(e=r.settings()[0].aoColumns[t]).sClass,columnIndex:t,data:r.cell(n,t).render(i.c.orthogonal),hidden:r.column(t).visible()&&!i.s.current[t],rowIndex:n,title:null!==e.sTitle?e.sTitle:f(r.column(t).header()).text()}})},_find:function(e){for(var t=this.c.breakpoints,n=0,i=t.length;n<i;n++)if(t[n].name===e)return t[n]},_redrawChildren:function(){var n=this,i=this.s.dt;i.rows({page:"current"}).iterator("row",function(e,t){i.row(t);n._detailsDisplay(i.row(t),!0)})},_resize:function(n){for(var e,i=this,t=this.s.dt,r=f(m).innerWidth(),s=this.c.breakpoints,o=s[0].name,d=this.s.columns,a=this.s.current.slice(),l=s.length-1;0<=l;l--)if(r<=s[l].width){o=s[l].name;break}var c=this._columnsVisiblity(o),u=(this.s.current=c,!1);for(l=0,e=d.length;l<e;l++)if(!1===c[l]&&!d[l].never&&!d[l].control&&!1==!t.column(l).visible()){u=!0;break}f(t.table().node()).toggleClass("collapsed",u);var h=!1,p=0;t.columns().eq(0).each(function(e,t){!0===c[t]&&p++,!n&&c[t]===a[t]||(h=!0,i._setColumnVis(e,c[t]))}),this._redrawChildren(),h&&(f(t.table().node()).trigger("responsive-resize.dt",[t,this.s.current]),0===t.page.info().recordsDisplay&&f("td",t.table().body()).eq(0).attr("colspan",p)),i._controlClass()},_resizeAuto:function(){var e,t,n,i,r,s=this.s.dt,o=this.s.columns,d=this;this.c.auto&&-1!==f.inArray(!0,f.map(o,function(e){return e.auto}))&&(f.isEmptyObject(this.s.childNodeStore)||f.each(this.s.childNodeStore,function(e){e=e.split("-");d._childNodesRestore(s,+e[0],+e[1])}),s.table().node().offsetWidth,s.columns,e=s.table().node().cloneNode(!1),t=f(s.table().header().cloneNode(!1)).appendTo(e),i=f(s.table().body()).clone(!1,!1).empty().appendTo(e),e.style.width="auto",n=s.columns().header().filter(function(e){return s.column(e).visible()}).to$().clone(!1).css("display","table-cell").css("width","auto").css("min-width",0),f(i).append(f(s.rows({page:"current"}).nodes()).clone(!1)).find("th, td").css("display",""),(i=s.table().footer())&&(i=f(i.cloneNode(!1)).appendTo(e),r=s.columns().footer().filter(function(e){return s.column(e).visible()}).to$().clone(!1).css("display","table-cell"),f("<tr/>").append(r).appendTo(i)),f("<tr/>").append(n).appendTo(t),"inline"===this.c.details.type&&f(e).addClass("dtr-inline collapsed"),f(e).find("[name]").removeAttr("name"),f(e).css("position","relative"),(r=f("<div/>").css({width:1,height:1,overflow:"hidden",clear:"both"}).append(e)).insertBefore(s.table().node()),n.each(function(e){e=s.column.index("fromVisible",e);o[e].minWidth=this.offsetWidth||0}),r.remove())},_responsiveOnlyHidden:function(){var n=this.s.dt;return f.map(this.s.current,function(e,t){return!1===n.column(t).visible()||e})},_setColumnVis:function(e,t){var n=this,i=this.s.dt,r=t?"":"none";f(i.column(e).header()).css("display",r).toggleClass("dtr-hidden",!t),f(i.column(e).footer()).css("display",r).toggleClass("dtr-hidden",!t),i.column(e).nodes().to$().css("display",r).toggleClass("dtr-hidden",!t),f.isEmptyObject(this.s.childNodeStore)||i.cells(null,e).indexes().each(function(e){n._childNodesRestore(i,e.row,e.column)})},_tabIndexes:function(){var e=this.s.dt,t=e.cells({page:"current"}).nodes().to$(),n=e.settings()[0],i=this.c.details.target;t.filter("[data-dtr-keyboard]").removeData("[data-dtr-keyboard]"),("number"==typeof i?e.cells(null,i,{page:"current"}).nodes().to$():f(i="td:first-child, th:first-child"===i?">td:first-child, >th:first-child":i,e.rows({page:"current"}).nodes())).attr("tabIndex",n.iTabIndex).data("dtr-keyboard",1)}}),d.defaults={breakpoints:d.breakpoints=[{name:"desktop",width:1/0},{name:"tablet-l",width:1024},{name:"tablet-p",width:768},{name:"mobile-l",width:480},{name:"mobile-p",width:320}],auto:!0,details:{display:(d.display={childRow:function(e,t,n){return t?f(e.node()).hasClass("parent")?(e.child(n(),"child").show(),!0):void 0:e.child.isShown()?(e.child(!1),f(e.node()).removeClass("parent"),!1):(e.child(n(),"child").show(),f(e.node()).addClass("parent"),!0)},childRowImmediate:function(e,t,n){return!t&&e.child.isShown()||!e.responsive.hasHidden()?(e.child(!1),f(e.node()).removeClass("parent"),!1):(e.child(n(),"child").show(),f(e.node()).addClass("parent"),!0)},modal:function(s){return function(e,t,n){var i,r;t?f("div.dtr-modal-content").empty().append(n()):(i=function(){r.remove(),f(o).off("keypress.dtr")},r=f('<div class="dtr-modal"/>').append(f('<div class="dtr-modal-display"/>').append(f('<div class="dtr-modal-content"/>').append(n())).append(f('<div class="dtr-modal-close">&times;</div>').click(function(){i()}))).append(f('<div class="dtr-modal-background"/>').click(function(){i()})).appendTo("body"),f(o).on("keyup.dtr",function(e){27===e.keyCode&&(e.stopPropagation(),i())})),s&&s.header&&f("div.dtr-modal-content").prepend("<h2>"+s.header(e)+"</h2>")}}}).childRow,renderer:(d.renderer={listHiddenNodes:function(){return function(i,e,t){var r=this,s=f('<ul data-dtr-index="'+e+'" class="dtr-details"/>'),o=!1;f.each(t,function(e,t){var n;t.hidden&&(n=t.className?'class="'+t.className+'"':"",f("<li "+n+' data-dtr-index="'+t.columnIndex+'" data-dt-row="'+t.rowIndex+'" data-dt-column="'+t.columnIndex+'"><span class="dtr-title">'+t.title+"</span> </li>").append(f('<span class="dtr-data"/>').append(r._childNodes(i,t.rowIndex,t.columnIndex))).appendTo(s),o=!0)});return!!o&&s}},listHidden:function(){return function(e,t,n){n=f.map(n,function(e){var t=e.className?'class="'+e.className+'"':"";return e.hidden?"<li "+t+' data-dtr-index="'+e.columnIndex+'" data-dt-row="'+e.rowIndex+'" data-dt-column="'+e.columnIndex+'"><span class="dtr-title">'+e.title+'</span> <span class="dtr-data">'+e.data+"</span></li>":""}).join("");return!!n&&f('<ul data-dtr-index="'+t+'" class="dtr-details"/>').append(n)}},tableAll:function(i){return i=f.extend({tableClass:""},i),function(e,t,n){n=f.map(n,function(e){return"<tr "+(e.className?'class="'+e.className+'"':"")+' data-dt-row="'+e.rowIndex+'" data-dt-column="'+e.columnIndex+'"><td>'+e.title+":</td> <td>"+e.data+"</td></tr>"}).join("");return f('<table class="'+i.tableClass+' dtr-details" width="100%"/>').append(n)}}}).listHidden(),target:0,type:"inline"},orthogonal:"display"},f.fn.dataTable.Api);return e.register("responsive()",function(){return this}),e.register("responsive.index()",function(e){return{column:(e=f(e)).data("dtr-index"),row:e.parent().data("dtr-index")}}),e.register("responsive.rebuild()",function(){return this.iterator("table",function(e){e._responsive&&e._responsive._classLogic()})}),e.register("responsive.recalc()",function(){return this.iterator("table",function(e){e._responsive&&(e._responsive._resizeAuto(),e._responsive._resize())})}),e.register("responsive.hasHidden()",function(){var e=this.context[0];return!!e._responsive&&-1!==f.inArray(!1,e._responsive._responsiveOnlyHidden())}),e.registerPlural("columns().responsiveHidden()","column().responsiveHidden()",function(){return this.iterator("column",function(e,t){return!!e._responsive&&e._responsive._responsiveOnlyHidden()[t]},1)}),d.version="2.4.0",f.fn.dataTable.Responsive=d,f.fn.DataTable.Responsive=d,f(o).on("preInit.dt.dtr",function(e,t,n){"dt"===e.namespace&&(f(t.nTable).hasClass("responsive")||f(t.nTable).hasClass("dt-responsive")||t.oInit.responsive||r.defaults.responsive)&&!1!==(e=t.oInit.responsive)&&new d(t,f.isPlainObject(e)?e:{})}),r});/*! Bootstrap 5 integration for DataTables' Responsive
* © SpryMedia Ltd - datatables.net/license
*/!function(a){"function"==typeof define&&define.amd?define(["jquery","datatables.net-bs5","datatables.net-responsive"],function(e){return a(e,window,document)}):"object"==typeof exports?module.exports=function(e,d){return e=e||window,(d=d||("undefined"!=typeof window?require("jquery"):require("jquery")(e))).fn.dataTable||require("datatables.net-bs5")(e,d),d.fn.dataTable||require("datatables.net-responsive")(e,d),a(d,e,e.document)}:a(jQuery,window,document)}(function(i,e,d,a){"use strict";var s,o=i.fn.dataTable,t=o.Responsive.display,l=t.modal,r=i('<div class="modal fade dtr-bs-modal" role="dialog"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div><div class="modal-body"/></div></div></div>'),u=e.bootstrap;return o.Responsive.bootstrap=function(e){u=e},t.modal=function(n){return s=s||new u.Modal(r[0]),function(e,d,a){var o,t;i.fn.modal?d||(n&&n.header&&(t=(o=r.find("div.modal-header")).find("button").detach(),o.empty().append('<h4 class="modal-title">'+n.header(e)+"</h4>").append(t)),r.find("div.modal-body").empty().append(a()),r.appendTo("body").modal(),s.show()):l(e,d,a)}},o});/*! RowGroup 1.3.0
* ©2017-2022 SpryMedia Ltd - datatables.net/license
*/!function(e){"function"==typeof define&&define.amd?define(["jquery","datatables.net"],function(t){return e(t,window,document)}):"object"==typeof exports?module.exports=function(t,r){return t=t||window,(r=r||("undefined"!=typeof window?require("jquery"):require("jquery")(t))).fn.dataTable||require("datatables.net")(t,r),e(r,0,t.document)}:e(jQuery,window,document)}(function(o,t,r,l){"use strict";function a(t,r){if(!p.versionCheck||!p.versionCheck("1.10.8"))throw"RowGroup requires DataTables 1.10.8 or newer";if(this.c=o.extend(!0,{},p.defaults.rowGroup,a.defaults,r),this.s={dt:new p.Api(t)},this.dom={},r=this.s.dt.settings()[0],t=r.rowGroup)return t;(r.rowGroup=this)._constructor()}var p=o.fn.dataTable;return o.extend(a.prototype,{dataSrc:function(t){var r;return t===l?this.c.dataSrc:(r=this.s.dt,this.c.dataSrc=t,o(r.table().node()).triggerHandler("rowgroup-datasrc.dt",[r,t]),this)},disable:function(){return this.c.enable=!1,this},enable:function(t){return!1===t?this.disable():(this.c.enable=!0,this)},enabled:function(){return this.c.enable},_constructor:function(){var e=this,t=this.s.dt,n=t.settings()[0];t.on("draw.dtrg",function(t,r){e.c.enable&&n===r&&e._draw()}),t.on("column-visibility.dt.dtrg responsive-resize.dt.dtrg",function(){e._adjustColspan()}),t.on("destroy",function(){t.off(".dtrg")})},_adjustColspan:function(){o("tr."+this.c.className,this.s.dt.table().body()).find("td:visible").attr("colspan",this._colspan())},_colspan:function(){return this.s.dt.columns().visible().reduce(function(t,r){return t+r},0)},_draw:function(){var t=this.s.dt,t=this._group(0,t.rows({page:"current"}).indexes());this._groupDisplay(0,t)},_group:function(t,r){for(var e,n=Array.isArray(this.c.dataSrc)?this.c.dataSrc:[this.c.dataSrc],o=p.ext.oApi._fnGetObjectDataFn(n[t]),a=this.s.dt,s=[],i=0,u=r.length;i<u;i++){var d,c=r[i];null!==(d=o(a.row(c).data()))&&d!==l||(d=this.c.emptyDataGroup),e!==l&&d===e||(s.push({dataPoint:d,rows:[]}),e=d),s[s.length-1].rows.push(c)}if(n[t+1]!==l)for(i=0,u=s.length;i<u;i++)s[i].children=this._group(t+1,s[i].rows);return s},_groupDisplay:function(t,r){for(var e,n=this.s.dt,o=0,a=r.length;o<a;o++){var s,i=r[o],u=i.dataPoint,d=i.rows;this.c.startRender&&(e=this.c.startRender.call(this,n.rows(d),u,t),(s=this._rowWrap(e,this.c.startClassName,t))&&s.insertBefore(n.row(d[0]).node())),this.c.endRender&&(e=this.c.endRender.call(this,n.rows(d),u,t),(s=this._rowWrap(e,this.c.endClassName,t))&&s.insertAfter(n.row(d[d.length-1]).node())),i.children&&this._groupDisplay(t+1,i.children)}},_rowWrap:function(t,r,e){return(t=null!==t&&""!==t?t:this.c.emptyDataGroup)===l||null===t?null:("object"==typeof t&&t.nodeName&&"tr"===t.nodeName.toLowerCase()?o(t):t instanceof o&&t.length&&"tr"===t[0].nodeName.toLowerCase()?t:o("<tr/>").append(o("<th/>").attr("colspan",this._colspan()).attr("scope","row").append(t))).addClass(this.c.className).addClass(r).addClass("dtrg-level-"+e)}}),a.defaults={className:"dtrg-group",dataSrc:0,emptyDataGroup:"No group",enable:!0,endClassName:"dtrg-end",endRender:null,startClassName:"dtrg-start",startRender:function(t,r){return r}},a.version="1.3.0",o.fn.dataTable.RowGroup=a,o.fn.DataTable.RowGroup=a,p.Api.register("rowGroup()",function(){return this}),p.Api.register("rowGroup().disable()",function(){return this.iterator("table",function(t){t.rowGroup&&t.rowGroup.enable(!1)})}),p.Api.register("rowGroup().enable()",function(r){return this.iterator("table",function(t){t.rowGroup&&t.rowGroup.enable(r===l||r)})}),p.Api.register("rowGroup().enabled()",function(){var t=this.context;return!(!t.length||!t[0].rowGroup)&&t[0].rowGroup.enabled()}),p.Api.register("rowGroup().dataSrc()",function(r){return r===l?this.context[0].rowGroup.dataSrc():this.iterator("table",function(t){t.rowGroup&&t.rowGroup.dataSrc(r)})}),o(r).on("preInit.dt.dtrg",function(t,r,e){var n;"dt"===t.namespace&&(t=r.oInit.rowGroup,n=p.defaults.rowGroup,(t||n)&&(n=o.extend({},n,t),!1!==t&&new a(r,n)))}),p});/*! Bootstrap 5 styling wrapper for RowGroup
* © SpryMedia Ltd - datatables.net/license
*/(function(factory){if(typeof define==='function'&&define.amd){define(['jquery','datatables.net-bs5','datatables.net-rowgroup'],function($){return factory($,window,document);});}
else if(typeof exports==='object'){module.exports=function(root,$){if(!root){root=window;}
if(!$){$=typeof window!=='undefined'?require('jquery'):require('jquery')(root);}
if(!$.fn.dataTable){require('datatables.net-bs5')(root,$);}
if(!$.fn.dataTable){require('datatables.net-rowgroup')(root,$);}
return factory($,root,root.document);};}
else{factory(jQuery,window,document);}}(function($,window,document,undefined){'use strict';var DataTable=$.fn.dataTable;return DataTable;}));/*! RowReorder 1.3.1
* 2015-2022 SpryMedia Ltd - datatables.net/license
*/!function(o){"function"==typeof define&&define.amd?define(["jquery","datatables.net"],function(t){return o(t,window,document)}):"object"==typeof exports?module.exports=function(t,e){return t=t||window,(e=e||("undefined"!=typeof window?require("jquery"):require("jquery")(t))).fn.dataTable||require("datatables.net")(t,e),o(e,t,t.document)}:o(jQuery,window,document)}(function(v,d,b,t){"use strict";function n(t,e){if(!s.versionCheck||!s.versionCheck("1.10.8"))throw"DataTables RowReorder requires DataTables 1.10.8 or newer";if(this.c=v.extend(!0,{},s.defaults.rowReorder,n.defaults,e),this.s={bodyTop:null,dt:new s.Api(t),getDataFn:s.ext.oApi._fnGetObjectDataFn(this.c.dataSrc),middles:null,scroll:{},scrollInterval:null,setDataFn:s.ext.oApi._fnSetObjectDataFn(this.c.dataSrc),start:{top:0,left:0,offsetTop:0,offsetLeft:0,nodes:[]},windowHeight:0,documentOuterHeight:0,domCloneOuterHeight:0},this.dom={clone:null,cloneParent:null,dtScroll:v("div.dataTables_scrollBody",this.s.dt.table().container())},e=this.s.dt.settings()[0],t=e.rowreorder)return t;this.dom.dtScroll.length||(this.dom.dtScroll=v(this.s.dt.table().container(),"tbody")),(e.rowreorder=this)._constructor()}var s=v.fn.dataTable,e=(v.extend(n.prototype,{_constructor:function(){var r=this,n=this.s.dt,t=v(n.table().node());"static"===t.css("position")&&t.css("position","relative"),v(n.table().container()).on("mousedown.rowReorder touchstart.rowReorder",this.c.selector,function(t){var e,o;if(r.c.enable)return!!v(t.target).is(r.c.excludedChildren)||(e=v(this).closest("tr"),(o=n.row(e)).any()?(r._emitEvent("pre-row-reorder",{node:o.node(),index:o.index()}),r._mouseDown(t,e),!1):void 0)}),n.on("destroy.rowReorder",function(){v(n.table().container()).off(".rowReorder"),n.off(".rowReorder")})},_cachePositions:function(){var t=this.s.dt,r=v(t.table().node()).find("thead").outerHeight(),e=v.unique(t.rows({page:"current"}).nodes().toArray()),e=v.map(e,function(t,e){var o=v(t).position().top-r;return(o+o+v(t).outerHeight())/2});this.s.middles=e,this.s.bodyTop=v(t.table().body()).offset().top,this.s.windowHeight=v(d).height(),this.s.documentOuterHeight=v(b).outerHeight()},_clone:function(t){var e=this.s.dt,e=v(e.table().node().cloneNode(!1)).addClass("dt-rowReorder-float").append("<tbody/>").append(t.clone(!1)),o=t.outerWidth(),r=t.outerHeight(),n=v(v(this.s.dt.table().node()).parent()),s=n.width(),n=n.scrollLeft(),i=t.children().map(function(){return v(this).width()}),t=(e.width(o).height(r).find("tr").children().each(function(t){this.style.width=i[t]+"px"}),v("<div>").addClass("dt-rowReorder-float-parent").width(s).append(e).appendTo("body").scrollLeft(n));this.dom.clone=e,this.dom.cloneParent=t,this.s.domCloneOuterHeight=e.outerHeight()},_clonePosition:function(t){var e=this.s.start,o=this._eventToPage(t,"Y")-e.top,t=this._eventToPage(t,"X")-e.left,r=this.c.snapX,o=o+e.offsetTop,r=!0===r?e.offsetLeft:"number"==typeof r?e.offsetLeft+r:t+e.offsetLeft+this.dom.cloneParent.scrollLeft();o<0?o=0:o+this.s.domCloneOuterHeight>this.s.documentOuterHeight&&(o=this.s.documentOuterHeight-this.s.domCloneOuterHeight),this.dom.cloneParent.css({top:o,left:r})},_emitEvent:function(o,r){this.s.dt.iterator("table",function(t,e){v(t.nTable).triggerHandler(o+".dt",r)})},_eventToPage:function(t,e){return(-1!==t.type.indexOf("touch")?t.originalEvent.touches[0]:t)["page"+e]},_mouseDown:function(t,e){var o=this,r=this.s.dt,n=this.s.start,s=e.offset(),s=(n.top=this._eventToPage(t,"Y"),n.left=this._eventToPage(t,"X"),n.offsetTop=s.top,n.offsetLeft=s.left,n.nodes=v.unique(r.rows({page:"current"}).nodes().toArray()),this._cachePositions(),this._clone(e),this._clonePosition(t),(this.dom.target=e).addClass("dt-rowReorder-moving"),v(b).on("mouseup.rowReorder touchend.rowReorder",function(t){o._mouseUp(t)}).on("mousemove.rowReorder touchmove.rowReorder",function(t){o._mouseMove(t)}),v(d).width()===v(b).width()&&v(b.body).addClass("dt-rowReorder-noOverflow"),this.dom.dtScroll);this.s.scroll={windowHeight:v(d).height(),windowWidth:v(d).width(),dtTop:s.length?s.offset().top:null,dtLeft:s.length?s.offset().left:null,dtHeight:s.length?s.outerHeight():null,dtWidth:s.length?s.outerWidth():null}},_mouseMove:function(t){this._clonePosition(t);for(var e=this._eventToPage(t,"Y")-this.s.bodyTop,o=this.s.middles,r=null,n=this.s.dt,s=0,i=o.length;s<i;s++)if(e<o[s]){r=s;break}null===r&&(r=o.length),null!==this.s.lastInsert&&this.s.lastInsert===r||(n=v.unique(n.rows({page:"current"}).nodes().toArray()),r>this.s.lastInsert?this.dom.target.insertAfter(n[r-1]):this.dom.target.insertBefore(n[r]),this._cachePositions(),this.s.lastInsert=r),this._shiftScroll(t)},_mouseUp:function(t){for(var e,o,r,n=this,s=this.s.dt,i=this.c.dataSrc,d=(this.dom.clone.remove(),this.dom.cloneParent.remove(),this.dom.clone=null,this.dom.cloneParent=null,this.dom.target.removeClass("dt-rowReorder-moving"),v(b).off(".rowReorder"),v(b.body).removeClass("dt-rowReorder-noOverflow"),clearInterval(this.s.scrollInterval),this.s.scrollInterval=null,this.s.start.nodes),l=v.unique(s.rows({page:"current"}).nodes().toArray()),a={},c=[],h=[],u=this.s.getDataFn,f=this.s.setDataFn,w=0,p=d.length;w<p;w++)d[w]!==l[w]&&(e=s.row(l[w]).id(),o=s.row(l[w]).data(),r=s.row(d[w]).data(),e&&(a[e]=u(r)),c.push({node:l[w],oldData:u(o),newData:u(r),newPosition:w,oldPosition:v.inArray(l[w],d)}),h.push(l[w]));function m(){if(n.c.update){for(w=0,p=c.length;w<p;w++){var t=s.row(c[w].node).data();f(t,c[w].newData),s.columns().every(function(){this.dataSrc()===i&&s.cell(c[w].node,this.index()).invalidate("data")})}n._emitEvent("row-reordered",g),s.draw(!1)}}var g=[c,{dataSrc:i,nodes:h,values:a,triggerRow:s.row(this.dom.target),originalEvent:t}];this._emitEvent("row-reorder",g);this.c.editor?(this.c.enable=!1,this.c.editor.edit(h,!1,v.extend({submit:"changed"},this.c.formOptions)).multiSet(i,a).one("preSubmitCancelled.rowReorder",function(){n.c.enable=!0,n.c.editor.off(".rowReorder"),s.draw(!1)}).one("submitUnsuccessful.rowReorder",function(){s.draw(!1)}).one("submitSuccess.rowReorder",function(){m()}).one("submitComplete",function(){n.c.enable=!0,n.c.editor.off(".rowReorder")}).submit()):m()},_shiftScroll:function(t){var e,o,r=this,n=(this.s.dt,this.s.scroll),s=!1,i=t.pageY-b.body.scrollTop;i<v(d).scrollTop()+65?e=-5:i>n.windowHeight+v(d).scrollTop()-65&&(e=5),null!==n.dtTop&&t.pageY<n.dtTop+65?o=-5:null!==n.dtTop&&t.pageY>n.dtTop+n.dtHeight-65&&(o=5),e||o?(n.windowVert=e,n.dtVert=o,s=!0):this.s.scrollInterval&&(clearInterval(this.s.scrollInterval),this.s.scrollInterval=null),!this.s.scrollInterval&&s&&(this.s.scrollInterval=setInterval(function(){var t;n.windowVert&&(t=v(b).scrollTop(),v(b).scrollTop(t+n.windowVert),t!==v(b).scrollTop()&&(t=parseFloat(r.dom.cloneParent.css("top")),r.dom.cloneParent.css("top",t+n.windowVert))),n.dtVert&&(t=r.dom.dtScroll[0],n.dtVert&&(t.scrollTop+=n.dtVert))},20))}}),n.defaults={dataSrc:0,editor:null,enable:!0,formOptions:{},selector:"td:first-child",snapX:!1,update:!0,excludedChildren:"a"},v.fn.dataTable.Api);return e.register("rowReorder()",function(){return this}),e.register("rowReorder.enable()",function(e){return e===t&&(e=!0),this.iterator("table",function(t){t.rowreorder&&(t.rowreorder.c.enable=e)})}),e.register("rowReorder.disable()",function(){return this.iterator("table",function(t){t.rowreorder&&(t.rowreorder.c.enable=!1)})}),n.version="1.3.1",v.fn.dataTable.RowReorder=n,v.fn.DataTable.RowReorder=n,v(b).on("init.dt.dtr",function(t,e,o){var r;"dt"===t.namespace&&(t=e.oInit.rowReorder,r=s.defaults.rowReorder,(t||r)&&(r=v.extend({},t,r),!1!==t&&new n(e,r)))}),s});/*! Bootstrap 5 styling wrapper for RowReorder
* © SpryMedia Ltd - datatables.net/license
*/(function(factory){if(typeof define==='function'&&define.amd){define(['jquery','datatables.net-bs5','datatables.net-rowreorder'],function($){return factory($,window,document);});}
else if(typeof exports==='object'){module.exports=function(root,$){if(!root){root=window;}
if(!$){$=typeof window!=='undefined'?require('jquery'):require('jquery')(root);}
if(!$.fn.dataTable){require('datatables.net-bs5')(root,$);}
if(!$.fn.dataTable){require('datatables.net-rowreorder')(root,$);}
return factory($,root,root.document);};}
else{factory(jQuery,window,document);}}(function($,window,document,undefined){'use strict';var DataTable=$.fn.dataTable;return DataTable;}));/*! Scroller 2.1.0
* ©2011-2022 SpryMedia Ltd - datatables.net/license
*/!function(o){"function"==typeof define&&define.amd?define(["jquery","datatables.net"],function(s){return o(s,window,document)}):"object"==typeof exports?module.exports=function(s,t){return s=s||window,(t=t||("undefined"!=typeof window?require("jquery"):require("jquery")(s))).fn.dataTable||require("datatables.net")(s,t),o(t,s,s.document)}:o(jQuery,window,document)}(function(f,i,o,a){"use strict";function e(s,t){this instanceof e?(t===a&&(t={}),s=f.fn.dataTable.Api(s),this.s={dt:s.settings()[0],dtApi:s,tableTop:0,tableBottom:0,redrawTop:0,redrawBottom:0,autoHeight:!0,viewportRows:0,stateTO:null,stateSaveThrottle:function(){},drawTO:null,heights:{jump:null,page:null,virtual:null,scroll:null,row:null,viewport:null,labelHeight:0,xbar:0},topRowFloat:0,scrollDrawDiff:null,loaderVisible:!1,forceReposition:!1,baseRowTop:0,baseScrollTop:0,mousedown:!1,lastScrollTop:0},this.s=f.extend(this.s,e.oDefaults,t),this.s.heights.row=this.s.rowHeight,this.dom={force:o.createElement("div"),label:f('<div class="dts_label">0</div>'),scroller:null,table:null,loader:null},this.s.dt.oScroller||(this.s.dt.oScroller=this).construct()):alert("Scroller warning: Scroller must be initialised with the 'new' keyword.")}var l=f.fn.dataTable,s=(f.extend(e.prototype,{measure:function(s){this.s.autoHeight&&this._calcRowHeight();var t=this.s.heights,o=(t.row&&(t.viewport=this._parseHeight(f(this.dom.scroller).css("max-height")),this.s.viewportRows=parseInt(t.viewport/t.row,10)+1,this.s.dt._iDisplayLength=this.s.viewportRows*this.s.displayBuffer),this.dom.label.outerHeight());t.xbar=this.dom.scroller.offsetHeight-this.dom.scroller.clientHeight,t.labelHeight=o,s!==a&&!s||this.s.dt.oInstance.fnDraw(!1)},pageInfo:function(){var s=this.s.dt,t=this.dom.scroller.scrollTop,s=s.fnRecordsDisplay(),o=Math.ceil(this.pixelsToRow(t+this.s.heights.viewport,!1,this.s.ani));return{start:Math.floor(this.pixelsToRow(t,!1,this.s.ani)),end:s<o?s-1:o-1}},pixelsToRow:function(s,t,o){s-=this.s.baseScrollTop,o=o?(this._domain("physicalToVirtual",this.s.baseScrollTop)+s)/this.s.heights.row:s/this.s.heights.row+this.s.baseRowTop;return t||t===a?parseInt(o,10):o},rowToPixels:function(s,t,o){s-=this.s.baseRowTop,o=o?this._domain("virtualToPhysical",this.s.baseScrollTop):this.s.baseScrollTop;return o+=s*this.s.heights.row,t||t===a?parseInt(o,10):o},scrollToRow:function(s,t){var o=this,e=!1,l=this.rowToPixels(s),r=s-(this.s.displayBuffer-1)/2*this.s.viewportRows;r<0&&(r=0),(l>this.s.redrawBottom||l<this.s.redrawTop)&&this.s.dt._iDisplayStart!==r&&(e=!0,l=this._domain("virtualToPhysical",s*this.s.heights.row),this.s.redrawTop<l&&l<this.s.redrawBottom&&(t=!(this.s.forceReposition=!0))),t===a||t?(this.s.ani=e,f(this.dom.scroller).animate({scrollTop:l},function(){setTimeout(function(){o.s.ani=!1},250)})):f(this.dom.scroller).scrollTop(l)},construct:function(){var e,l,r=this,s=this.s.dtApi;this.s.dt.oFeatures.bPaginate?(this.dom.force.style.position="relative",this.dom.force.style.top="0px",this.dom.force.style.left="0px",this.dom.force.style.width="1px",this.dom.scroller=f("div."+this.s.dt.oClasses.sScrollBody,this.s.dt.nTableWrapper)[0],this.dom.scroller.appendChild(this.dom.force),this.dom.scroller.style.position="relative",this.dom.table=f(">table",this.dom.scroller)[0],this.dom.table.style.position="absolute",this.dom.table.style.top="0px",this.dom.table.style.left="0px",f(s.table().container()).addClass("dts DTS"),this.s.loadingIndicator&&(this.dom.loader=f('<div class="dataTables_processing dts_loading">'+this.s.dt.oLanguage.sLoadingRecords+"</div>").css("display","none"),f(this.dom.scroller.parentNode).css("position","relative").append(this.dom.loader)),this.dom.label.appendTo(this.dom.scroller),this.s.heights.row&&"auto"!=this.s.heights.row&&(this.s.autoHeight=!1),this.s.ingnoreScroll=!0,f(this.dom.scroller).on("scroll.dt-scroller",function(s){r._scroll.call(r)}),f(this.dom.scroller).on("touchstart.dt-scroller",function(){r._scroll.call(r)}),f(this.dom.scroller).on("mousedown.dt-scroller",function(){r.s.mousedown=!0}).on("mouseup.dt-scroller",function(){r.s.labelVisible=!1,r.s.mousedown=!1,r.dom.label.css("display","none")}),f(i).on("resize.dt-scroller",function(){r.measure(!1),r._info()}),e=!0,l=s.state.loaded(),s.on("stateSaveParams.scroller",function(s,t,o){e&&l?(o.scroller=l.scroller,e=!1,o.scroller&&(r.s.lastScrollTop=o.scroller.scrollTop)):o.scroller={topRow:r.s.topRowFloat,baseScrollTop:r.s.baseScrollTop,baseRowTop:r.s.baseRowTop,scrollTop:r.s.lastScrollTop}}),s.on("stateLoadParams.scroller",function(s,t,o){o.scroller!==a&&r.scrollToRow(o.scroller.topRow)}),l&&l.scroller&&(this.s.topRowFloat=l.scroller.topRow,this.s.baseScrollTop=l.scroller.baseScrollTop,this.s.baseRowTop=l.scroller.baseRowTop),this.measure(!1),r.s.stateSaveThrottle=r.s.dt.oApi._fnThrottle(function(){r.s.dtApi.state.save()},500),s.on("init.scroller",function(){r.measure(!1),r.s.scrollType="jump",r._draw(),s.on("draw.scroller",function(){r._draw()})}),s.on("preDraw.dt.scroller",function(){r._scrollForce()}),s.on("destroy.scroller",function(){f(i).off("resize.dt-scroller"),f(r.dom.scroller).off(".dt-scroller"),f(r.s.dt.nTable).off(".scroller"),f(r.s.dt.nTableWrapper).removeClass("DTS"),f("div.DTS_Loading",r.dom.scroller.parentNode).remove(),r.dom.table.style.position="",r.dom.table.style.top="",r.dom.table.style.left=""})):this.s.dt.oApi._fnLog(this.s.dt,0,"Pagination must be enabled for Scroller")},_calcRowHeight:function(){var s=this.s.dt,t=s.nTable,o=t.cloneNode(!1),e=f("<tbody/>").appendTo(o),l=f('<div class="'+s.oClasses.sWrapper+' DTS"><div class="'+s.oClasses.sScrollWrapper+'"><div class="'+s.oClasses.sScrollBody+'"></div></div></div>'),r=(f("tbody tr:lt(4)",t).clone().appendTo(e),f("tr",e).length);if(1===r)e.prepend("<tr><td>&#160;</td></tr>"),e.append("<tr><td>&#160;</td></tr>");else for(;r<3;r++)e.append("<tr><td>&#160;</td></tr>");f("div."+s.oClasses.sScrollBody,l).append(o);s=this.s.dt.nHolding||t.parentNode;f(s).is(":visible")||(s="body"),l.find("input").removeAttr("name"),l.appendTo(s),this.s.heights.row=f("tr",e).eq(1).outerHeight(),l.remove()},_draw:function(){var s=this,t=this.s.heights,o=this.dom.scroller.scrollTop,e=f(this.s.dt.nTable).height(),l=this.s.dt._iDisplayStart,r=this.s.dt._iDisplayLength,i=this.s.dt.fnRecordsDisplay(),a=o+t.viewport,n=(this.s.skip=!0,!this.s.dt.bSorted&&!this.s.dt.bFiltered||0!==l||this.s.dt._drawHold||(this.s.topRowFloat=0),o="jump"===this.s.scrollType?this._domain("virtualToPhysical",this.s.topRowFloat*t.row):o,this.s.baseScrollTop=o,this.s.baseRowTop=this.s.topRowFloat,o-(this.s.topRowFloat-l)*t.row),l=(0===l?n=0:i<=l+r?n=t.scroll-e:n+e<a&&(this.s.baseScrollTop+=1+((i=a-e)-n),n=i),this.dom.table.style.top=n+"px",this.s.tableTop=n,this.s.tableBottom=e+this.s.tableTop,(o-this.s.tableTop)*this.s.boundaryScale);this.s.redrawTop=o-l,this.s.redrawBottom=o+l>t.scroll-t.viewport-t.row?t.scroll-t.viewport-t.row:o+l,this.s.skip=!1,s.s.ingnoreScroll&&(this.s.dt.oFeatures.bStateSave&&null!==this.s.dt.oLoadedState&&void 0!==this.s.dt.oLoadedState.scroller?((r=!(!this.s.dt.sAjaxSource&&!s.s.dt.ajax||this.s.dt.oFeatures.bServerSide))&&2<=this.s.dt.iDraw||!r&&1<=this.s.dt.iDraw)&&setTimeout(function(){f(s.dom.scroller).scrollTop(s.s.dt.oLoadedState.scroller.scrollTop),setTimeout(function(){s.s.ingnoreScroll=!1},0)},0):s.s.ingnoreScroll=!1),this.s.dt.oFeatures.bInfo&&setTimeout(function(){s._info.call(s)},0),f(this.s.dt.nTable).triggerHandler("position.dts.dt",n),this.dom.loader&&this.s.loaderVisible&&(this.dom.loader.css("display","none"),this.s.loaderVisible=!1)},_domain:function(s,t){var o,e=this.s.heights,l=1e4;return e.virtual===e.scroll||t<l?t:"virtualToPhysical"===s&&t>=e.virtual-l?(o=e.virtual-t,e.scroll-o):"physicalToVirtual"===s&&t>=e.scroll-l?(o=e.scroll-t,e.virtual-o):(e=l-(o=(e.virtual-l-l)/(e.scroll-l-l))*l,"virtualToPhysical"===s?(t-e)/o:o*t+e)},_info:function(){if(this.s.dt.oFeatures.bInfo){var s=this.s.dt,t=s.oLanguage,o=this.dom.scroller.scrollTop,e=Math.floor(this.pixelsToRow(o,!1,this.s.ani)+1),l=s.fnRecordsTotal(),r=s.fnRecordsDisplay(),o=Math.ceil(this.pixelsToRow(o+this.s.heights.viewport,!1,this.s.ani)),o=r<o?r:o,i=s.fnFormatNumber(e),a=s.fnFormatNumber(o),n=s.fnFormatNumber(l),h=s.fnFormatNumber(r),c=0===s.fnRecordsDisplay()&&s.fnRecordsDisplay()==s.fnRecordsTotal()?t.sInfoEmpty+t.sInfoPostFix:0===s.fnRecordsDisplay()?t.sInfoEmpty+" "+t.sInfoFiltered.replace("_MAX_",n)+t.sInfoPostFix:s.fnRecordsDisplay()==s.fnRecordsTotal()?t.sInfo.replace("_START_",i).replace("_END_",a).replace("_MAX_",n).replace("_TOTAL_",h)+t.sInfoPostFix:t.sInfo.replace("_START_",i).replace("_END_",a).replace("_MAX_",n).replace("_TOTAL_",h)+" "+t.sInfoFiltered.replace("_MAX_",s.fnFormatNumber(s.fnRecordsTotal()))+t.sInfoPostFix,i=t.fnInfoCallback,d=(i&&(c=i.call(s.oInstance,s,e,o,l,r,c)),s.aanFeatures.i);if(void 0!==d)for(var p=0,u=d.length;p<u;p++)f(d[p]).html(c);f(s.nTable).triggerHandler("info.dt")}},_parseHeight:function(s){var t,o,s=/^([+-]?(?:\d+(?:\.\d+)?|\.\d+))(px|em|rem|vh)$/.exec(s);return null!==s&&(o=parseFloat(s[1]),"px"===(s=s[2])?t=o:"vh"===s?t=o/100*f(i).height():"rem"===s?t=o*parseFloat(f(":root").css("font-size")):"em"===s&&(t=o*parseFloat(f("body").css("font-size"))),t)||0},_scroll:function(){var s,t=this,o=this.s.heights,e=this.dom.scroller.scrollTop;this.s.skip||this.s.ingnoreScroll||e!==this.s.lastScrollTop&&(this.s.dt.bFiltered||this.s.dt.bSorted?this.s.lastScrollTop=0:(this._info(),clearTimeout(this.s.stateTO),this.s.stateTO=setTimeout(function(){t.s.dtApi.state.save()},250),this.s.scrollType=Math.abs(e-this.s.lastScrollTop)>o.viewport?"jump":"cont",this.s.topRowFloat="cont"===this.s.scrollType?this.pixelsToRow(e,!1,!1):this._domain("physicalToVirtual",e)/o.row,this.s.topRowFloat<0&&(this.s.topRowFloat=0),this.s.forceReposition||e<this.s.redrawTop||e>this.s.redrawBottom?(s=Math.ceil((this.s.displayBuffer-1)/2*this.s.viewportRows),s=parseInt(this.s.topRowFloat,10)-s,this.s.forceReposition=!1,s<=0?s=0:s+this.s.dt._iDisplayLength>this.s.dt.fnRecordsDisplay()?(s=this.s.dt.fnRecordsDisplay()-this.s.dt._iDisplayLength)<0&&(s=0):s%2!=0&&s++,(this.s.targetTop=s)!=this.s.dt._iDisplayStart&&(this.s.tableTop=f(this.s.dt.nTable).offset().top,this.s.tableBottom=f(this.s.dt.nTable).height()+this.s.tableTop,s=function(){t.s.dt._iDisplayStart=t.s.targetTop,t.s.dt.oApi._fnDraw(t.s.dt)},this.s.dt.oFeatures.bServerSide?(this.s.forceReposition=!0,clearTimeout(this.s.drawTO),this.s.drawTO=setTimeout(s,this.s.serverWait)):s(),this.dom.loader&&!this.s.loaderVisible&&(this.dom.loader.css("display","block"),this.s.loaderVisible=!0))):this.s.topRowFloat=this.pixelsToRow(e,!1,!0),this.s.lastScrollTop=e,this.s.stateSaveThrottle(),"jump"===this.s.scrollType&&this.s.mousedown&&(this.s.labelVisible=!0),this.s.labelVisible&&(s=(o.viewport-o.labelHeight-o.xbar)/o.scroll,this.dom.label.html(this.s.dt.fnFormatNumber(parseInt(this.s.topRowFloat,10)+1)).css("top",e+e*s).css("right",10-this.dom.scroller.scrollLeft).css("display","block"))))},_scrollForce:function(){var s=this.s.heights;s.virtual=s.row*this.s.dt.fnRecordsDisplay(),s.scroll=s.virtual,1e6<s.scroll&&(s.scroll=1e6),this.dom.force.style.height=s.scroll>this.s.heights.row?s.scroll+"px":this.s.heights.row+"px"}}),e.oDefaults=e.defaults={boundaryScale:.5,displayBuffer:9,loadingIndicator:!1,rowHeight:"auto",serverWait:200},e.version="2.1.0",f(o).on("preInit.dt.dtscroller",function(s,t){var o;"dt"===s.namespace&&(s=t.oInit.scroller,o=l.defaults.scroller,(s||o)&&(o=f.extend({},s,o),!1!==s&&new e(t,o)))}),f.fn.dataTable.Scroller=e,f.fn.DataTable.Scroller=e,f.fn.dataTable.Api);return s.register("scroller()",function(){return this}),s.register("scroller().rowToPixels()",function(s,t,o){var e=this.context;if(e.length&&e[0].oScroller)return e[0].oScroller.rowToPixels(s,t,o)}),s.register("scroller().pixelsToRow()",function(s,t,o){var e=this.context;if(e.length&&e[0].oScroller)return e[0].oScroller.pixelsToRow(s,t,o)}),s.register(["scroller().scrollToRow()","scroller.toPosition()"],function(t,o){return this.iterator("table",function(s){s.oScroller&&s.oScroller.scrollToRow(t,o)}),this}),s.register("row().scrollTo()",function(o){var e=this;return this.iterator("row",function(s,t){s.oScroller&&(t=e.rows({order:"applied",search:"applied"}).indexes().indexOf(t),s.oScroller.scrollToRow(t,o))}),this}),s.register("scroller.measure()",function(t){return this.iterator("table",function(s){s.oScroller&&s.oScroller.measure(t)}),this}),s.register("scroller.page()",function(){var s=this.context;if(s.length&&s[0].oScroller)return s[0].oScroller.pageInfo()}),l});/*! Select for DataTables 1.5.0
* 2015-2021 SpryMedia Ltd - datatables.net/license/mit
*/!function(l){"function"==typeof define&&define.amd?define(["jquery","datatables.net"],function(e){return l(e,window,document)}):"object"==typeof exports?module.exports=function(e,t){return e=e||window,(t=t||("undefined"!=typeof window?require("jquery"):require("jquery")(e))).fn.dataTable||require("datatables.net")(e,t),l(t,e,e.document)}:l(jQuery,window,document)}(function(m,i,e,h){"use strict";var _=m.fn.dataTable;function r(n,e,t){function l(t,l){l<t&&(e=l,l=t,t=e);var e,s=!1;return n.columns(":visible").indexes().filter(function(e){return e===t&&(s=!0),e===l?!(s=!1):s})}function s(t,l){var e,s=n.rows({search:"applied"}).indexes(),c=(s.indexOf(t)>s.indexOf(l)&&(e=l,l=t,t=e),!1);return s.filter(function(e){return e===t&&(c=!0),e===l?!(c=!1):c})}var c,t=n.cells({selected:!0}).any()||t?(c=l(t.column,e.column),s(t.row,e.row)):(c=l(0,e.column),s(0,e.row)),t=n.cells(t,c).flatten();n.cells(e,{selected:!0}).any()?n.cells(t).deselect():n.cells(t).select()}function s(e){var t=e.settings()[0]._select.selector;m(e.table().container()).off("mousedown.dtSelect",t).off("mouseup.dtSelect",t).off("click.dtSelect",t),m("body").off("click.dtSelect"+w(e.table().node()))}function c(o){var a,t=m(o.table().container()),l=o.settings()[0],s=l._select.selector;t.on("mousedown.dtSelect",s,function(e){(e.shiftKey||e.metaKey||e.ctrlKey)&&t.css("-moz-user-select","none").one("selectstart.dtSelect",s,function(){return!1}),i.getSelection&&(a=i.getSelection())}).on("mouseup.dtSelect",s,function(){t.css("-moz-user-select","")}).on("click.dtSelect",s,function(e){var t,l=o.select.items();if(a){var s=i.getSelection();if((!s.anchorNode||m(s.anchorNode).closest("table")[0]===o.table().node())&&s!==a)return}var c,s=o.settings()[0],n=o.settings()[0].oClasses.sWrapper.trim().replace(/ +/g,".");m(e.target).closest("div."+n)[0]==o.table().container()&&(n=o.cell(m(e.target).closest("td, th"))).any()&&(c=m.Event("user-select.dt"),u(o,c,[l,n,e]),c.isDefaultPrevented()||(c=n.index(),"row"===l?(t=c.row,p(e,o,s,"row",t)):"column"===l?(t=n.index().column,p(e,o,s,"column",t)):"cell"===l&&(t=n.index(),p(e,o,s,"cell",t)),s._select_lastCell=c))}),m("body").on("click.dtSelect"+w(o.table().node()),function(e){var t;!l._select.blurable||m(e.target).parents().filter(o.table().container()).length||0===m(e.target).parents("html").length||m(e.target).parents("div.DTE").length||(t=m.Event("select-blur.dt"),u(o,t,[e.target,e]),t.isDefaultPrevented()||f(l,!0))})}function u(e,t,l,s){s&&!e.flatten().length||("string"==typeof t&&(t+=".dt"),l.unshift(e),m(e.table().node()).trigger(t,l))}function n(o){var i=new _.Api(o);o._select_init=!0,o.aoRowCreatedCallback.push({fn:function(e,t,l){var s,c,n=o.aoData[l];for(n._select_selected&&m(e).addClass(o._select.className),s=0,c=o.aoColumns.length;s<c;s++)(o.aoColumns[s]._select_selected||n._selected_cells&&n._selected_cells[s])&&m(n.anCells[s]).addClass(o._select.className)},sName:"select-deferRender"}),i.on("preXhr.dt.dtSelect",function(e,t){var l,s;t===i.settings()[0]&&(l=i.rows({selected:!0}).ids(!0).filter(function(e){return e!==h}),s=i.cells({selected:!0}).eq(0).map(function(e){var t=i.row(e.row).id(!0);return t?{row:t,column:e.column}:h}).filter(function(e){return e!==h}),i.one("draw.dt.dtSelect",function(){i.rows(l).select(),s.any()&&s.each(function(e){i.cells(e.row,e.column).select()})}))}),i.on("draw.dtSelect.dt select.dtSelect.dt deselect.dtSelect.dt info.dt",function(){var s,c,n,o,a,e;(e=(s=i).settings()[0])._select.info&&e.aanFeatures.i&&"api"!==s.select.style()&&(c=s.rows({selected:!0}).flatten().length,n=s.columns({selected:!0}).flatten().length,o=s.cells({selected:!0}).flatten().length,a=function(e,t,l){e.append(m('<span class="select-item"/>').append(s.i18n("select."+t+"s",{_:"%d "+t+"s selected",0:"",1:"1 "+t+" selected"},l)))},m.each(e.aanFeatures.i,function(e,t){t=m(t);var l=m('<span class="select-info"/>'),s=(a(l,"row",c),a(l,"column",n),a(l,"cell",o),t.children("span.select-info"));s.length&&s.remove(),""!==l.text()&&t.append(l)})),i.state.save()}),i.on("destroy.dtSelect",function(){i.rows({selected:!0}).deselect(),s(i),i.off(".dtSelect"),m("body").off(".dtSelect"+w(i.table().node()))})}function d(e,t,l,s){var c,n=e[t+"s"]({search:"applied"}).indexes(),s=m.inArray(s,n),o=m.inArray(l,n);e[t+"s"]({selected:!0}).any()||-1!==s?(o<s&&(c=o,o=s,s=c),n.splice(o+1,n.length),n.splice(0,s)):n.splice(m.inArray(l,n)+1,n.length),e[t](l,{selected:!0}).any()?(n.splice(m.inArray(l,n),1),e[t+"s"](n).deselect()):e[t+"s"](n).select()}function f(e,t){!t&&"single"!==e._select.style||((t=new _.Api(e)).rows({selected:!0}).deselect(),t.columns({selected:!0}).deselect(),t.cells({selected:!0}).deselect())}function p(e,t,l,s,c){var n=t.select.style(),o=t.select.toggleable(),a=t[s](c,{selected:!0}).any();a&&!o||("os"===n?e.ctrlKey||e.metaKey?t[s](c).select(!a):e.shiftKey?"cell"===s?r(t,c,l._select_lastCell||null):d(t,s,c,l._select_lastCell?l._select_lastCell[s]:null):(o=t[s+"s"]({selected:!0}),a&&1===o.flatten().length?t[s](c).deselect():(o.deselect(),t[s](c).select())):"multi+shift"==n&&e.shiftKey?"cell"===s?r(t,c,l._select_lastCell||null):d(t,s,c,l._select_lastCell?l._select_lastCell[s]:null):t[s](c).select(!a))}function w(e){return e.id.replace(/[^a-zA-Z0-9\-\_]/g,"-")}_.select={},_.select.version="1.5.0",_.select.init=function(c){var e,t,l,s,n,o,a,i,r,u,d,f=c.settings()[0];f._select||(e=c.state.loaded(),t=function(e,t,l){if(null!==l&&l.select!==h){if(c.rows({selected:!0}).any()&&c.rows().deselect(),l.select.rows!==h&&c.rows(l.select.rows).select(),c.columns({selected:!0}).any()&&c.columns().deselect(),l.select.columns!==h&&c.columns(l.select.columns).select(),c.cells({selected:!0}).any()&&c.cells().deselect(),l.select.cells!==h)for(var s=0;s<l.select.cells.length;s++)c.cell(l.select.cells[s].row,l.select.cells[s].column).select();c.state.save()}},c.one("init",function(){c.on("stateSaveParams",function(e,t,l){l.select={},l.select.rows=c.rows({selected:!0}).ids(!0).toArray(),l.select.columns=c.columns({selected:!0})[0],l.select.cells=c.cells({selected:!0})[0].map(function(e){return{row:c.row(e.row).id(!0),column:e.column}})}),t(0,0,e),c.on("stateLoaded stateLoadParams",t)}),s=f.oInit.select,l=_.defaults.select,l=s===h?l:s,s="row",i=a=!(o=!(n="api")),r="td, th",d=!(u="selected"),f._select={},!0===l?(n="os",d=!0):"string"==typeof l?(n=l,d=!0):m.isPlainObject(l)&&(l.blurable!==h&&(o=l.blurable),l.toggleable!==h&&(a=l.toggleable),l.info!==h&&(i=l.info),l.items!==h&&(s=l.items),d=(n=l.style!==h?l.style:"os",!0),l.selector!==h&&(r=l.selector),l.className!==h&&(u=l.className)),c.select.selector(r),c.select.items(s),c.select.style(n),c.select.blurable(o),c.select.toggleable(a),c.select.info(i),f._select.className=u,m.fn.dataTable.ext.order["select-checkbox"]=function(t,e){return this.api().column(e,{order:"index"}).nodes().map(function(e){return"row"===t._select.items?m(e).parent().hasClass(t._select.className):"cell"===t._select.items&&m(e).hasClass(t._select.className)})},!d&&m(c.table().node()).hasClass("selectable")&&c.select.style("os"))},m.each([{type:"row",prop:"aoData"},{type:"column",prop:"aoColumns"}],function(e,i){_.ext.selector[i.type].push(function(e,t,l){var s,c=t.selected,n=[];if(!0!==c&&!1!==c)return l;for(var o=0,a=l.length;o<a;o++)s=e[i.prop][l[o]],(!0===c&&!0===s._select_selected||!1===c&&!s._select_selected)&&n.push(l[o]);return n})}),_.ext.selector.cell.push(function(e,t,l){var s,c=t.selected,n=[];if(c===h)return l;for(var o=0,a=l.length;o<a;o++)s=e.aoData[l[o].row],(!0!==c||!s._selected_cells||!0!==s._selected_cells[l[o].column])&&(!1!==c||s._selected_cells&&s._selected_cells[l[o].column])||n.push(l[o]);return n});var t=_.Api.register,l=_.Api.registerPlural;function o(t,l){return function(e){return e.i18n("buttons."+t,l)}}function a(e){e=e._eventNamespace;return"draw.dt.DT"+e+" select.dt.DT"+e+" deselect.dt.DT"+e}t("select()",function(){return this.iterator("table",function(e){_.select.init(new _.Api(e))})}),t("select.blurable()",function(t){return t===h?this.context[0]._select.blurable:this.iterator("table",function(e){e._select.blurable=t})}),t("select.toggleable()",function(t){return t===h?this.context[0]._select.toggleable:this.iterator("table",function(e){e._select.toggleable=t})}),t("select.info()",function(t){return t===h?this.context[0]._select.info:this.iterator("table",function(e){e._select.info=t})}),t("select.items()",function(t){return t===h?this.context[0]._select.items:this.iterator("table",function(e){e._select.items=t,u(new _.Api(e),"selectItems",[t])})}),t("select.style()",function(l){return l===h?this.context[0]._select.style:this.iterator("table",function(e){e._select||_.select.init(new _.Api(e)),e._select_init||n(e),e._select.style=l;var t=new _.Api(e);s(t),"api"!==l&&c(t),u(new _.Api(e),"selectStyle",[l])})}),t("select.selector()",function(t){return t===h?this.context[0]._select.selector:this.iterator("table",function(e){s(new _.Api(e)),e._select.selector=t,"api"!==e._select.style&&c(new _.Api(e))})}),l("rows().select()","row().select()",function(e){var l=this;return!1===e?this.deselect():(this.iterator("row",function(e,t){f(e),e.aoData[t]._select_selected=!0,m(e.aoData[t].nTr).addClass(e._select.className)}),this.iterator("table",function(e,t){u(l,"select",["row",l[t]],!0)}),this)}),t("row().selected()",function(){var e=this.context[0];return!!(e&&this.length&&e.aoData[this[0]]&&e.aoData[this[0]]._select_selected)}),l("columns().select()","column().select()",function(e){var l=this;return!1===e?this.deselect():(this.iterator("column",function(e,t){f(e),e.aoColumns[t]._select_selected=!0;t=new _.Api(e).column(t);m(t.header()).addClass(e._select.className),m(t.footer()).addClass(e._select.className),t.nodes().to$().addClass(e._select.className)}),this.iterator("table",function(e,t){u(l,"select",["column",l[t]],!0)}),this)}),t("column().selected()",function(){var e=this.context[0];return!!(e&&this.length&&e.aoColumns[this[0]]&&e.aoColumns[this[0]]._select_selected)}),l("cells().select()","cell().select()",function(e){var l=this;return!1===e?this.deselect():(this.iterator("cell",function(e,t,l){f(e);t=e.aoData[t];t._selected_cells===h&&(t._selected_cells=[]),t._selected_cells[l]=!0,t.anCells&&m(t.anCells[l]).addClass(e._select.className)}),this.iterator("table",function(e,t){u(l,"select",["cell",l.cells(l[t]).indexes().toArray()],!0)}),this)}),t("cell().selected()",function(){var e=this.context[0];if(e&&this.length){e=e.aoData[this[0][0].row];if(e&&e._selected_cells&&e._selected_cells[this[0][0].column])return!0}return!1}),l("rows().deselect()","row().deselect()",function(){var l=this;return this.iterator("row",function(e,t){e.aoData[t]._select_selected=!1,e._select_lastCell=null,m(e.aoData[t].nTr).removeClass(e._select.className)}),this.iterator("table",function(e,t){u(l,"deselect",["row",l[t]],!0)}),this}),l("columns().deselect()","column().deselect()",function(){var l=this;return this.iterator("column",function(s,e){s.aoColumns[e]._select_selected=!1;var t=new _.Api(s),l=t.column(e);m(l.header()).removeClass(s._select.className),m(l.footer()).removeClass(s._select.className),t.cells(null,e).indexes().each(function(e){var t=s.aoData[e.row],l=t._selected_cells;!t.anCells||l&&l[e.column]||m(t.anCells[e.column]).removeClass(s._select.className)})}),this.iterator("table",function(e,t){u(l,"deselect",["column",l[t]],!0)}),this}),l("cells().deselect()","cell().deselect()",function(){var l=this;return this.iterator("cell",function(e,t,l){t=e.aoData[t];t._selected_cells!==h&&(t._selected_cells[l]=!1),t.anCells&&!e.aoColumns[l]._select_selected&&m(t.anCells[l]).removeClass(e._select.className)}),this.iterator("table",function(e,t){u(l,"deselect",["cell",l[t]],!0)}),this});var b=0;return m.extend(_.ext.buttons,{selected:{text:o("selected","Selected"),className:"buttons-selected",limitTo:["rows","columns","cells"],init:function(l,e,s){var c=this;s._eventNamespace=".select"+b++,l.on(a(s),function(){var e,t;c.enable((e=l,t=s,!(-1===m.inArray("rows",t.limitTo)||!e.rows({selected:!0}).any())||(!(-1===m.inArray("columns",t.limitTo)||!e.columns({selected:!0}).any())||!(-1===m.inArray("cells",t.limitTo)||!e.cells({selected:!0}).any()))))}),this.disable()},destroy:function(e,t,l){e.off(l._eventNamespace)}},selectedSingle:{text:o("selectedSingle","Selected single"),className:"buttons-selected-single",init:function(t,e,l){var s=this;l._eventNamespace=".select"+b++,t.on(a(l),function(){var e=t.rows({selected:!0}).flatten().length+t.columns({selected:!0}).flatten().length+t.cells({selected:!0}).flatten().length;s.enable(1===e)}),this.disable()},destroy:function(e,t,l){e.off(l._eventNamespace)}},selectAll:{text:o("selectAll","Select all"),className:"buttons-select-all",action:function(){var e=this.select.items();this[e+"s"]().select()}},selectNone:{text:o("selectNone","Deselect all"),className:"buttons-select-none",action:function(){f(this.settings()[0],!0)},init:function(t,e,l){var s=this;l._eventNamespace=".select"+b++,t.on(a(l),function(){var e=t.rows({selected:!0}).flatten().length+t.columns({selected:!0}).flatten().length+t.cells({selected:!0}).flatten().length;s.enable(0<e)}),this.disable()},destroy:function(e,t,l){e.off(l._eventNamespace)}}}),m.each(["Row","Column","Cell"],function(e,t){var c=t.toLowerCase();_.ext.buttons["select"+t+"s"]={text:o("select"+t+"s","Select "+c+"s"),className:"buttons-select-"+c+"s",action:function(){this.select.items(c)},init:function(e){var s=this;e.on("selectItems.dt.DT",function(e,t,l){s.active(l===c)})}}}),m(e).on("preInit.dt.dtSelect",function(e,t){"dt"===e.namespace&&_.select.init(new _.Api(t))}),_});/*! DateTime picker for DataTables.net v1.2.0
*
* © SpryMedia Ltd, all rights reserved.
* License: MIT datatables.net/license/mit
*/!function(s){"function"==typeof define&&define.amd?define(["jquery"],function(t){return s(t,window,document)}):"object"==typeof exports?module.exports=function(t,e){return t=t||window,e=e||("undefined"!=typeof window?require("jquery"):require("jquery")(t)),s(e,t,t.document)}:s(jQuery,window,document)}(function(C,o,i,n){"use strict";function a(t,e){void 0===r&&(r=o.moment||o.dayjs||o.luxon||null),this.c=C.extend(!0,{},a.defaults,e);var e=this.c.classPrefix,s=this.c.i18n;if(!r&&"YYYY-MM-DD"!==this.c.format)throw"DateTime: Without momentjs, dayjs or luxon only the format 'YYYY-MM-DD' can be used";"string"==typeof this.c.minDate&&(this.c.minDate=new Date(this.c.minDate)),"string"==typeof this.c.maxDate&&(this.c.maxDate=new Date(this.c.maxDate)),s=C('<div class="'+e+'"><div class="'+e+'-date"><div class="'+e+'-title"><div class="'+e+'-iconLeft"><button type="button" title="'+s.previous+'">'+s.previous+'</button></div><div class="'+e+'-iconRight"><button type="button" title="'+s.next+'">'+s.next+'</button></div><div class="'+e+'-label"><span></span><select class="'+e+'-month"></select></div><div class="'+e+'-label"><span></span><select class="'+e+'-year"></select></div></div><div class="'+e+'-buttons"><a class="'+e+'-clear">'+s.clear+'</a><a class="'+e+'-today">'+s.today+'</a></div><div class="'+e+'-calendar"></div></div><div class="'+e+'-time"><div class="'+e+'-hours"></div><div class="'+e+'-minutes"></div><div class="'+e+'-seconds"></div></div><div class="'+e+'-error"></div></div>'),this.dom={container:s,date:s.find("."+e+"-date"),title:s.find("."+e+"-title"),calendar:s.find("."+e+"-calendar"),time:s.find("."+e+"-time"),error:s.find("."+e+"-error"),buttons:s.find("."+e+"-buttons"),clear:s.find("."+e+"-clear"),today:s.find("."+e+"-today"),input:C(t)},this.s={d:null,display:null,minutesRange:null,secondsRange:null,namespace:"dateime-"+a._instance++,parts:{date:null!==this.c.format.match(/[YMD]|L(?!T)|l/),time:null!==this.c.format.match(/[Hhm]|LT|LTS/),seconds:-1!==this.c.format.indexOf("s"),hours12:null!==this.c.format.match(/[haA]/)}},this.dom.container.append(this.dom.date).append(this.dom.time).append(this.dom.error),this.dom.date.append(this.dom.title).append(this.dom.buttons).append(this.dom.calendar),this._constructor()}var r;return C.extend(a.prototype,{destroy:function(){this._hide(!0),this.dom.container.off().empty(),this.dom.input.removeAttr("autocomplete").off(".datetime")},errorMsg:function(t){var e=this.dom.error;return t?e.html(t):e.empty(),this},hide:function(){return this._hide(),this},max:function(t){return this.c.maxDate="string"==typeof t?new Date(t):t,this._optionsTitle(),this._setCalander(),this},min:function(t){return this.c.minDate="string"==typeof t?new Date(t):t,this._optionsTitle(),this._setCalander(),this},owns:function(t){return 0<C(t).parents().filter(this.dom.container).length},val:function(t,e){var s;return t===n?this.s.d:(t instanceof Date?this.s.d=this._dateToUtc(t):null===t||""===t?this.s.d=null:"--now"===t?this.s.d=this._dateToUtc(new Date):"string"==typeof t&&(r&&r==o.luxon?(s=r.DateTime.fromFormat(t,this.c.format),this.s.d=s.isValid?s.toJSDate():null):r?(s=r.utc(t,this.c.format,this.c.locale,this.c.strict),this.s.d=s.isValid()?s.toDate():null):(s=t.match(/(\d{4})\-(\d{2})\-(\d{2})/),this.s.d=s?new Date(Date.UTC(s[1],s[2]-1,s[3])):null)),!e&&e!==n||(this.s.d?this._writeOutput():this.dom.input.val(t)),this.s.display=this.s.d?new Date(this.s.d.toString()):new Date,this.s.display.setUTCDate(1),this._setTitle(),this._setCalander(),this._setTime(),this)},_constructor:function(){function a(){var t=o.dom.input.val();t!==e&&(o.c.onChange.call(o,t,o.s.d,o.dom.input),e=t)}var o=this,r=this.c.classPrefix,e=this.dom.input.val();this.s.parts.date||this.dom.date.css("display","none"),this.s.parts.time||this.dom.time.css("display","none"),this.s.parts.seconds||(this.dom.time.children("div."+r+"-seconds").remove(),this.dom.time.children("span").eq(1).remove()),this.c.buttons.clear||this.dom.clear.css("display","none"),this.c.buttons.today||this.dom.today.css("display","none"),this._optionsTitle(),C(i).on("i18n.dt",function(t,e){e.oLanguage.datetime&&(C.extend(!0,o.c.i18n,e.oLanguage.datetime),o._optionsTitle())}),"hidden"===this.dom.input.attr("type")&&(this.dom.container.addClass("inline"),this.c.attachTo="input",this.val(this.dom.input.val(),!1),this._show()),e&&this.val(e,!1),this.dom.input.attr("autocomplete","off").on("focus.datetime click.datetime",function(){o.dom.container.is(":visible")||o.dom.input.is(":disabled")||(o.val(o.dom.input.val(),!1),o._show())}).on("keyup.datetime",function(){o.dom.container.is(":visible")&&o.val(o.dom.input.val(),!1)}),this.dom.container.on("change","select",function(){var t,e,s=C(this),i=s.val();s.hasClass(r+"-month")?(o._correctMonth(o.s.display,i),o._setTitle(),o._setCalander()):s.hasClass(r+"-year")?(o.s.display.setUTCFullYear(i),o._setTitle(),o._setCalander()):s.hasClass(r+"-hours")||s.hasClass(r+"-ampm")?(o.s.parts.hours12?(t=+C(o.dom.container).find("."+r+"-hours").val(),e="pm"===C(o.dom.container).find("."+r+"-ampm").val(),o.s.d.setUTCHours(12!=t||e?e&&12!=t?12+t:t:0)):o.s.d.setUTCHours(i),o._setTime(),o._writeOutput(!0),a()):s.hasClass(r+"-minutes")?(o.s.d.setUTCMinutes(i),o._setTime(),o._writeOutput(!0),a()):s.hasClass(r+"-seconds")&&(o.s.d.setSeconds(i),o._setTime(),o._writeOutput(!0),a()),o.dom.input.focus(),o._position()}).on("click",function(t){var e=o.s.d,s="span"===t.target.nodeName.toLowerCase()?t.target.parentNode:t.target,i=s.nodeName.toLowerCase();if("select"!==i)if(t.stopPropagation(),"a"===i&&(t.preventDefault(),C(s).hasClass(r+"-clear")?(o.s.d=null,o.dom.input.val(""),o._writeOutput(),o._setCalander(),o._setTime(),a()):C(s).hasClass(r+"-today")&&(o.s.display=new Date,o._setTitle(),o._setCalander())),"button"===i){t=C(s),i=t.parent();if(i.hasClass("disabled")&&!i.hasClass("range"))t.blur();else if(i.hasClass(r+"-iconLeft"))o.s.display.setUTCMonth(o.s.display.getUTCMonth()-1),o._setTitle(),o._setCalander(),o.dom.input.focus();else if(i.hasClass(r+"-iconRight"))o._correctMonth(o.s.display,o.s.display.getUTCMonth()+1),o._setTitle(),o._setCalander(),o.dom.input.focus();else{if(t.parents("."+r+"-time").length){var s=t.data("value"),n=t.data("unit"),e=o._needValue();if("minutes"===n){if(i.hasClass("disabled")&&i.hasClass("range"))return o.s.minutesRange=s,void o._setTime();o.s.minutesRange=null}if("seconds"===n){if(i.hasClass("disabled")&&i.hasClass("range"))return o.s.secondsRange=s,void o._setTime();o.s.secondsRange=null}if("am"===s){if(!(12<=e.getUTCHours()))return;s=e.getUTCHours()-12}else if("pm"===s){if(!(e.getUTCHours()<12))return;s=e.getUTCHours()+12}e["hours"===n?"setUTCHours":"minutes"===n?"setUTCMinutes":"setSeconds"](s),o._setCalander(),o._setTime(),o._writeOutput(!0)}else(e=o._needValue()).setUTCDate(1),e.setUTCFullYear(t.data("year")),e.setUTCMonth(t.data("month")),e.setUTCDate(t.data("day")),o._writeOutput(!0),o.s.parts.time?(o._setCalander(),o._setTime()):setTimeout(function(){o._hide()},10);a()}}else o.dom.input.focus()})},_compareDates:function(t,e){return r&&r==o.luxon?r.DateTime.fromJSDate(t).toISODate()===r.DateTime.fromJSDate(e).toISODate():this._dateToUtcString(t)===this._dateToUtcString(e)},_correctMonth:function(t,e){var s=this._daysInMonth(t.getUTCFullYear(),e),i=t.getUTCDate()>s;t.setUTCMonth(e),i&&(t.setUTCDate(s),t.setUTCMonth(e))},_daysInMonth:function(t,e){return[31,t%4==0&&(t%100!=0||t%400==0)?29:28,31,30,31,30,31,31,30,31,30,31][e]},_dateToUtc:function(t){return new Date(Date.UTC(t.getFullYear(),t.getMonth(),t.getDate(),t.getHours(),t.getMinutes(),t.getSeconds()))},_dateToUtcString:function(t){return r&&r==o.luxon?r.DateTime.fromJSDate(t).toISODate():t.getUTCFullYear()+"-"+this._pad(t.getUTCMonth()+1)+"-"+this._pad(t.getUTCDate())},_hide:function(t){!t&&"hidden"===this.dom.input.attr("type")||(t=this.s.namespace,this.dom.container.detach(),C(o).off("."+t),C(i).off("keydown."+t),C("div.dataTables_scrollBody").off("scroll."+t),C("div.DTE_Body_Content").off("scroll."+t),C("body").off("click."+t),C(this.dom.input[0].offsetParent).off("."+t))},_hours24To12:function(t){return 0===t?12:12<t?t-12:t},_htmlDay:function(t){var e,s;return t.empty?'<td class="empty"></td>':(e=["selectable"],s=this.c.classPrefix,t.disabled&&e.push("disabled"),t.today&&e.push("now"),t.selected&&e.push("selected"),'<td data-day="'+t.day+'" class="'+e.join(" ")+'"><button class="'+s+"-button "+s+'-day" type="button" data-year="'+t.year+'" data-month="'+t.month+'" data-day="'+t.day+'"><span>'+t.day+"</span></button></td>")},_htmlMonth:function(t,e){for(var s=this._dateToUtc(new Date),i=this._daysInMonth(t,e),n=new Date(Date.UTC(t,e,1)).getUTCDay(),a=[],o=[],r=(0<this.c.firstDay&&(n-=this.c.firstDay)<0&&(n+=7),i+n),d=r;7<d;)d-=7;r+=7-d;var l=this.c.minDate,h=this.c.maxDate;l&&(l.setUTCHours(0),l.setUTCMinutes(0),l.setSeconds(0)),h&&(h.setUTCHours(23),h.setUTCMinutes(59),h.setSeconds(59));for(var c=0,u=0;c<r;c++){var m=new Date(Date.UTC(t,e,c-n+1)),f=!!this.s.d&&this._compareDates(m,this.s.d),p=this._compareDates(m,s),y=c<n||i+n<=c,T=l&&m<l||h&&h<m,_=this.c.disableDays,f={day:c-n+1,month:e,year:t,selected:f,today:p,disabled:T=Array.isArray(_)&&-1!==C.inArray(m.getUTCDay(),_)||"function"==typeof _&&!0===_(m)?!0:T,empty:y};o.push(this._htmlDay(f)),7==++u&&(this.c.showWeekNumber&&o.unshift(this._htmlWeekOfYear(c-n,e,t)),a.push("<tr>"+o.join("")+"</tr>"),o=[],u=0)}var v,D=this.c.classPrefix,g=D+"-table";return this.c.showWeekNumber&&(g+=" weekNumber"),l&&(v=l>=new Date(Date.UTC(t,e,1,0,0,0)),this.dom.title.find("div."+D+"-iconLeft").css("display",v?"none":"block")),h&&(v=h<new Date(Date.UTC(t,e+1,1,0,0,0)),this.dom.title.find("div."+D+"-iconRight").css("display",v?"none":"block")),'<table class="'+g+'"><thead>'+this._htmlMonthHead()+"</thead><tbody>"+a.join("")+"</tbody></table>"},_htmlMonthHead:function(){var t=[],e=this.c.firstDay,s=this.c.i18n;this.c.showWeekNumber&&t.push("<th></th>");for(var i=0;i<7;i++)t.push("<th>"+function(t){for(t+=e;7<=t;)t-=7;return s.weekdays[t]}(i)+"</th>");return t.join("")},_htmlWeekOfYear:function(t,e,s){e=new Date(s,e,t,0,0,0,0),e.setDate(e.getDate()+4-(e.getDay()||7)),t=new Date(s,0,1),s=Math.ceil(((e-t)/864e5+1)/7);return'<td class="'+this.c.classPrefix+'-week">'+s+"</td>"},_needValue:function(){return this.s.d||(this.s.d=this._dateToUtc(new Date),this.s.parts.time)||(this.s.d.setUTCHours(0),this.s.d.setUTCMinutes(0),this.s.d.setSeconds(0),this.s.d.setMilliseconds(0)),this.s.d},_options:function(t,e,s){s=s||e;var i=this.dom.container.find("select."+this.c.classPrefix+"-"+t);i.empty();for(var n=0,a=e.length;n<a;n++)i.append('<option value="'+e[n]+'">'+s[n]+"</option>")},_optionSet:function(t,e){var t=this.dom.container.find("select."+this.c.classPrefix+"-"+t),s=t.parent().children("span"),e=(t.val(e),t.find("option:selected"));s.html(0!==e.length?e.text():this.c.i18n.unknown)},_optionsTime:function(n,a,o,r,t){var e,d=this.c.classPrefix,s=this.dom.container.find("div."+d+"-"+n),i=12===a?function(t){return t}:this._pad,l=(d=this.c.classPrefix)+"-table",h=this.c.i18n;if(s.length){var c="",u=10,m=function(t,e,s){12===a&&"number"==typeof t&&(12<=o&&(t+=12),12==t?t=0:24==t&&(t=12));var i=o===t||"am"===t&&o<12||"pm"===t&&12<=o?"selected":"";return"number"==typeof t&&r&&-1===C.inArray(t,r)&&(i+=" disabled"),s&&(i+=" "+s),'<td class="selectable '+i+'"><button class="'+d+"-button "+d+'-day" type="button" data-unit="'+n+'" data-value="'+t+'"><span>'+e+"</span></button></td>"};if(12===a){for(c+="<tr>",e=1;e<=6;e++)c+=m(e,i(e));for(c=(c+=m("am",h.amPm[0]))+"</tr>"+"<tr>",e=7;e<=12;e++)c+=m(e,i(e));c=c+m("pm",h.amPm[1])+"</tr>",u=7}else{if(24===a)for(var f=0,p=0;p<4;p++){for(c+="<tr>",e=0;e<6;e++)c+=m(f,i(f)),f++;c+="</tr>"}else{for(c+="<tr>",p=0;p<60;p+=10)c+=m(p,i(p),"range");var c=c+"</tr>"+('</tbody></thead><table class="'+l+" "+l+'-nospace"><tbody>'),y=null!==t?t:-1===o?0:10*Math.floor(o/10);for(c+="<tr>",p=y+1;p<y+10;p++)c+=m(p,i(p));c+="</tr>"}u=6}s.empty().append('<table class="'+l+'"><thead><tr><th colspan="'+u+'">'+h[n]+"</th></tr></thead><tbody>"+c+"</tbody></table>")}},_optionsTitle:function(){var t=this.c.i18n,e=this.c.minDate,s=this.c.maxDate,e=e?e.getFullYear():null,s=s?s.getFullYear():null,e=null!==e?e:(new Date).getFullYear()-this.c.yearRange,s=null!==s?s:(new Date).getFullYear()+this.c.yearRange;this._options("month",this._range(0,11),t.months),this._options("year",this._range(e,s))},_pad:function(t){return t<10?"0"+t:t},_position:function(){var t,e,s,i="input"===this.c.attachTo?this.dom.input.position():this.dom.input.offset(),n=this.dom.container,a=this.dom.input.outerHeight();n.hasClass("inline")?n.insertAfter(this.dom.input):(this.s.parts.date&&this.s.parts.time&&550<C(o).width()?n.addClass("horizontal"):n.removeClass("horizontal"),"input"===this.c.attachTo?n.css({top:i.top+a,left:i.left}).insertAfter(this.dom.input):n.css({top:i.top+a,left:i.left}).appendTo("body"),t=n.outerHeight(),e=n.outerWidth(),s=C(o).scrollTop(),i.top+a+t-s>C(o).height()&&(a=i.top-t,n.css("top",a<0?0:a)),e+i.left>C(o).width()&&(s=C(o).width()-e,"input"===this.c.attachTo&&(s-=C(n).offsetParent().offset().left),n.css("left",s<0?0:s)))},_range:function(t,e,s){var i=[];s=s||1;for(var n=t;n<=e;n+=s)i.push(n);return i},_setCalander:function(){this.s.display&&this.dom.calendar.empty().append(this._htmlMonth(this.s.display.getUTCFullYear(),this.s.display.getUTCMonth()))},_setTitle:function(){this._optionSet("month",this.s.display.getUTCMonth()),this._optionSet("year",this.s.display.getUTCFullYear())},_setTime:function(){function t(t){return e.c[t+"Available"]||e._range(0,59,e.c[t+"Increment"])}var e=this,s=this.s.d,i=null,n=null!=(i=r&&r==o.luxon?r.DateTime.fromJSDate(s):i)?i.hour:s?s.getUTCHours():-1;this._optionsTime("hours",this.s.parts.hours12?12:24,n,this.c.hoursAvailable),this._optionsTime("minutes",60,null!=i?i.minute:s?s.getUTCMinutes():-1,t("minutes"),this.s.minutesRange),this._optionsTime("seconds",60,null!=i?i.second:s?s.getSeconds():-1,t("seconds"),this.s.secondsRange)},_show:function(){var e=this,t=this.s.namespace,s=(this._position(),C(o).on("scroll."+t+" resize."+t,function(){e._position()}),C("div.DTE_Body_Content").on("scroll."+t,function(){e._position()}),C("div.dataTables_scrollBody").on("scroll."+t,function(){e._position()}),this.dom.input[0].offsetParent);s!==i.body&&C(s).on("scroll."+t,function(){e._position()}),C(i).on("keydown."+t,function(t){9!==t.keyCode&&27!==t.keyCode&&13!==t.keyCode||e._hide()}),setTimeout(function(){C("body").on("click."+t,function(t){C(t.target).parents().filter(e.dom.container).length||t.target===e.dom.input[0]||e._hide()})},10)},_writeOutput:function(t){var e=this.s.d,s="";e&&(s=r&&r==o.luxon?r.DateTime.fromJSDate(this.s.d).toFormat(this.c.format):r?r.utc(e,n,this.c.locale,this.c.strict).format(this.c.format):e.getUTCFullYear()+"-"+this._pad(e.getUTCMonth()+1)+"-"+this._pad(e.getUTCDate())),this.dom.input.val(s).trigger("change",{write:e}),"hidden"===this.dom.input.attr("type")&&this.val(s,!1),t&&this.dom.input.focus()}}),a.use=function(t){r=t},a._instance=0,a.defaults={attachTo:"body",buttons:{clear:!1,today:!1},classPrefix:"dt-datetime",disableDays:null,firstDay:1,format:"YYYY-MM-DD",hoursAvailable:null,i18n:{clear:"Clear",previous:"Previous",next:"Next",months:["January","February","March","April","May","June","July","August","September","October","November","December"],weekdays:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],amPm:["am","pm"],hours:"Hour",minutes:"Minute",seconds:"Second",unknown:"-",today:"Today"},maxDate:null,minDate:null,minutesAvailable:null,minutesIncrement:1,strict:!0,locale:"en",onChange:function(){},secondsAvailable:null,secondsIncrement:1,showWeekNumber:!1,yearRange:25},a.version="1.2.0",o.DateTime||(o.DateTime=a),C.fn.dtDateTime=function(t){return this.each(function(){new a(this,t)})},C.fn.dataTable&&(C.fn.dataTable.DateTime=a,C.fn.DataTable.DateTime=a,C.fn.dataTable.Editor)&&(C.fn.dataTable.Editor.DateTime=a),a});(function(window,document,$){$(document).on('init.dt',function(e,dtSettings){if(e.namespace!=='dt'){return;}
var options=dtSettings.oInit.conditionalPaging||$.fn.dataTable.defaults.conditionalPaging;if($.isPlainObject(options)||options===true){var config=$.isPlainObject(options)?options:{},api=new $.fn.dataTable.Api(dtSettings),speed='slow',conditionalPaging=function(e){var $paging=$(api.table().container()).find('div.dataTables_paginate'),pages=api.page.info().pages;if(e instanceof $.Event){if(pages<=1){if(config.style==='fade'){$paging.stop().fadeTo(speed,0);}
else{$paging.css('visibility','hidden');}}
else{if(config.style==='fade'){$paging.stop().fadeTo(speed,1);}
else{$paging.css('visibility','');}}}
else if(pages<=1){if(config.style==='fade'){$paging.css('opacity',0);}
else{$paging.css('visibility','hidden');}}};if(config.speed!==undefined){speed=config.speed;}
conditionalPaging();api.on('draw.dt',conditionalPaging);}});})(window,document,jQuery);

/**********ControllerfürUpload**********************/
myApp.controller("uploadFilesCtrl",['$scope','uploadService','backendService','$modal','$log',function($scope,uploadService,backendService,$modal,$log){

    $scope.btnBrowse='';
    $scope.btnUpload='';
    $scope.btnDownReport='';
    $scope.tab2Rates=true;
    $scope.tab3Rates=true;
    $scope.ttDafRates=null;

    $scope.addToFileList=function(element){

      for(i=0;i<element.files.length;i++){
        element.files[i].progressBar=0;
        element.files[i].progressTxt='';
        element.files[i].completeTxt='';
        element.files[i].completeStatus='';

        element.files[i].isSuccess=false;
        element.files[i].isCancel=false;
        element.files[i].isError=false;
      }
      $scope.$apply(function($scope){
        $scope.files=element.files;
      });
      $scope.btnUpload='';
    }


    $scope.uploadFileList=function(){
      var service='dafValor.p&serviceName=uploadFiles';
      var params='';

      var callObj=function(type,files,data){
        //Meldung von Server nach upload
        if(type=='1'){
          /***********Rates*************/
          $scope.$apply(function($scope){
            $scope.files=files;
            $scope.rateUpdate=true;
            console.log($scope.files);
          });
          if($scope.files[0].completeStatus!='danger'){
            $scope.ttDafRates=data.dsWebService.ttDafRates;
            console.log($scope.ttDafRates);
            console.log($scope);
            for(i=0;i<data.dsWebService.ttWsInformation.length;i++){
              if(data.dsWebService.ttWsInformation[i].type=='ratesPanelHeading'){
                $scope.ratesPanelHeading=data.dsWebService.ttWsInformation[i].body;
                $scope.tab2Rates=false;
                console.log($scope);
              }
            }
            $scope.$apply(function(){$scope.$broadcast('selectTab',2);});
            $scope.btnImport='';
          }
          else{
            $scope.btnImport='false';
          }
        }
        //Uploadprogress
        else if(type='2'){
          $scope.$apply(function($scope){
            $scope.files=files;
          });
        }
      }

      uploadService.uploadFile($scope.files,callObj,service);
    }
/*
$scope.submitRates=function(){
//DAFRates
vardafRatesSave=function(data){
$scope.rateUpdate='';
$scope.ttDafRates=data.ttDafRates;
//console.log($scope.ttDafRates);
//console.log($scope);
$scope.$broadcast('selectTab',3);

}

vardafRatesService='dafValor.p&serviceName=setDafRates';
vardafRatesObject={ttDafRates:$scope.ttDafRates};
backendService.setData(dafRatesSave,dafRatesService,dafRatesObject);

}

$scope.checkRate=function(index){
//alert(/^[0-9]+(\.[0-9]{1,2})?$/.test($scope.ttDafRates[index].rate));

}

$scope.editDafRates=function(index){
$scope.selectedRow=index;
varModalInstanceCtrl=function($scope,$modalInstance,ttDafRate,$filter){
$scope.ttDafRate=ttDafRate;
$scope.ttDafRate.rateDatum=$filter('date')($scope.originalText);
$scope.ok=function(){$modalInstance.close($scope.ttDafRate);};
$scope.cancel=function(){
$modalInstance.dismiss('cancel');
};

};

varmodalInstance=$modal.open({
animation:true,
templateUrl:'./pages/tna/daf_rates_e.html',
controller:ModalInstanceCtrl,
size:'md',
resolve:{
ttDafRate:function(){
return$scope.ttDafRates[index];;
}
}
});

varoriginalttDafRate=angular.copy($scope.ttDafRates[index]);

modalInstance.result.then(function(ttDafRate){
$scope.ttDafRates[index]=ttDafRate;
$scope.submitRate($scope.ttDafRates[index]);
},function(){
$scope.ttDafRates[index]=originalttDafRate;
$log.info('Modaldismissedat:'+newDate());
});

$scope.submitRate=function(ttDafRate){
//DAFRates
vardafRateSave=function(data){
console.log(data);
console.log($scope);
}

vardafRateService='dafValor.p&serviceName=setDafRate';
vardafRateObject={ttDafRates:[ttDafRate]};
backendService.setData(dafRateSave,dafRateService,dafRateObject);

}

$scope.checkRate=function(index){
alert(/^[0-9]+(\.[0-9]{1,2})?$/.test($scope.ttDafRates[index].rate));

}

}

$scope.selectedRow=null;
$scope.setClickedRow=function(index){
$scope.selectedRow=index;
}

vardata={a:1,b:2,c:3};
varjson=JSON.stringify(data);
$scope.getBlob=function(){
returnnewBlob([json],{type:"application/json"});
}
*/

}]);

/**********FactoryfürUpload**********************/
myApp.factory('uploadService',['$http','$rootScope',function($http,$rootscope){
varsvc={};

varrootUrl=$rootscope.endPoint;

vargfiles;
vargcallObj;
varfile;

svc.uploadFile=function(files,callObj,Service){
varurl=rootUrl+Service;

gfiles=files;
file=files[0];
gcallObj=callObj;
//alert(file.name+"|"+file.size+"|"+file.type);
varformdata=newFormData();
formdata.append("file",file);
formdata.append("filename",file.name);
varajax=newXMLHttpRequest();
ajax.upload.addEventListener("progress",progressHandler,false);
ajax.addEventListener("load",completeHandler,false);
ajax.addEventListener("error",errorHandler,false);
ajax.addEventListener("abort",abortHandler,false);

ajax.open("POST",url);

//ajax.setRequestHeader("Content-type",'');
//Content-Disposition:form-data;name="Resource";filename="TEST_SCORM.zip"
//Content-Type:application/zip

ajax.send(formdata);
}

functionprogressHandler(event){
//console.log(event);

file.progressBar=Math.round((event.loaded/event.total)*100);
file.progressTxt="Uploaded"+(event.loaded/1024).toFixed(0)+"bytesof"+(event.total/1024).toFixed(0);
gcallObj('2',gfiles);

}

functioncompleteHandler(event){
vardata=JSON.parse(event.target.responseText);
for(i=0;i<data.dsWebService.ttWsInformation.length;i++){
if(data.dsWebService.ttWsInformation[i].type=='completeStatus'){
file.completeTxt=data.dsWebService.ttWsInformation[i].body;
file.completeStatus=data.dsWebService.ttWsInformation[i].subject;
}
}
file.isSuccess=true;
gcallObj('1',gfiles,data);
}
functionerrorHandler(event){
file.isError=true;
gcallObj('2',gfiles);
}
functionabortHandler(event){
file.isCancel=true;
gcallObj('2',gfiles);
}

svc.uploadfiles=function(files,callObj){

varurl=rootUrl;

for(vari=0;i<files.length;i++)
{
varfd=newFormData();
varx2js=newX2JS();

fd.append("data",i);

fd.append("file",files[i]);

$http.post(url,fd,{

withCredentials:false,

headers:{
'Content-Type':undefined
},
transformRequest:angular.identity

})
.success(function(data)
{
data=x2js.xml_str2json(data);
data=data.dsWebService;
callObj(data);
})
.error(function(data)
{
callObj(data);
});
}
}

returnsvc;

}]);

myApp.directive('myDownload',function($compile){
return{
restrict:'E',
scope:{getUrlData:'&getData'},
link:function(scope,elm,attrs){
varurl=URL.createObjectURL(scope.getUrlData());
elm.append($compile(
'<aclass="btn"download="backup.json"'+
'href="'+url+'">'+
'Download'+
'</a>'
)(scope));
}
};
});

myApp.directive('stringToNumber',function(){
return{
require:'ngModel',
link:function(scope,element,attrs,ngModel){
ngModel.$parsers.push(function(value){
return''+value;
});
ngModel.$formatters.push(function(value){
returnparseFloat(value,9);
});
}
};
});

myApp.directive('checkRate',function(){

return{
restrict:'A',
require:'ngModel',
link:function(scope,element,attr,ngModel){

functionrateParser(viewValue){

ngModel.$setValidity('rate',/^[0-9]+(\.[0-9]{1,2})?$/.test(viewValue));

returnviewValue;
}
ngModel.$parsers.push(rateParser);
}

}

})

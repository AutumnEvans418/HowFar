Bridge.assembly("HowFar.Bridge", function ($asm, globals) {
    "use strict";


    var $m = Bridge.setMetadata,
        $n = ["System","System.Threading.Tasks","System.Collections.Generic","HowFar.Core.Models"];
    $m("HowFar.Bridge.App", function () { return {"att":1048577,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":2,"n":"Main","is":true,"t":8,"sn":"Main","rt":$n[0].Void}]}; }, $n);
    $m("HowFar.Core.BindableBase", function () { return {"att":1048577,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"v":true,"a":3,"n":"OnPropertyChanged","t":8,"pi":[{"n":"propertyName","dv":null,"o":true,"pt":$n[0].String,"ps":0}],"sn":"OnPropertyChanged","rt":$n[0].Void,"p":[$n[0].String]},{"a":2,"n":"SetProperty","t":8,"pi":[{"n":"property","ref":true,"pt":System.Object,"ps":0},{"n":"value","pt":System.Object,"ps":1},{"n":"action","dv":null,"o":true,"pt":Function,"ps":2},{"n":"name","dv":null,"o":true,"pt":$n[0].String,"ps":3}],"tpc":1,"tprm":["T"],"sn":"SetProperty","rt":$n[0].Void,"p":[System.Object,System.Object,Function,$n[0].String]},{"a":2,"n":"PropertyChanged","t":2,"ad":{"a":2,"n":"add_PropertyChanged","t":8,"pi":[{"n":"value","pt":Function,"ps":0}],"sn":"addPropertyChanged","rt":$n[0].Void,"p":[Function]},"r":{"a":2,"n":"remove_PropertyChanged","t":8,"pi":[{"n":"value","pt":Function,"ps":0}],"sn":"removePropertyChanged","rt":$n[0].Void,"p":[Function]}}]}; }, $n);
    $m("HowFar.Core.Models.AppModel", function () { return {"att":1048577,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":2,"n":"SavePropertiesAsync","t":8,"sn":"SavePropertiesAsync","rt":$n[1].Task},{"a":2,"n":"Properties","t":16,"rt":$n[2].IDictionary$2(System.String,System.Object),"g":{"a":2,"n":"get_Properties","t":8,"rt":$n[2].IDictionary$2(System.String,System.Object),"fg":"Properties"},"fn":"Properties"},{"a":1,"n":"__Property__Initializer__Properties","t":4,"rt":$n[2].IDictionary$2(System.String,System.Object),"sn":"__Property__Initializer__Properties"},{"a":1,"backing":true,"n":"<Properties>k__BackingField","t":4,"rt":$n[2].IDictionary$2(System.String,System.Object),"sn":"Properties"}]}; }, $n);
    $m("HowFar.Core.Models.IApp", function () { return {"att":161,"a":2,"m":[{"ab":true,"a":2,"n":"SavePropertiesAsync","t":8,"sn":"HowFar$Core$Models$IApp$SavePropertiesAsync","rt":$n[1].Task},{"ab":true,"a":2,"n":"Properties","t":16,"rt":$n[2].IDictionary$2(System.String,System.Object),"g":{"ab":true,"a":2,"n":"get_Properties","t":8,"rt":$n[2].IDictionary$2(System.String,System.Object),"fg":"HowFar$Core$Models$IApp$Properties"},"fn":"HowFar$Core$Models$IApp$Properties"},{"a":1,"backing":true,"n":"<Properties>k__BackingField","t":4,"rt":$n[2].IDictionary$2(System.String,System.Object),"sn":"HowFar$Core$Models$IApp$Properties"}]}; }, $n);
    $m("HowFar.Core.Models.IMeasureConverters", function () { return {"att":161,"a":2,"m":[{"ab":true,"a":2,"n":"Convert","t":8,"pi":[{"n":"from","pt":$n[3].ObjectMeasurement,"ps":0},{"n":"to","pt":$n[3].ObjectMeasurement,"ps":1},{"n":"valueFrom","dv":1.0,"o":true,"pt":$n[0].Double,"ps":2}],"sn":"HowFar$Core$Models$IMeasureConverters$Convert","rt":$n[0].Double,"p":[$n[3].ObjectMeasurement,$n[3].ObjectMeasurement,$n[0].Double],"box":function ($v) { return Bridge.box($v, System.Double, System.Double.format, System.Double.getHashCode);}},{"ab":true,"a":2,"n":"Convert","t":8,"pi":[{"n":"nameFrom","pt":$n[0].String,"ps":0},{"n":"nameTo","pt":$n[0].String,"ps":1},{"n":"valueFrom","dv":1.0,"o":true,"pt":$n[0].Double,"ps":2}],"sn":"HowFar$Core$Models$IMeasureConverters$Convert$1","rt":$n[0].Double,"p":[$n[0].String,$n[0].String,$n[0].Double],"box":function ($v) { return Bridge.box($v, System.Double, System.Double.format, System.Double.getHashCode);}},{"ab":true,"a":2,"n":"DeleteObject","t":8,"pi":[{"n":"selectedObject","pt":$n[3].ObjectMeasurement,"ps":0}],"sn":"HowFar$Core$Models$IMeasureConverters$DeleteObject","rt":$n[0].Void,"p":[$n[3].ObjectMeasurement]},{"ab":true,"a":2,"n":"DeletePack","t":8,"pi":[{"n":"pack","pt":$n[3].ObjectPack,"ps":0}],"sn":"HowFar$Core$Models$IMeasureConverters$DeletePack","rt":$n[0].Void,"p":[$n[3].ObjectPack]},{"ab":true,"a":2,"n":"Find","t":8,"pi":[{"n":"name","pt":$n[0].String,"ps":0}],"sn":"HowFar$Core$Models$IMeasureConverters$Find","rt":$n[3].ObjectMeasurement,"p":[$n[0].String]},{"ab":true,"a":2,"n":"NewObject","t":8,"pi":[{"n":"pluralName","pt":$n[0].String,"ps":0},{"n":"singleName","pt":$n[0].String,"ps":1},{"n":"value","pt":$n[0].Double,"ps":2},{"n":"measurement","pt":$n[3].ObjectMeasurement,"ps":3},{"n":"pack","dv":"Custom","o":true,"pt":$n[0].String,"ps":4}],"sn":"HowFar$Core$Models$IMeasureConverters$NewObject","rt":$n[3].ObjectMeasurement,"p":[$n[0].String,$n[0].String,$n[0].Double,$n[3].ObjectMeasurement,$n[0].String]},{"ab":true,"a":2,"n":"NewObject","t":8,"pi":[{"n":"pluralName","pt":$n[0].String,"ps":0},{"n":"singleName","pt":$n[0].String,"ps":1},{"n":"value","pt":$n[0].Double,"ps":2},{"n":"measurement","pt":$n[0].String,"ps":3},{"n":"pack","dv":"Custom","o":true,"pt":$n[0].String,"ps":4}],"sn":"HowFar$Core$Models$IMeasureConverters$NewObject$1","rt":$n[3].ObjectMeasurement,"p":[$n[0].String,$n[0].String,$n[0].Double,$n[0].String,$n[0].String]},{"ab":true,"a":2,"n":"NewPack","t":8,"pi":[{"n":"pack","pt":$n[3].ObjectPack,"ps":0}],"sn":"HowFar$Core$Models$IMeasureConverters$NewPack","rt":$n[0].Void,"p":[$n[3].ObjectPack]},{"ab":true,"a":2,"n":"UpdateObject","t":8,"pi":[{"n":"selectedObject","pt":$n[3].ObjectMeasurement,"ps":0}],"sn":"HowFar$Core$Models$IMeasureConverters$UpdateObject","rt":$n[0].Void,"p":[$n[3].ObjectMeasurement]},{"ab":true,"a":2,"n":"Centimeter","t":16,"rt":$n[3].ObjectMeasurement,"g":{"ab":true,"a":2,"n":"get_Centimeter","t":8,"rt":$n[3].ObjectMeasurement,"fg":"HowFar$Core$Models$IMeasureConverters$Centimeter"},"fn":"HowFar$Core$Models$IMeasureConverters$Centimeter"},{"ab":true,"a":2,"n":"ObjectMeasurements","t":16,"rt":$n[2].List$1(HowFar.Core.Models.ObjectMeasurement),"g":{"ab":true,"a":2,"n":"get_ObjectMeasurements","t":8,"rt":$n[2].List$1(HowFar.Core.Models.ObjectMeasurement),"fg":"HowFar$Core$Models$IMeasureConverters$ObjectMeasurements"},"s":{"ab":true,"a":2,"n":"set_ObjectMeasurements","t":8,"p":[$n[2].List$1(HowFar.Core.Models.ObjectMeasurement)],"rt":$n[0].Void,"fs":"HowFar$Core$Models$IMeasureConverters$ObjectMeasurements"},"fn":"HowFar$Core$Models$IMeasureConverters$ObjectMeasurements"},{"ab":true,"a":2,"n":"ObjectPacks","t":16,"rt":$n[2].List$1(HowFar.Core.Models.ObjectPack),"g":{"ab":true,"a":2,"n":"get_ObjectPacks","t":8,"rt":$n[2].List$1(HowFar.Core.Models.ObjectPack),"fg":"HowFar$Core$Models$IMeasureConverters$ObjectPacks"},"s":{"ab":true,"a":2,"n":"set_ObjectPacks","t":8,"p":[$n[2].List$1(HowFar.Core.Models.ObjectPack)],"rt":$n[0].Void,"fs":"HowFar$Core$Models$IMeasureConverters$ObjectPacks"},"fn":"HowFar$Core$Models$IMeasureConverters$ObjectPacks"},{"a":1,"backing":true,"n":"<Centimeter>k__BackingField","t":4,"rt":$n[3].ObjectMeasurement,"sn":"HowFar$Core$Models$IMeasureConverters$Centimeter"},{"a":1,"backing":true,"n":"<ObjectMeasurements>k__BackingField","t":4,"rt":$n[2].List$1(HowFar.Core.Models.ObjectMeasurement),"sn":"HowFar$Core$Models$IMeasureConverters$ObjectMeasurements"},{"a":1,"backing":true,"n":"<ObjectPacks>k__BackingField","t":4,"rt":$n[2].List$1(HowFar.Core.Models.ObjectPack),"sn":"HowFar$Core$Models$IMeasureConverters$ObjectPacks"}]}; }, $n);
    $m("HowFar.Core.Models.IObjectMeasurement", function () { return {"att":161,"a":2,"m":[{"ab":true,"a":2,"n":"Add","t":8,"pi":[{"n":"obj","pt":$n[3].ObjectMeasurement,"ps":0}],"sn":"HowFar$Core$Models$IObjectMeasurement$Add","rt":$n[0].Void,"p":[$n[3].ObjectMeasurement]},{"ab":true,"a":2,"n":"ToString","t":8,"sn":"HowFar$Core$Models$IObjectMeasurement$ToString","rt":$n[0].String},{"ab":true,"a":2,"n":"Image","t":16,"rt":$n[0].String,"g":{"ab":true,"a":2,"n":"get_Image","t":8,"rt":$n[0].String,"fg":"HowFar$Core$Models$IObjectMeasurement$Image"},"s":{"ab":true,"a":2,"n":"set_Image","t":8,"p":[$n[0].String],"rt":$n[0].Void,"fs":"HowFar$Core$Models$IObjectMeasurement$Image"},"fn":"HowFar$Core$Models$IObjectMeasurement$Image"},{"ab":true,"a":2,"n":"Measurement","t":16,"rt":$n[3].ObjectMeasurement,"g":{"ab":true,"a":2,"n":"get_Measurement","t":8,"rt":$n[3].ObjectMeasurement,"fg":"HowFar$Core$Models$IObjectMeasurement$Measurement"},"s":{"ab":true,"a":2,"n":"set_Measurement","t":8,"p":[$n[3].ObjectMeasurement],"rt":$n[0].Void,"fs":"HowFar$Core$Models$IObjectMeasurement$Measurement"},"fn":"HowFar$Core$Models$IObjectMeasurement$Measurement"},{"ab":true,"a":2,"n":"PluralName","t":16,"rt":$n[0].String,"g":{"ab":true,"a":2,"n":"get_PluralName","t":8,"rt":$n[0].String,"fg":"HowFar$Core$Models$IObjectMeasurement$PluralName"},"fn":"HowFar$Core$Models$IObjectMeasurement$PluralName"},{"ab":true,"a":2,"n":"SingleName","t":16,"rt":$n[0].String,"g":{"ab":true,"a":2,"n":"get_SingleName","t":8,"rt":$n[0].String,"fg":"HowFar$Core$Models$IObjectMeasurement$SingleName"},"fn":"HowFar$Core$Models$IObjectMeasurement$SingleName"},{"ab":true,"a":2,"n":"Value","t":16,"rt":$n[0].Double,"g":{"ab":true,"a":2,"n":"get_Value","t":8,"rt":$n[0].Double,"fg":"HowFar$Core$Models$IObjectMeasurement$Value","box":function ($v) { return Bridge.box($v, System.Double, System.Double.format, System.Double.getHashCode);}},"s":{"ab":true,"a":2,"n":"set_Value","t":8,"p":[$n[0].Double],"rt":$n[0].Void,"fs":"HowFar$Core$Models$IObjectMeasurement$Value"},"fn":"HowFar$Core$Models$IObjectMeasurement$Value"},{"a":1,"backing":true,"n":"<Image>k__BackingField","t":4,"rt":$n[0].String,"sn":"HowFar$Core$Models$IObjectMeasurement$Image"},{"a":1,"backing":true,"n":"<Measurement>k__BackingField","t":4,"rt":$n[3].ObjectMeasurement,"sn":"HowFar$Core$Models$IObjectMeasurement$Measurement"},{"a":1,"backing":true,"n":"<PluralName>k__BackingField","t":4,"rt":$n[0].String,"sn":"HowFar$Core$Models$IObjectMeasurement$PluralName"},{"a":1,"backing":true,"n":"<SingleName>k__BackingField","t":4,"rt":$n[0].String,"sn":"HowFar$Core$Models$IObjectMeasurement$SingleName"},{"a":1,"backing":true,"n":"<Value>k__BackingField","t":4,"rt":$n[0].Double,"sn":"HowFar$Core$Models$IObjectMeasurement$Value","box":function ($v) { return Bridge.box($v, System.Double, System.Double.format, System.Double.getHashCode);}}]}; }, $n);
    $m("HowFar.Core.Models.IObjectRepository", function () { return {"att":161,"a":2,"m":[{"ab":true,"a":2,"n":"AddObject","t":8,"pi":[{"n":"measurement","pt":$n[3].ObjectMeasurement,"ps":0}],"sn":"HowFar$Core$Models$IObjectRepository$AddObject","rt":$n[0].Void,"p":[$n[3].ObjectMeasurement]},{"ab":true,"a":2,"n":"AddPack","t":8,"pi":[{"n":"pack","pt":$n[3].ObjectPack,"ps":0}],"sn":"HowFar$Core$Models$IObjectRepository$AddPack","rt":$n[0].Void,"p":[$n[3].ObjectPack]},{"ab":true,"a":2,"n":"GetObjectMeasurement","t":8,"pi":[{"n":"name","pt":$n[0].String,"ps":0}],"sn":"HowFar$Core$Models$IObjectRepository$GetObjectMeasurement","rt":$n[3].ObjectMeasurement,"p":[$n[0].String]},{"ab":true,"a":2,"n":"GetObjectMeasurements","t":8,"sn":"HowFar$Core$Models$IObjectRepository$GetObjectMeasurements","rt":$n[2].IEnumerable$1(HowFar.Core.Models.ObjectMeasurement)},{"ab":true,"a":2,"n":"GetObjectPacks","t":8,"sn":"HowFar$Core$Models$IObjectRepository$GetObjectPacks","rt":$n[2].IEnumerable$1(HowFar.Core.Models.ObjectPack)},{"ab":true,"a":2,"n":"NewObject","t":8,"pi":[{"n":"plural","pt":$n[0].String,"ps":0},{"n":"single","pt":$n[0].String,"ps":1},{"n":"value","pt":$n[0].Double,"ps":2},{"n":"parent","pt":$n[3].ObjectMeasurement,"ps":3},{"n":"pack","pt":$n[0].String,"ps":4}],"sn":"HowFar$Core$Models$IObjectRepository$NewObject","rt":$n[3].ObjectMeasurement,"p":[$n[0].String,$n[0].String,$n[0].Double,$n[3].ObjectMeasurement,$n[0].String]},{"ab":true,"a":2,"n":"RemoveObject","t":8,"pi":[{"n":"measurement","pt":$n[3].ObjectMeasurement,"ps":0}],"sn":"HowFar$Core$Models$IObjectRepository$RemoveObject","rt":$n[0].Void,"p":[$n[3].ObjectMeasurement]},{"ab":true,"a":2,"n":"RemovePack","t":8,"pi":[{"n":"pack","pt":$n[3].ObjectPack,"ps":0}],"sn":"HowFar$Core$Models$IObjectRepository$RemovePack","rt":$n[0].Void,"p":[$n[3].ObjectPack]},{"ab":true,"a":2,"n":"UpdateObject","t":8,"pi":[{"n":"selectedObject","pt":$n[3].ObjectMeasurement,"ps":0}],"sn":"HowFar$Core$Models$IObjectRepository$UpdateObject","rt":$n[0].Void,"p":[$n[3].ObjectMeasurement]}]}; }, $n);
    $m("HowFar.Core.Models.MeasureConverters", function () { return {"att":1048577,"a":2,"m":[{"a":2,"n":".ctor","t":1,"p":[$n[3].IObjectRepository],"pi":[{"n":"repository","pt":$n[3].IObjectRepository,"ps":0}],"sn":"ctor"},{"a":1,"n":"Calculate","t":8,"pi":[{"n":"from","pt":$n[3].ObjectMeasurement,"ps":0},{"n":"to","pt":$n[3].ObjectMeasurement,"ps":1},{"n":"value","dv":1.0,"o":true,"pt":$n[0].Double,"ps":2}],"sn":"Calculate","rt":$n[0].Nullable$1(System.Double),"p":[$n[3].ObjectMeasurement,$n[3].ObjectMeasurement,$n[0].Double],"box":function ($v) { return Bridge.box($v, System.Double, System.Nullable.toStringFn(System.Double.format), System.Nullable.getHashCodeFn(System.Double.getHashCode));}},{"a":2,"n":"Convert","t":8,"pi":[{"n":"from","pt":$n[3].ObjectMeasurement,"ps":0},{"n":"to","pt":$n[3].ObjectMeasurement,"ps":1},{"n":"valueFrom","dv":1.0,"o":true,"pt":$n[0].Double,"ps":2}],"sn":"Convert","rt":$n[0].Double,"p":[$n[3].ObjectMeasurement,$n[3].ObjectMeasurement,$n[0].Double],"box":function ($v) { return Bridge.box($v, System.Double, System.Double.format, System.Double.getHashCode);}},{"a":2,"n":"Convert","t":8,"pi":[{"n":"nameFrom","pt":$n[0].String,"ps":0},{"n":"nameTo","pt":$n[0].String,"ps":1},{"n":"valueFrom","dv":1.0,"o":true,"pt":$n[0].Double,"ps":2}],"sn":"Convert$1","rt":$n[0].Double,"p":[$n[0].String,$n[0].String,$n[0].Double],"box":function ($v) { return Bridge.box($v, System.Double, System.Double.format, System.Double.getHashCode);}},{"a":2,"n":"DeleteObject","t":8,"pi":[{"n":"selectedObject","pt":$n[3].ObjectMeasurement,"ps":0}],"sn":"DeleteObject","rt":$n[0].Void,"p":[$n[3].ObjectMeasurement]},{"a":2,"n":"DeletePack","t":8,"pi":[{"n":"pack","pt":$n[3].ObjectPack,"ps":0}],"sn":"DeletePack","rt":$n[0].Void,"p":[$n[3].ObjectPack]},{"a":2,"n":"Find","t":8,"pi":[{"n":"name","pt":$n[0].String,"ps":0}],"sn":"Find","rt":$n[3].ObjectMeasurement,"p":[$n[0].String]},{"a":1,"n":"GetAll","t":8,"sn":"GetAll","rt":$n[2].List$1(HowFar.Core.Models.ObjectMeasurement)},{"a":1,"n":"GoDown","t":8,"pi":[{"n":"from","pt":$n[3].ObjectMeasurement,"ps":0},{"n":"to","pt":$n[3].ObjectMeasurement,"ps":1},{"n":"value","pt":$n[0].Double,"ps":2}],"sn":"GoDown","rt":$n[0].Nullable$1(System.Double),"p":[$n[3].ObjectMeasurement,$n[3].ObjectMeasurement,$n[0].Double],"box":function ($v) { return Bridge.box($v, System.Double, System.Nullable.toStringFn(System.Double.format), System.Nullable.getHashCodeFn(System.Double.getHashCode));}},{"a":2,"n":"NewObject","t":8,"pi":[{"n":"pluralName","pt":$n[0].String,"ps":0},{"n":"singleName","pt":$n[0].String,"ps":1},{"n":"value","pt":$n[0].Double,"ps":2},{"n":"measurement","pt":$n[3].ObjectMeasurement,"ps":3},{"n":"pack","dv":"Custom","o":true,"pt":$n[0].String,"ps":4}],"sn":"NewObject","rt":$n[3].ObjectMeasurement,"p":[$n[0].String,$n[0].String,$n[0].Double,$n[3].ObjectMeasurement,$n[0].String]},{"a":2,"n":"NewObject","t":8,"pi":[{"n":"pluralName","pt":$n[0].String,"ps":0},{"n":"singleName","pt":$n[0].String,"ps":1},{"n":"value","pt":$n[0].Double,"ps":2},{"n":"measurement","pt":$n[0].String,"ps":3},{"n":"pack","dv":"Custom","o":true,"pt":$n[0].String,"ps":4}],"sn":"NewObject$1","rt":$n[3].ObjectMeasurement,"p":[$n[0].String,$n[0].String,$n[0].Double,$n[0].String,$n[0].String]},{"a":2,"n":"NewPack","t":8,"pi":[{"n":"pack","pt":$n[3].ObjectPack,"ps":0}],"sn":"NewPack","rt":$n[0].Void,"p":[$n[3].ObjectPack]},{"a":1,"n":"UpdateList","t":8,"sn":"UpdateList","rt":$n[0].Void},{"a":2,"n":"UpdateObject","t":8,"pi":[{"n":"selectedObject","pt":$n[3].ObjectMeasurement,"ps":0}],"sn":"UpdateObject","rt":$n[0].Void,"p":[$n[3].ObjectMeasurement]},{"a":1,"n":"UpdatePack","t":8,"pi":[{"n":"pack","pt":$n[0].String,"ps":0},{"n":"newObject","pt":$n[3].ObjectMeasurement,"ps":1}],"sn":"UpdatePack","rt":$n[0].Void,"p":[$n[0].String,$n[3].ObjectMeasurement]},{"a":2,"n":"Centimeter","t":16,"rt":$n[3].ObjectMeasurement,"g":{"a":2,"n":"get_Centimeter","t":8,"rt":$n[3].ObjectMeasurement,"fg":"Centimeter"},"fn":"Centimeter"},{"a":2,"n":"ObjectMeasurements","t":16,"rt":$n[2].List$1(HowFar.Core.Models.ObjectMeasurement),"g":{"a":2,"n":"get_ObjectMeasurements","t":8,"rt":$n[2].List$1(HowFar.Core.Models.ObjectMeasurement),"fg":"ObjectMeasurements"},"s":{"a":2,"n":"set_ObjectMeasurements","t":8,"p":[$n[2].List$1(HowFar.Core.Models.ObjectMeasurement)],"rt":$n[0].Void,"fs":"ObjectMeasurements"},"fn":"ObjectMeasurements"},{"a":2,"n":"ObjectPacks","t":16,"rt":$n[2].List$1(HowFar.Core.Models.ObjectPack),"g":{"a":2,"n":"get_ObjectPacks","t":8,"rt":$n[2].List$1(HowFar.Core.Models.ObjectPack),"fg":"ObjectPacks"},"s":{"a":2,"n":"set_ObjectPacks","t":8,"p":[$n[2].List$1(HowFar.Core.Models.ObjectPack)],"rt":$n[0].Void,"fs":"ObjectPacks"},"fn":"ObjectPacks"},{"a":2,"n":"PropertyKey","is":true,"t":4,"rt":$n[0].String,"sn":"PropertyKey"},{"a":1,"n":"_repository","t":4,"rt":$n[3].IObjectRepository,"sn":"_repository","ro":true},{"a":1,"backing":true,"n":"<ObjectMeasurements>k__BackingField","t":4,"rt":$n[2].List$1(HowFar.Core.Models.ObjectMeasurement),"sn":"ObjectMeasurements"},{"a":1,"backing":true,"n":"<ObjectPacks>k__BackingField","t":4,"rt":$n[2].List$1(HowFar.Core.Models.ObjectPack),"sn":"ObjectPacks"}]}; }, $n);
    $m("HowFar.Core.Models.MeasurementCompare", function () { return {"att":1048576,"a":4,"m":[{"a":2,"n":".ctor","t":1,"p":[$n[3].IMeasureConverters],"pi":[{"n":"converters","pt":$n[3].IMeasureConverters,"ps":0}],"sn":"ctor"},{"a":2,"n":"Compare","t":8,"pi":[{"n":"x","pt":$n[3].ObjectMeasurement,"ps":0},{"n":"y","pt":$n[3].ObjectMeasurement,"ps":1}],"sn":"compare","rt":$n[0].Int32,"p":[$n[3].ObjectMeasurement,$n[3].ObjectMeasurement],"box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":1,"n":"_converters","t":4,"rt":$n[3].IMeasureConverters,"sn":"_converters","ro":true}]}; }, $n);
    $m("HowFar.Core.Models.ObjectMeasurement", function () { return {"att":1048577,"a":2,"m":[{"a":2,"n":".ctor","t":1,"sn":"ctor"},{"a":2,"n":".ctor","t":1,"p":[$n[0].String,$n[0].String],"pi":[{"n":"singleName","pt":$n[0].String,"ps":0},{"n":"pluralName","pt":$n[0].String,"ps":1}],"sn":"$ctor1"},{"a":2,"n":"Add","t":8,"pi":[{"n":"obj","pt":$n[3].ObjectMeasurement,"ps":0}],"sn":"Add","rt":$n[0].Void,"p":[$n[3].ObjectMeasurement]},{"ov":true,"a":2,"n":"ToString","t":8,"sn":"toString","rt":$n[0].String},{"a":2,"n":"Image","t":16,"rt":$n[0].String,"g":{"a":2,"n":"get_Image","t":8,"rt":$n[0].String,"fg":"Image"},"s":{"a":2,"n":"set_Image","t":8,"p":[$n[0].String],"rt":$n[0].Void,"fs":"Image"},"fn":"Image"},{"v":true,"a":2,"n":"Measurement","t":16,"rt":$n[3].ObjectMeasurement,"g":{"v":true,"a":2,"n":"get_Measurement","t":8,"rt":$n[3].ObjectMeasurement,"fg":"Measurement"},"s":{"v":true,"a":2,"n":"set_Measurement","t":8,"p":[$n[3].ObjectMeasurement],"rt":$n[0].Void,"fs":"Measurement"},"fn":"Measurement"},{"v":true,"a":2,"n":"ObjectMeasurements","t":16,"rt":$n[2].List$1(HowFar.Core.Models.ObjectMeasurement),"g":{"v":true,"a":2,"n":"get_ObjectMeasurements","t":8,"rt":$n[2].List$1(HowFar.Core.Models.ObjectMeasurement),"fg":"ObjectMeasurements"},"s":{"v":true,"a":2,"n":"set_ObjectMeasurements","t":8,"p":[$n[2].List$1(HowFar.Core.Models.ObjectMeasurement)],"rt":$n[0].Void,"fs":"ObjectMeasurements"},"fn":"ObjectMeasurements"},{"a":2,"n":"ObjectPack","t":16,"rt":$n[3].ObjectPack,"g":{"a":2,"n":"get_ObjectPack","t":8,"rt":$n[3].ObjectPack,"fg":"ObjectPack"},"s":{"a":2,"n":"set_ObjectPack","t":8,"p":[$n[3].ObjectPack],"rt":$n[0].Void,"fs":"ObjectPack"},"fn":"ObjectPack"},{"a":2,"n":"ObjectPackName","t":16,"rt":$n[0].String,"g":{"a":2,"n":"get_ObjectPackName","t":8,"rt":$n[0].String,"fg":"ObjectPackName"},"s":{"a":2,"n":"set_ObjectPackName","t":8,"p":[$n[0].String],"rt":$n[0].Void,"fs":"ObjectPackName"},"fn":"ObjectPackName"},{"a":2,"n":"ParentMeasurementSingleName","t":16,"rt":$n[0].String,"g":{"a":2,"n":"get_ParentMeasurementSingleName","t":8,"rt":$n[0].String,"fg":"ParentMeasurementSingleName"},"s":{"a":2,"n":"set_ParentMeasurementSingleName","t":8,"p":[$n[0].String],"rt":$n[0].Void,"fs":"ParentMeasurementSingleName"},"fn":"ParentMeasurementSingleName"},{"a":2,"n":"PluralName","t":16,"rt":$n[0].String,"g":{"a":2,"n":"get_PluralName","t":8,"rt":$n[0].String,"fg":"PluralName"},"s":{"a":2,"n":"set_PluralName","t":8,"p":[$n[0].String],"rt":$n[0].Void,"fs":"PluralName"},"fn":"PluralName"},{"a":2,"n":"SingleName","t":16,"rt":$n[0].String,"g":{"a":2,"n":"get_SingleName","t":8,"rt":$n[0].String,"fg":"SingleName"},"s":{"a":2,"n":"set_SingleName","t":8,"p":[$n[0].String],"rt":$n[0].Void,"fs":"SingleName"},"fn":"SingleName"},{"a":2,"n":"Value","t":16,"rt":$n[0].Double,"g":{"a":2,"n":"get_Value","t":8,"rt":$n[0].Double,"fg":"Value","box":function ($v) { return Bridge.box($v, System.Double, System.Double.format, System.Double.getHashCode);}},"s":{"a":2,"n":"set_Value","t":8,"p":[$n[0].Double],"rt":$n[0].Void,"fs":"Value"},"fn":"Value"},{"a":1,"n":"_image","t":4,"rt":$n[0].String,"sn":"_image"},{"a":1,"n":"_measurement","t":4,"rt":$n[3].ObjectMeasurement,"sn":"_measurement"},{"a":1,"n":"_objectMeasurements","t":4,"rt":$n[2].List$1(HowFar.Core.Models.ObjectMeasurement),"sn":"_objectMeasurements"},{"a":1,"n":"_objectPack","t":4,"rt":$n[3].ObjectPack,"sn":"_objectPack"},{"a":1,"n":"_objectPackName","t":4,"rt":$n[0].String,"sn":"_objectPackName"},{"a":1,"n":"_parentMeasurementSingleName","t":4,"rt":$n[0].String,"sn":"_parentMeasurementSingleName"},{"a":1,"n":"_pluralName","t":4,"rt":$n[0].String,"sn":"_pluralName"},{"a":1,"n":"_singleName","t":4,"rt":$n[0].String,"sn":"_singleName"},{"a":1,"n":"_value","t":4,"rt":$n[0].Double,"sn":"_value","box":function ($v) { return Bridge.box($v, System.Double, System.Double.format, System.Double.getHashCode);}}]}; }, $n);
    $m("HowFar.Core.Models.ObjectPack", function () { return {"att":1048577,"a":2,"m":[{"a":2,"n":".ctor","t":1,"sn":"ctor"},{"a":2,"n":".ctor","t":1,"p":[$n[0].String,$n[0].String],"pi":[{"n":"name","pt":$n[0].String,"ps":0},{"n":"description","pt":$n[0].String,"ps":1}],"sn":"$ctor1"},{"ov":true,"a":2,"n":"ToString","t":8,"sn":"toString","rt":$n[0].String},{"a":2,"n":"Description","t":16,"rt":$n[0].String,"g":{"a":2,"n":"get_Description","t":8,"rt":$n[0].String,"fg":"Description"},"s":{"a":2,"n":"set_Description","t":8,"p":[$n[0].String],"rt":$n[0].Void,"fs":"Description"},"fn":"Description"},{"a":2,"n":"ImageURL","t":16,"rt":$n[0].String,"g":{"a":2,"n":"get_ImageURL","t":8,"rt":$n[0].String,"fg":"ImageURL"},"fn":"ImageURL"},{"a":2,"n":"Name","t":16,"rt":$n[0].String,"g":{"a":2,"n":"get_Name","t":8,"rt":$n[0].String,"fg":"Name"},"fn":"Name"},{"v":true,"a":2,"n":"ObjectMeasurements","t":16,"rt":$n[2].List$1(HowFar.Core.Models.ObjectMeasurement),"g":{"v":true,"a":2,"n":"get_ObjectMeasurements","t":8,"rt":$n[2].List$1(HowFar.Core.Models.ObjectMeasurement),"fg":"ObjectMeasurements"},"s":{"v":true,"a":2,"n":"set_ObjectMeasurements","t":8,"p":[$n[2].List$1(HowFar.Core.Models.ObjectMeasurement)],"rt":$n[0].Void,"fs":"ObjectMeasurements"},"fn":"ObjectMeasurements"},{"a":2,"n":"PackImage","t":16,"rt":$n[0].String,"g":{"a":2,"n":"get_PackImage","t":8,"rt":$n[0].String,"fg":"PackImage"},"s":{"a":2,"n":"set_PackImage","t":8,"p":[$n[0].String],"rt":$n[0].Void,"fs":"PackImage"},"fn":"PackImage"},{"a":2,"n":"PackName","t":16,"rt":$n[0].String,"g":{"a":2,"n":"get_PackName","t":8,"rt":$n[0].String,"fg":"PackName"},"s":{"a":2,"n":"set_PackName","t":8,"p":[$n[0].String],"rt":$n[0].Void,"fs":"PackName"},"fn":"PackName"},{"a":1,"n":"__Property__Initializer__ObjectMeasurements","t":4,"rt":$n[2].List$1(HowFar.Core.Models.ObjectMeasurement),"sn":"__Property__Initializer__ObjectMeasurements"},{"a":1,"n":"_description","t":4,"rt":$n[0].String,"sn":"_description"},{"a":1,"n":"_packImage","t":4,"rt":$n[0].String,"sn":"_packImage"},{"a":1,"n":"_packName","t":4,"rt":$n[0].String,"sn":"_packName"},{"a":1,"backing":true,"n":"<ObjectMeasurements>k__BackingField","t":4,"rt":$n[2].List$1(HowFar.Core.Models.ObjectMeasurement),"sn":"ObjectMeasurements"}]}; }, $n);
    $m("HowFar.Core.Models.ObjectRepositoryCache", function () { return {"att":1048577,"a":2,"m":[{"a":2,"n":".ctor","t":1,"p":[$n[3].IApp],"pi":[{"n":"app","pt":$n[3].IApp,"ps":0}],"sn":"ctor"},{"a":2,"n":"AddObject","t":8,"pi":[{"n":"measurement","pt":$n[3].ObjectMeasurement,"ps":0}],"sn":"AddObject","rt":$n[0].Void,"p":[$n[3].ObjectMeasurement]},{"a":2,"n":"AddPack","t":8,"pi":[{"n":"pack","pt":$n[3].ObjectPack,"ps":0}],"sn":"AddPack","rt":$n[0].Void,"p":[$n[3].ObjectPack]},{"a":2,"n":"Dispose","t":8,"sn":"Dispose","rt":$n[0].Void},{"a":1,"n":"GetKey","t":8,"pi":[{"n":"key","pt":$n[0].String,"ps":0}],"tpc":1,"tprm":["T"],"sn":"GetKey","rt":System.Object,"p":[$n[0].String]},{"a":2,"n":"GetObjectMeasurement","t":8,"pi":[{"n":"name","pt":$n[0].String,"ps":0}],"sn":"GetObjectMeasurement","rt":$n[3].ObjectMeasurement,"p":[$n[0].String]},{"a":2,"n":"GetObjectMeasurements","t":8,"sn":"GetObjectMeasurements","rt":$n[2].IEnumerable$1(HowFar.Core.Models.ObjectMeasurement)},{"a":2,"n":"GetObjectPacks","t":8,"sn":"GetObjectPacks","rt":$n[2].IEnumerable$1(HowFar.Core.Models.ObjectPack)},{"a":1,"n":"InsertKey","t":8,"pi":[{"n":"key","pt":$n[0].String,"ps":0},{"n":"data","pt":$n[0].Object,"ps":1}],"sn":"InsertKey","rt":$n[0].Void,"p":[$n[0].String,$n[0].Object]},{"a":2,"n":"NewObject","t":8,"pi":[{"n":"plural","pt":$n[0].String,"ps":0},{"n":"single","pt":$n[0].String,"ps":1},{"n":"value","pt":$n[0].Double,"ps":2},{"n":"parent","pt":$n[3].ObjectMeasurement,"ps":3},{"n":"pack","pt":$n[0].String,"ps":4}],"sn":"NewObject","rt":$n[3].ObjectMeasurement,"p":[$n[0].String,$n[0].String,$n[0].Double,$n[3].ObjectMeasurement,$n[0].String]},{"a":2,"n":"RemoveObject","t":8,"pi":[{"n":"measurement","pt":$n[3].ObjectMeasurement,"ps":0}],"sn":"RemoveObject","rt":$n[0].Void,"p":[$n[3].ObjectMeasurement]},{"a":2,"n":"RemovePack","t":8,"pi":[{"n":"pack","pt":$n[3].ObjectPack,"ps":0}],"sn":"RemovePack","rt":$n[0].Void,"p":[$n[3].ObjectPack]},{"a":1,"n":"SaveChanges","t":8,"sn":"SaveChanges","rt":$n[0].Void},{"a":2,"n":"UpdateObject","t":8,"pi":[{"n":"selectedObject","pt":$n[3].ObjectMeasurement,"ps":0}],"sn":"UpdateObject","rt":$n[0].Void,"p":[$n[3].ObjectMeasurement]},{"a":2,"n":"ObjectKey","is":true,"t":4,"rt":$n[0].String,"sn":"ObjectKey"},{"a":2,"n":"PackKey","is":true,"t":4,"rt":$n[0].String,"sn":"PackKey"},{"a":1,"n":"_app","t":4,"rt":$n[3].IApp,"sn":"_app","ro":true},{"a":1,"n":"measurements","t":4,"rt":$n[2].List$1(HowFar.Core.Models.ObjectMeasurement),"sn":"measurements","ro":true},{"a":1,"n":"packs","t":4,"rt":$n[2].List$1(HowFar.Core.Models.ObjectPack),"sn":"packs","ro":true}]}; }, $n);
    $m("HowFar.Core.Models.ObjectRepositorySeeder", function () { return {"att":1048961,"a":2,"s":true,"m":[{"a":2,"n":"NewObjectAction","is":true,"t":8,"pi":[{"n":"pluralName","pt":$n[0].String,"ps":0},{"n":"singleName","pt":$n[0].String,"ps":1},{"n":"value","pt":$n[0].Double,"ps":2},{"n":"measurementStr","pt":$n[0].String,"ps":3},{"n":"pack","pt":$n[0].String,"ps":4},{"n":"repository","pt":$n[3].IObjectRepository,"ps":5}],"sn":"NewObjectAction","rt":$n[3].ObjectMeasurement,"p":[$n[0].String,$n[0].String,$n[0].Double,$n[0].String,$n[0].String,$n[3].IObjectRepository]},{"a":2,"n":"SetupTree","is":true,"t":8,"pi":[{"n":"data","pt":$n[2].IList$1(HowFar.Core.Models.ObjectMeasurement),"ps":0}],"sn":"SetupTree","rt":$n[2].IList$1(HowFar.Core.Models.ObjectMeasurement),"p":[$n[2].IList$1(HowFar.Core.Models.ObjectMeasurement)]},{"a":2,"n":"Startup","is":true,"t":8,"pi":[{"n":"repository","pt":$n[3].IObjectRepository,"ps":0}],"sn":"Startup","rt":$n[0].Void,"p":[$n[3].IObjectRepository]},{"a":2,"n":"Imperial","is":true,"t":4,"rt":$n[0].String,"sn":"Imperial"},{"a":2,"n":"Metric","is":true,"t":4,"rt":$n[0].String,"sn":"Metric"},{"a":2,"n":"Space","is":true,"t":4,"rt":$n[0].String,"sn":"Space"}]}; }, $n);
});
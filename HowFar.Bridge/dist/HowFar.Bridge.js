/**
 * @version 1.0.0.0
 * @copyright Copyright ©  2020
 * @compiler Bridge.NET 17.10.1
 */
Bridge.assembly("HowFar.Bridge", function ($asm, globals) {
    "use strict";

    Bridge.define("HowFar.Bridge.App", {
        main: function Main () {

            var converter = new HowFar.Core.Models.MeasureConverters(new HowFar.Core.Models.ObjectRepositoryCache(new HowFar.Core.Models.AppModel()));







        }
    });

    Bridge.define("HowFar.Core.BindableBase", {
        inherits: [System.ComponentModel.INotifyPropertyChanged],
        events: {
            PropertyChanged: null
        },
        alias: ["addPropertyChanged", "System$ComponentModel$INotifyPropertyChanged$addPropertyChanged",
        "removePropertyChanged", "System$ComponentModel$INotifyPropertyChanged$removePropertyChanged"],
        methods: {
            SetProperty: function (T, property, value, action, name) {
                if (action === void 0) { action = null; }
                if (name === void 0) { name = null; }
                if (System.Nullable.neq((property.v != null ? Bridge.equals(property.v, value) : null), true)) {
                    property.v = value;
                    this.OnPropertyChanged(name);
                    !Bridge.staticEquals(action, null) ? action() : null;
                }

            },
            OnPropertyChanged: function (propertyName) {
                if (propertyName === void 0) { propertyName = null; }
                !Bridge.staticEquals(this.PropertyChanged, null) ? this.PropertyChanged(this, new System.ComponentModel.PropertyChangedEventArgs(propertyName)) : null;
            }
        }
    });

    Bridge.define("HowFar.Core.Models.IApp", {
        $kind: "interface"
    });

    Bridge.define("HowFar.Core.Models.IMeasureConverters", {
        $kind: "interface"
    });

    Bridge.define("HowFar.Core.Models.IObjectMeasurement", {
        $kind: "interface"
    });

    Bridge.define("HowFar.Core.Models.IObjectRepository", {
        inherits: [System.IDisposable],
        $kind: "interface"
    });

    Bridge.define("HowFar.Core.Models.ObjectRepositorySeeder", {
        statics: {
            fields: {
                Metric: null,
                Imperial: null,
                Space: null
            },
            ctors: {
                init: function () {
                    this.Metric = "Metric";
                    this.Imperial = "Imperial";
                    this.Space = "Space";
                }
            },
            methods: {
                Startup: function (repository) {
                    var $t, $t1;
                    var objectPacks = new (System.Collections.Generic.List$1(HowFar.Core.Models.ObjectPack)).ctor();
                    var centimeter = ($t = new HowFar.Core.Models.ObjectMeasurement.$ctor1("Centimeter", "Centimeters"), $t.Value = 1, $t);
                    centimeter.ObjectPackName = HowFar.Core.Models.ObjectRepositorySeeder.Metric;
                    objectPacks.add(($t = new HowFar.Core.Models.ObjectPack.$ctor1("Custom", "Objects that are made in the app are placed here."), $t.PackImage = "Assets/block.png", $t));
                    objectPacks.add(($t = new HowFar.Core.Models.ObjectPack.$ctor1(HowFar.Core.Models.ObjectRepositorySeeder.Imperial, "A default package for the US measurement system"), $t.PackImage = "https://logoeps.com/wp-content/uploads/2013/06/flag-of-usa-vector-logo.png", $t));
                    objectPacks.add(($t = new HowFar.Core.Models.ObjectPack.$ctor1(HowFar.Core.Models.ObjectRepositorySeeder.Metric, "The metric system.  Used by everyone except the US"), $t.PackImage = "http://www.knightstemplarorder.org/wp-content/uploads/2016/06/UN-SEAL-Stylized-500-Brown.png", $t));
                    objectPacks.add(($t = new HowFar.Core.Models.ObjectPack.$ctor1(HowFar.Core.Models.ObjectRepositorySeeder.Space, "Objects and Measurements in space"), $t.PackImage = "https://sep.yimg.com/ay/skyimage/nasa-space-missions-9.jpg", $t));
                    var packs = ($t = HowFar.Core.Models.ObjectPack, System.Linq.Enumerable.from(repository.HowFar$Core$Models$IObjectRepository$GetObjectPacks(), $t).toList($t));
                    $t1 = Bridge.getEnumerator(objectPacks);
                    try {
                        while ($t1.moveNext()) {
                            var objectPack = $t1.Current;
                            if (!System.Linq.Enumerable.from(packs, HowFar.Core.Models.ObjectPack).select(function (p) {
                                    return p.PackName;
                                }).contains(objectPack.PackName)) {
                                repository.HowFar$Core$Models$IObjectRepository$AddPack(objectPack);
                            }
                        }
                    } finally {
                        if (Bridge.is($t1, System.IDisposable)) {
                            $t1.System$IDisposable$Dispose();
                        }
                    }

                    if (System.Linq.Enumerable.from(repository.HowFar$Core$Models$IObjectRepository$GetObjectMeasurements(), HowFar.Core.Models.ObjectMeasurement).all(function (p) {
                            return !Bridge.referenceEquals(p.SingleName, centimeter.SingleName);
                        })) {
                        repository.HowFar$Core$Models$IObjectRepository$AddObject(centimeter);
                    }
                    var inches = repository.HowFar$Core$Models$IObjectRepository$NewObject("Inches", "Inch", 2.54, centimeter, HowFar.Core.Models.ObjectRepositorySeeder.Imperial);
                    var feet = repository.HowFar$Core$Models$IObjectRepository$NewObject("Feet", "Foot", 12, inches, HowFar.Core.Models.ObjectRepositorySeeder.Imperial);
                    var mile = repository.HowFar$Core$Models$IObjectRepository$NewObject("Miles", "Mile", 5280, feet, HowFar.Core.Models.ObjectRepositorySeeder.Imperial);
                    var meter = repository.HowFar$Core$Models$IObjectRepository$NewObject("Meters", "Meter", 100, centimeter, HowFar.Core.Models.ObjectRepositorySeeder.Metric);
                    var kiloMeter = repository.HowFar$Core$Models$IObjectRepository$NewObject("Kilometers", "Kilometer", 1000, meter, HowFar.Core.Models.ObjectRepositorySeeder.Metric);

                    var nanoMeter = repository.HowFar$Core$Models$IObjectRepository$NewObject("Nanometers", "Nanometer", 1E-07, centimeter, HowFar.Core.Models.ObjectRepositorySeeder.Metric);

                    var earth = repository.HowFar$Core$Models$IObjectRepository$NewObject("Earths", "Earth", 25000, mile, HowFar.Core.Models.ObjectRepositorySeeder.Space);
                    var sun = repository.HowFar$Core$Models$IObjectRepository$NewObject("Suns", "Sun", 103, earth, HowFar.Core.Models.ObjectRepositorySeeder.Space);
                    var dist = repository.HowFar$Core$Models$IObjectRepository$NewObject("Distance from Earth to Sun", "Distance from Earth to Sun", 92955807, mile, HowFar.Core.Models.ObjectRepositorySeeder.Space);
                    var lightyear = repository.HowFar$Core$Models$IObjectRepository$NewObject("Lightyears", "Lightyear", System.Int64([-1185228224,1368]), mile, HowFar.Core.Models.ObjectRepositorySeeder.Space);

                    var alpha = repository.HowFar$Core$Models$IObjectRepository$NewObject("Distance from Earth to Alpha Centauri", "Distance from Earth to Alpha Centauri", 4.4, lightyear, HowFar.Core.Models.ObjectRepositorySeeder.Space);
                    var pico = repository.HowFar$Core$Models$IObjectRepository$NewObject("Picometers", "Picometer", 0.001, nanoMeter, HowFar.Core.Models.ObjectRepositorySeeder.Metric);
                },
                NewObjectAction: function (pluralName, singleName, value, measurementStr, pack, repository) {
                    var $t;
                    if (measurementStr != null && System.Linq.Enumerable.from(repository.HowFar$Core$Models$IObjectRepository$GetObjectMeasurements(), HowFar.Core.Models.ObjectMeasurement).all(function (p) {
                            return !Bridge.referenceEquals(p.SingleName, singleName);
                        })) {
                        var measure = repository.HowFar$Core$Models$IObjectRepository$GetObjectMeasurement(measurementStr);
                        if (measure != null) {
                            var newObject = ($t = new HowFar.Core.Models.ObjectMeasurement.$ctor1(singleName, pluralName), $t.Value = value, $t.ObjectPackName = pack, $t);
                            measure.Add(newObject);
                            repository.HowFar$Core$Models$IObjectRepository$AddObject(newObject);
                            return newObject;
                        }
                    }

                    return null;
                },
                SetupTree: function (data) {
                    var $t;
                    $t = Bridge.getEnumerator(data, HowFar.Core.Models.ObjectMeasurement);
                    try {
                        while ($t.moveNext()) {
                            var objectMeasurement = { v : $t.Current };
                            if (objectMeasurement.v.ParentMeasurementSingleName != null) {
                                objectMeasurement.v.Measurement = System.Linq.Enumerable.from(data, HowFar.Core.Models.ObjectMeasurement).first((function ($me, objectMeasurement) {
                                        return function (p) {
                                            return Bridge.referenceEquals(p.SingleName, objectMeasurement.v.ParentMeasurementSingleName);
                                        };
                                    })(this, objectMeasurement));
                            }

                            var t = System.Linq.Enumerable.from(data, HowFar.Core.Models.ObjectMeasurement).where((function ($me, objectMeasurement) {
                                    return function (p) {
                                        return Bridge.referenceEquals(p.ParentMeasurementSingleName, objectMeasurement.v.SingleName);
                                    };
                                })(this, objectMeasurement));
                            objectMeasurement.v.ObjectMeasurements = t.toList(HowFar.Core.Models.ObjectMeasurement);
                        }
                    } finally {
                        if (Bridge.is($t, System.IDisposable)) {
                            $t.System$IDisposable$Dispose();
                        }
                    }

                    return data;
                }
            }
        }
    });

    Bridge.define("HowFar.Core.Models.AppModel", {
        inherits: [HowFar.Core.Models.IApp],
        fields: {
            Properties: null
        },
        alias: [
            "Properties", "HowFar$Core$Models$IApp$Properties",
            "SavePropertiesAsync", "HowFar$Core$Models$IApp$SavePropertiesAsync"
        ],
        ctors: {
            init: function () {
                this.Properties = new (System.Collections.Generic.Dictionary$2(System.String,System.Object)).ctor();
            }
        },
        methods: {
            SavePropertiesAsync: function () {
                var $step = 0,
                    $jumpFromFinally, 
                    $tcs = new System.Threading.Tasks.TaskCompletionSource(), 
                    $returnValue, 
                    $async_e, 
                    $asyncBody = Bridge.fn.bind(this, function () {
                        try {
                            for (;;) {
                                $step = System.Array.min([0], $step);
                                switch ($step) {
                                    case 0: {
                                        $tcs.setResult(null);
                                        return;
                                    }
                                    default: {
                                        $tcs.setResult(null);
                                        return;
                                    }
                                }
                            }
                        } catch($async_e1) {
                            $async_e = System.Exception.create($async_e1);
                            $tcs.setException($async_e);
                        }
                    }, arguments);

                $asyncBody();
                return $tcs.task;
            }
        }
    });

    Bridge.define("HowFar.Core.Models.MeasureConverters", {
        inherits: [HowFar.Core.Models.IMeasureConverters],
        statics: {
            fields: {
                PropertyKey: null
            },
            ctors: {
                init: function () {
                    this.PropertyKey = "Conversions";
                }
            }
        },
        fields: {
            _repository: null,
            ObjectPacks: null,
            ObjectMeasurements: null
        },
        props: {
            Centimeter: {
                get: function () {
                    return this.Find("Centimeter");
                }
            }
        },
        alias: [
            "Centimeter", "HowFar$Core$Models$IMeasureConverters$Centimeter",
            "ObjectPacks", "HowFar$Core$Models$IMeasureConverters$ObjectPacks",
            "ObjectMeasurements", "HowFar$Core$Models$IMeasureConverters$ObjectMeasurements",
            "Convert", "HowFar$Core$Models$IMeasureConverters$Convert",
            "Convert$1", "HowFar$Core$Models$IMeasureConverters$Convert$1",
            "Find", "HowFar$Core$Models$IMeasureConverters$Find",
            "NewObject$1", "HowFar$Core$Models$IMeasureConverters$NewObject$1",
            "DeletePack", "HowFar$Core$Models$IMeasureConverters$DeletePack",
            "DeleteObject", "HowFar$Core$Models$IMeasureConverters$DeleteObject",
            "UpdateObject", "HowFar$Core$Models$IMeasureConverters$UpdateObject",
            "NewObject", "HowFar$Core$Models$IMeasureConverters$NewObject",
            "NewPack", "HowFar$Core$Models$IMeasureConverters$NewPack"
        ],
        ctors: {
            ctor: function (repository) {
                this.$initialize();
                this._repository = repository;
                this.UpdateList();
            }
        },
        methods: {
            UpdateList: function () {
                this.ObjectMeasurements = new (System.Collections.Generic.List$1(HowFar.Core.Models.ObjectMeasurement)).$ctor1(System.Linq.Enumerable.from(this.GetAll(), HowFar.Core.Models.ObjectMeasurement).orderBy(function (p) {
                        return p;
                    }, new HowFar.Core.Models.MeasurementCompare(this)));
                this.ObjectPacks = new (System.Collections.Generic.List$1(HowFar.Core.Models.ObjectPack)).$ctor1(this._repository.HowFar$Core$Models$IObjectRepository$GetObjectPacks());
            },
            Convert: function (from, to, valueFrom) {
                if (valueFrom === void 0) { valueFrom = 1.0; }
                if (from == null) {
                    throw new System.ArgumentNullException.$ctor1("'from' cannot be null");
                }
                if (to == null) {
                    throw new System.ArgumentNullException.$ctor1("'to' cannot be null");
                }
                return this.Convert$1(from.PluralName, to.PluralName, valueFrom);
            },
            Convert$1: function (nameFrom, nameTo, valueFrom) {
                var $t;
                if (valueFrom === void 0) { valueFrom = 1.0; }

                var from = this.Find(nameFrom);
                var to = this.Find(nameTo);
                if (Bridge.referenceEquals(to, from)) {
                    return valueFrom;
                }
                return ($t = System.Nullable.mul(valueFrom, this.Calculate(from, to)), $t != null ? $t : 0);
            },
            Calculate: function (from, to, value) {
                if (value === void 0) { value = 1.0; }
                if (from.ParentMeasurementSingleName != null) {
                    if (Bridge.referenceEquals(from.ParentMeasurementSingleName, to.SingleName)) {
                        return from.Value * value;
                    } else {
                        var up = this.Calculate(from.Measurement, to, from.Value * value);
                        if (up != null) {
                            return up;
                        }
                    }
                } else {
                    return this.GoDown(from, to, value);
                }
                return null;
            },
            GoDown: function (from, to, value) {
                var $t;
                var children = from.ObjectMeasurements;
                $t = Bridge.getEnumerator(children);
                try {
                    while ($t.moveNext()) {
                        var objectMeasurement = $t.Current;
                        if (Bridge.referenceEquals(objectMeasurement, to)) {
                            return value / to.Value;
                        } else {
                            var down = this.GoDown(objectMeasurement, to, value / objectMeasurement.Value);
                            if (down != null) {
                                return down;
                            }
                        }
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }

                return null;
            },
            GetAll: function () {
                var $t;
                return ($t = HowFar.Core.Models.ObjectMeasurement, System.Linq.Enumerable.from(this._repository.HowFar$Core$Models$IObjectRepository$GetObjectMeasurements(), $t).toList($t));
            },
            Find: function (name) {
                return this._repository.HowFar$Core$Models$IObjectRepository$GetObjectMeasurement(name);
            },
            NewObject$1: function (pluralName, singleName, value, measurement, pack) {
                var $t;
                if (pack === void 0) { pack = "Custom"; }
                var measure = this.Find(measurement);
                if (measure != null) {
                    var newObject = ($t = new HowFar.Core.Models.ObjectMeasurement.$ctor1(singleName, pluralName), $t.Value = value, $t.ObjectPackName = pack, $t.ParentMeasurementSingleName = measure.SingleName, $t);
                    this._repository.HowFar$Core$Models$IObjectRepository$AddObject(newObject);
                    this.UpdateList();
                    return newObject;
                }

                return null;
            },
            NewObject: function (pluralName, singleName, value, measurement, pack) {
                if (pack === void 0) { pack = "Custom"; }
                return this.NewObject$1(pluralName, singleName, value, measurement.PluralName, pack);
            },
            DeletePack: function (pack) {
                this._repository.HowFar$Core$Models$IObjectRepository$RemovePack(pack);
                this.UpdateList();
            },
            DeleteObject: function (selectedObject) {
                this._repository.HowFar$Core$Models$IObjectRepository$RemoveObject(selectedObject);
                this.UpdateList();
            },
            UpdateObject: function (selectedObject) {
                this._repository.HowFar$Core$Models$IObjectRepository$UpdateObject(selectedObject);
            },
            UpdatePack: function (pack, newObject) {
                var packs = System.Linq.Enumerable.from(this.ObjectPacks, HowFar.Core.Models.ObjectPack).firstOrDefault(function (p) {
                        return Bridge.referenceEquals(p.PackName, pack);
                    }, null);
                if (packs != null) {
                    packs.ObjectMeasurements.add(newObject);
                } else {
                    throw new System.InvalidOperationException.$ctor1(System.String.format("package '{0}' must exist first", [pack]));
                }
            },
            NewPack: function (pack) {
                this._repository.HowFar$Core$Models$IObjectRepository$AddPack(pack);
                this.UpdateList();
            }
        }
    });

    Bridge.define("HowFar.Core.Models.ObjectMeasurement", {
        inherits: [HowFar.Core.BindableBase,HowFar.Core.Models.IObjectMeasurement],
        fields: {
            _value: 0,
            _image: null,
            _pluralName: null,
            _objectMeasurements: null,
            _singleName: null,
            _objectPack: null,
            _objectPackName: null,
            _measurement: null,
            _parentMeasurementSingleName: null
        },
        props: {
            ParentMeasurementSingleName: {
                get: function () {
                    return this._parentMeasurementSingleName;
                },
                set: function (value) {
                    this.SetProperty(System.String, Bridge.ref(this, "_parentMeasurementSingleName"), value);
                }
            },
            Measurement: {
                get: function () {
                    return this._measurement;
                },
                set: function (value) {
                    this.SetProperty(HowFar.Core.Models.ObjectMeasurement, Bridge.ref(this, "_measurement"), value);
                }
            },
            Value: {
                get: function () {
                    return this._value;
                },
                set: function (value) {
                    this.SetProperty(System.Double, Bridge.ref(this, "_value"), value);
                }
            },
            Image: {
                get: function () {
                    return this._image;
                },
                set: function (value) {
                    this.SetProperty(System.String, Bridge.ref(this, "_image"), value);
                }
            },
            PluralName: {
                get: function () {
                    return this._pluralName;
                },
                set: function (value) {
                    this.SetProperty(System.String, Bridge.ref(this, "_pluralName"), value);
                }
            },
            ObjectMeasurements: {
                get: function () {
                    return this._objectMeasurements;
                },
                set: function (value) {
                    this.SetProperty(System.Collections.Generic.List$1(HowFar.Core.Models.ObjectMeasurement), Bridge.ref(this, "_objectMeasurements"), value);
                }
            },
            SingleName: {
                get: function () {
                    return this._singleName;
                },
                set: function (value) {
                    this.SetProperty(System.String, Bridge.ref(this, "_singleName"), value);
                }
            },
            ObjectPack: {
                get: function () {
                    return this._objectPack;
                },
                set: function (value) {
                    this.SetProperty(HowFar.Core.Models.ObjectPack, Bridge.ref(this, "_objectPack"), value);
                }
            },
            ObjectPackName: {
                get: function () {
                    return this._objectPackName;
                },
                set: function (value) {
                    this.SetProperty(System.String, Bridge.ref(this, "_objectPackName"), value);
                }
            }
        },
        alias: [
            "toString", "HowFar$Core$Models$IObjectMeasurement$ToString",
            "Measurement", "HowFar$Core$Models$IObjectMeasurement$Measurement",
            "Value", "HowFar$Core$Models$IObjectMeasurement$Value",
            "Image", "HowFar$Core$Models$IObjectMeasurement$Image",
            "PluralName", "HowFar$Core$Models$IObjectMeasurement$PluralName",
            "Add", "HowFar$Core$Models$IObjectMeasurement$Add",
            "SingleName", "HowFar$Core$Models$IObjectMeasurement$SingleName"
        ],
        ctors: {
            ctor: function () {
                this.$initialize();
                HowFar.Core.BindableBase.ctor.call(this);
                this.ObjectMeasurements = new (System.Collections.Generic.List$1(HowFar.Core.Models.ObjectMeasurement)).ctor();
            },
            $ctor1: function (singleName, pluralName) {
                this.$initialize();
                HowFar.Core.BindableBase.ctor.call(this);
                this.SingleName = singleName;
                this.PluralName = pluralName;
                this.ObjectMeasurements = new (System.Collections.Generic.List$1(HowFar.Core.Models.ObjectMeasurement)).ctor();
            }
        },
        methods: {
            toString: function () {
                return this.Measurement != null ? System.String.format("{0}: {1} {2}", this.SingleName, Bridge.box(this.Value, System.Double, System.Double.format, System.Double.getHashCode), this.Measurement.PluralName) : System.String.format("{0} {1}", Bridge.box(this.Value, System.Double, System.Double.format, System.Double.getHashCode), this.PluralName);
            },
            Add: function (obj) {
                obj.Measurement = this;
                this.ObjectMeasurements.add(obj);
            }
        }
    });

    Bridge.define("HowFar.Core.Models.ObjectPack", {
        inherits: [HowFar.Core.BindableBase],
        fields: {
            _packName: null,
            _description: null,
            _packImage: null,
            ObjectMeasurements: null
        },
        props: {
            PackName: {
                get: function () {
                    return this._packName;
                },
                set: function (value) {
                    this.SetProperty(System.String, Bridge.ref(this, "_packName"), value);
                }
            },
            Name: {
                get: function () {
                    return this.PackName;
                }
            },
            ImageURL: {
                get: function () {
                    return this.PackImage;
                }
            },
            Description: {
                get: function () {
                    return this._description;
                },
                set: function (value) {
                    this.SetProperty(System.String, Bridge.ref(this, "_description"), value);
                }
            },
            PackImage: {
                get: function () {
                    return this._packImage;
                },
                set: function (value) {
                    this.SetProperty(System.String, Bridge.ref(this, "_packImage"), value);
                }
            }
        },
        ctors: {
            init: function () {
                this.ObjectMeasurements = new (System.Collections.Generic.List$1(HowFar.Core.Models.ObjectMeasurement)).ctor();
            },
            ctor: function () {
                this.$initialize();
                HowFar.Core.BindableBase.ctor.call(this);

            },
            $ctor1: function (name, description) {
                this.$initialize();
                HowFar.Core.BindableBase.ctor.call(this);
                this.PackName = name;
                this.Description = description;
                this.PackImage = "https://via.placeholder.com/150";
            }
        },
        methods: {
            toString: function () {
                return this.PackName;
            }
        }
    });

    Bridge.define("HowFar.Core.Models.ObjectRepositoryCache", {
        inherits: [HowFar.Core.Models.IObjectRepository],
        statics: {
            fields: {
                ObjectKey: null,
                PackKey: null
            },
            ctors: {
                init: function () {
                    this.ObjectKey = "ObjectMeasurements";
                    this.PackKey = "ObjectPacks";
                }
            }
        },
        fields: {
            _app: null,
            measurements: null,
            packs: null
        },
        alias: [
            "Dispose", "System$IDisposable$Dispose",
            "GetObjectMeasurement", "HowFar$Core$Models$IObjectRepository$GetObjectMeasurement",
            "GetObjectMeasurements", "HowFar$Core$Models$IObjectRepository$GetObjectMeasurements",
            "AddObject", "HowFar$Core$Models$IObjectRepository$AddObject",
            "RemoveObject", "HowFar$Core$Models$IObjectRepository$RemoveObject",
            "GetObjectPacks", "HowFar$Core$Models$IObjectRepository$GetObjectPacks",
            "AddPack", "HowFar$Core$Models$IObjectRepository$AddPack",
            "RemovePack", "HowFar$Core$Models$IObjectRepository$RemovePack",
            "UpdateObject", "HowFar$Core$Models$IObjectRepository$UpdateObject",
            "NewObject", "HowFar$Core$Models$IObjectRepository$NewObject"
        ],
        ctors: {
            ctor: function (app) {
                this.$initialize();
                this._app = app;
                this.measurements = this.GetKey(System.Collections.Generic.List$1(HowFar.Core.Models.ObjectMeasurement), HowFar.Core.Models.ObjectRepositoryCache.ObjectKey) || new (System.Collections.Generic.List$1(HowFar.Core.Models.ObjectMeasurement)).ctor();
                this.packs = this.GetKey(System.Collections.Generic.List$1(HowFar.Core.Models.ObjectPack), HowFar.Core.Models.ObjectRepositoryCache.PackKey) || new (System.Collections.Generic.List$1(HowFar.Core.Models.ObjectPack)).ctor();
                HowFar.Core.Models.ObjectRepositorySeeder.Startup(this);
            }
        },
        methods: {
            GetKey: function (T, key) {
                var data;
                if (this._app.HowFar$Core$Models$IApp$Properties.System$Collections$Generic$IDictionary$2$System$String$System$Object$containsKey(key) && ((data = Bridge.as(this._app.HowFar$Core$Models$IApp$Properties.System$Collections$Generic$IDictionary$2$System$String$System$Object$getItem(key), T))) != null) {
                    return data;
                }
                return Bridge.getDefaultValue(T);
            },
            Dispose: function () { },
            InsertKey: function (key, data) {
                if (this._app.HowFar$Core$Models$IApp$Properties.System$Collections$Generic$IDictionary$2$System$String$System$Object$containsKey(key)) {
                    this._app.HowFar$Core$Models$IApp$Properties.System$Collections$Generic$IDictionary$2$System$String$System$Object$setItem(key, data);
                } else {
                    this._app.HowFar$Core$Models$IApp$Properties.System$Collections$Generic$IDictionary$2$System$String$System$Object$add(key, data);
                }
            },
            SaveChanges: function () {
                var $step = 0,
                    $task1, 
                    $jumpFromFinally, 
                    $asyncBody = Bridge.fn.bind(this, function () {
                        for (;;) {
                            $step = System.Array.min([0,1], $step);
                            switch ($step) {
                                case 0: {
                                    this.InsertKey(HowFar.Core.Models.ObjectRepositoryCache.ObjectKey, this.measurements);
                                    this.InsertKey(HowFar.Core.Models.ObjectRepositoryCache.PackKey, this.packs);
                                    $task1 = this._app.HowFar$Core$Models$IApp$SavePropertiesAsync();
                                    $step = 1;
                                    if ($task1.isCompleted()) {
                                        continue;
                                    }
                                    $task1.continue($asyncBody);
                                    return;
                                }
                                case 1: {
                                    $task1.getAwaitedResult();
                                    return;
                                }
                                default: {
                                    return;
                                }
                            }
                        }
                    }, arguments);

                $asyncBody();
            },
            GetObjectMeasurement: function (name) {
                var data = this.GetObjectMeasurements();
                return System.Linq.Enumerable.from(data, HowFar.Core.Models.ObjectMeasurement).firstOrDefault(function (p) {
                        return Bridge.referenceEquals(p.SingleName.toLowerCase(), name.toLowerCase()) || Bridge.referenceEquals(p.PluralName.toLowerCase(), name.toLowerCase());
                    }, null);
            },
            GetObjectMeasurements: function () {
                return HowFar.Core.Models.ObjectRepositorySeeder.SetupTree(this.measurements);
            },
            AddObject: function (measurement) {
                if (measurement.ObjectPackName == null) {
                    throw new System.InvalidOperationException.$ctor1("must have a pack name");
                }

                if (measurement.ParentMeasurementSingleName == null && measurement.Measurement != null) {
                    measurement.ParentMeasurementSingleName = measurement.Measurement.SingleName;
                } else {
                    if (measurement.ParentMeasurementSingleName != null && measurement.Measurement == null) {
                        measurement.Measurement = System.Linq.Enumerable.from(this.measurements, HowFar.Core.Models.ObjectMeasurement).firstOrDefault(function (p) {
                                return Bridge.referenceEquals(p.SingleName, measurement.ParentMeasurementSingleName);
                            }, null);
                    }
                }
                if (measurement.ObjectPackName == null && measurement.ObjectPack != null) {
                    measurement.ObjectPackName = measurement.ObjectPack.PackName;
                } else {
                    if (measurement.ObjectPackName != null && measurement.ObjectPack == null) {
                        measurement.ObjectPack = System.Linq.Enumerable.from(this.packs, HowFar.Core.Models.ObjectPack).firstOrDefault(function (p) {
                                return Bridge.referenceEquals(p.PackName, measurement.ObjectPackName);
                            }, null);
                    }
                }

                var pack = System.Linq.Enumerable.from(this.packs, HowFar.Core.Models.ObjectPack).first(function (p) {
                        return Bridge.referenceEquals(p.PackName, measurement.ObjectPackName);
                    });
                if (System.Linq.Enumerable.from(pack.ObjectMeasurements, HowFar.Core.Models.ObjectMeasurement).any(function (p) {
                        return Bridge.referenceEquals(p.SingleName, measurement.SingleName);
                    }) !== true) {
                    pack.ObjectMeasurements.add(measurement);
                }

                this.measurements.add(measurement);
                this.SaveChanges();
            },
            RemoveObject: function (measurement) {
                this.measurements.remove(measurement);
                this.SaveChanges();
            },
            GetObjectPacks: function () {
                return this.packs;
            },
            AddPack: function (pack) {
                this.packs.add(pack);
                this.SaveChanges();

            },
            RemovePack: function (pack) {
                this.packs.remove(pack);
                this.SaveChanges();
            },
            UpdateObject: function (selectedObject) {

            },
            NewObject: function (plural, single, value, parent, pack) {
                return HowFar.Core.Models.ObjectRepositorySeeder.NewObjectAction(plural, single, value, parent.SingleName, pack, this);
            }
        }
    });

    Bridge.define("HowFar.Core.Models.MeasurementCompare", {
        inherits: [System.Collections.Generic.IComparer$1(HowFar.Core.Models.ObjectMeasurement)],
        fields: {
            _converters: null
        },
        alias: ["compare", ["System$Collections$Generic$IComparer$1$HowFar$Core$Models$ObjectMeasurement$compare", "System$Collections$Generic$IComparer$1$compare"]],
        ctors: {
            ctor: function (converters) {
                this.$initialize();
                this._converters = converters;
            }
        },
        methods: {
            compare: function (x, y) {
                var xtoy = this._converters.HowFar$Core$Models$IMeasureConverters$Convert(x, y, 1.0);
                if (xtoy > 1) {
                    return 1;
                }
                return -1;
            }
        }
    });
});

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICJIb3dGYXIuQnJpZGdlLmpzIiwKICAic291cmNlUm9vdCI6ICIiLAogICJzb3VyY2VzIjogWyJBcHAuY3MiLCIuLi9Ib3dGYXIuQ29yZS9CaW5kYWJsZUJhc2UuY3MiLCIuLi9Ib3dGYXIuQ29yZS9Nb2RlbHMvT2JqZWN0UmVwb3NpdG9yeVNlZWRlci5jcyIsIi4uL0hvd0Zhci5Db3JlL01vZGVscy9BcHBNb2RlbC5jcyIsIi4uL0hvd0Zhci5Db3JlL01vZGVscy9NZWFzdXJlQ29udmVydGVycy5jcyIsIi4uL0hvd0Zhci5Db3JlL01vZGVscy9PYmplY3RNZWFzdXJlbWVudC5jcyIsIi4uL0hvd0Zhci5Db3JlL01vZGVscy9PYmplY3RQYWNrLmNzIiwiLi4vSG93RmFyLkNvcmUvTW9kZWxzL09iamVjdFJlcG9zaXRvcnlDYWNoZS5jcyIsIi4uL0hvd0Zhci5Db3JlL01vZGVscy9NZWFzdXJlbWVudENvbXBhcmUuY3MiXSwKICAibmFtZXMiOiBbIiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7O1lBZ0JZQSxnQkFBZ0JBLElBQUlBLHFDQUFrQkEsSUFBSUEseUNBQXNCQSxJQUFJQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OzttQ0NOaERBLEdBQUdBLFVBQWdCQSxPQUFTQSxRQUFzQkE7OztnQkFFdEVBLElBQUlBLHFCQUFDQSxjQUFVQSxPQUFLQSwwQkFBZ0JBLFNBQU9BLEFBQU9BO29CQUU5Q0EsYUFBV0E7b0JBQ1hBLHVCQUFrQkE7b0JBQ2xCQSw2QkFBUUEsUUFBS0EsQUFBcUNBLFdBQWlCQTs7Ozt5Q0FPbENBOztnQkFFckNBLDJDQUFpQkEsUUFBS0EsQUFBcUNBLHFCQUF1QkEsTUFBTUEsSUFBSUEsK0NBQXlCQSxpQkFBZ0JBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O21DQ2I5R0E7O29CQUd2QkEsa0JBQWtCQSxLQUFJQTtvQkFJdEJBLGlCQUFpQkEsVUFBSUE7b0JBQ3JCQSw0QkFBNEJBO29CQUM1QkEsZ0JBQWdCQSxVQUFJ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LFlBQVpBLHFDQUFrQkEsQUFBd0JBOytCQUFLQSxtQ0FBY0E7O2dCQUNyR0EsSUFBSUEsNEJBQThDQSx5QkFBbkJBLDBDQUEyQ0EsQUFBK0JBOytCQUFLQSxxQ0FBZ0JBOztvQkFFMUhBLDRCQUE0QkE7OztnQkFHaENBLHNCQUFpQkE7Z0JBQ2pCQTs7b0NBR3FCQTtnQkFFckJBLHlCQUFvQkE7Z0JBQ3BCQTs7O2dCQUtBQSxPQUFPQTs7K0JBR1NBO2dCQUVoQkEsZUFBVUE7Z0JBQ1ZBOzs7a0NBSW1CQTtnQkFFbkJBLGtCQUFhQTtnQkFDYkE7O29DQUdxQkE7OztpQ0FNVUEsUUFBZUEsUUFBZUEsT0FBY0EsUUFBMEJBO2dCQUVyR0EsT0FBT0EsMERBQXVDQSxRQUFRQSxRQUFRQSxPQUFPQSxtQkFBbUJBLE1BQU1BOzs7Ozs7Ozs7Ozs7NEJDL0d4RUE7O2dCQUV0QkEsbUJBQWNBOzs7OytCQUVDQSxHQUFxQkE7Z0JBRXBDQSxXQUFXQSwrREFBb0JBLEdBQUdBO2dCQUNsQ0EsSUFBSUE7b0JBQVVBOztnQkFDZEEsT0FBT0EiLAogICJzb3VyY2VzQ29udGVudCI6IFsidXNpbmcgQnJpZGdlO1xyXG51c2luZyBOZXd0b25zb2Z0Lkpzb247XHJcbnVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5UaHJlYWRpbmcuVGFza3M7XHJcbnVzaW5nIEhvd0Zhci5Db3JlLk1vZGVscztcclxuXHJcbm5hbWVzcGFjZSBIb3dGYXIuQnJpZGdlXHJcbntcclxuICAgIFxyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBBcHAgXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIE1haW4oKVxyXG4gICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgIHZhciBjb252ZXJ0ZXIgPSBuZXcgTWVhc3VyZUNvbnZlcnRlcnMobmV3IE9iamVjdFJlcG9zaXRvcnlDYWNoZShuZXcgQXBwTW9kZWwoKSkpO1xyXG5cclxuICAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICAvLyBXcml0ZSBhIG1lc3NhZ2UgdG8gdGhlIENvbnNvbGVcclxuICAgICAgICAgICAgLy9Db25zb2xlLldyaXRlTGluZShcIldlbGNvbWUgdG8gQnJpZGdlLk5FVFwiKTtcclxuXHJcbiAgICAgICAgICAgIC8vIEFmdGVyIGJ1aWxkaW5nIChDdHJsICsgU2hpZnQgKyBCKSB0aGlzIHByb2plY3QsIFxyXG4gICAgICAgICAgICAvLyBicm93c2UgdG8gdGhlIC9iaW4vRGVidWcgb3IgL2Jpbi9SZWxlYXNlIGZvbGRlci5cclxuXHJcbiAgICAgICAgICAgIC8vIEEgbmV3IGJyaWRnZS8gZm9sZGVyIGhhcyBiZWVuIGNyZWF0ZWQgYW5kXHJcbiAgICAgICAgICAgIC8vIGNvbnRhaW5zIHlvdXIgcHJvamVjdHMgSmF2YVNjcmlwdCBmaWxlcy4gXHJcblxyXG4gICAgICAgICAgICAvLyBPcGVuIHRoZSBicmlkZ2UvaW5kZXguaHRtbCBmaWxlIGluIGEgYnJvd3NlciBieVxyXG4gICAgICAgICAgICAvLyBSaWdodC1DbGljayA+IE9wZW4gV2l0aC4uLiwgdGhlbiBjaG9vc2UgYVxyXG4gICAgICAgICAgICAvLyB3ZWIgYnJvd3NlciBmcm9tIHRoZSBsaXN0XHJcblxyXG4gICAgICAgICAgICAvLyBUaGlzIGFwcGxpY2F0aW9uIHdpbGwgdGhlbiBydW4gaW4gdGhlIGJyb3dzZXIuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgXHJcbiAgICB9XHJcbn0iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db21wb25lbnRNb2RlbDtcclxudXNpbmcgU3lzdGVtLlJ1bnRpbWUuQ29tcGlsZXJTZXJ2aWNlcztcclxuXHJcbm5hbWVzcGFjZSBIb3dGYXIuQ29yZVxyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgQmluZGFibGVCYXNlIDogSU5vdGlmeVByb3BlcnR5Q2hhbmdlZFxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBldmVudCBQcm9wZXJ0eUNoYW5nZWRFdmVudEhhbmRsZXIgUHJvcGVydHlDaGFuZ2VkO1xyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBTZXRQcm9wZXJ0eTxUPihyZWYgVCBwcm9wZXJ0eSwgVCB2YWx1ZSwgQWN0aW9uIGFjdGlvbiA9IG51bGwsIFtDYWxsZXJNZW1iZXJOYW1lXSBzdHJpbmcgbmFtZSA9IG51bGwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoKHByb3BlcnR5IT1udWxsP3Byb3BlcnR5LkVxdWFscyh2YWx1ZSk6KGJvb2w/KW51bGwpICE9IHRydWUpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHByb3BlcnR5ID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICBPblByb3BlcnR5Q2hhbmdlZChuYW1lKTtcclxuICAgICAgICAgICAgICAgIGFjdGlvbiE9bnVsbD9nbG9iYWw6OkJyaWRnZS5TY3JpcHQuRnJvbUxhbWJkYSgoKT0+YWN0aW9uLkludm9rZSgpKTpudWxsO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuI2lmICFCUklER0VcclxuICAgICAgICBbSG93RmFyLkNvcmUuQW5ub3RhdGlvbnMuTm90aWZ5UHJvcGVydHlDaGFuZ2VkSW52b2NhdG9yXVxyXG4jZW5kaWZcclxuICAgICAgICBwcm90ZWN0ZWQgdmlydHVhbCB2b2lkIE9uUHJvcGVydHlDaGFuZ2VkKFtDYWxsZXJNZW1iZXJOYW1lXSBzdHJpbmcgcHJvcGVydHlOYW1lID0gbnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFByb3BlcnR5Q2hhbmdlZCE9bnVsbD9nbG9iYWw6OkJyaWRnZS5TY3JpcHQuRnJvbUxhbWJkYSgoKT0+UHJvcGVydHlDaGFuZ2VkLkludm9rZSh0aGlzLCBuZXcgUHJvcGVydHlDaGFuZ2VkRXZlbnRBcmdzKHByb3BlcnR5TmFtZSkpKTpudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsInVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuT2JqZWN0TW9kZWw7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG5cclxubmFtZXNwYWNlIEhvd0Zhci5Db3JlLk1vZGVsc1xyXG57XHJcbiAgICBwdWJsaWMgc3RhdGljIGNsYXNzIE9iamVjdFJlcG9zaXRvcnlTZWVkZXJcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgY29uc3Qgc3RyaW5nIE1ldHJpYyA9IFwiTWV0cmljXCI7XHJcbiAgICAgICAgcHVibGljIGNvbnN0IHN0cmluZyBJbXBlcmlhbCA9IFwiSW1wZXJpYWxcIjtcclxuICAgICAgICBwdWJsaWMgY29uc3Qgc3RyaW5nIFNwYWNlID0gXCJTcGFjZVwiO1xyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgU3RhcnR1cChJT2JqZWN0UmVwb3NpdG9yeSByZXBvc2l0b3J5KVxyXG4gICAgICAgIHtcclxuI2lmIEJSSURHRVxyXG4gICAgICAgICAgICB2YXIgb2JqZWN0UGFja3MgPSBuZXcgTGlzdDxPYmplY3RQYWNrPigpO1xyXG4jZWxzZVxyXG4gICAgICAgICAgICAgICAgdmFyIG9iamVjdFBhY2tzID0gbmV3IE9ic2VydmFibGVDb2xsZWN0aW9uPE9iamVjdFBhY2s+KCk7XHJcbiNlbmRpZlxyXG4gICAgICAgICAgICB2YXIgY2VudGltZXRlciA9IG5ldyBPYmplY3RNZWFzdXJlbWVudChcIkNlbnRpbWV0ZXJcIiwgXCJDZW50aW1ldGVyc1wiKSB7IFZhbHVlID0gMSB9O1xyXG4gICAgICAgICAgICBjZW50aW1ldGVyLk9iamVjdFBhY2tOYW1lID0gTWV0cmljO1xyXG4gICAgICAgICAgICBvYmplY3RQYWNrcy5BZGQobmV3IE9iamVjdFBhY2soXCJDdXN0b21cIiwgXCJPYmplY3RzIHRoYXQgYXJlIG1hZGUgaW4gdGhlIGFwcCBhcmUgcGxhY2VkIGhlcmUuXCIpIHsgUGFja0ltYWdlID0gXCJBc3NldHMvYmxvY2sucG5nXCIgfSk7XHJcbiAgICAgICAgICAgIG9iamVjdFBhY2tzLkFkZChuZXcgT2JqZWN0UGFjayhJbXBlcmlhbCwgXCJBIGRlZmF1bHQgcGFja2FnZSBmb3IgdGhlIFVTIG1lYXN1cmVtZW50IHN5c3RlbVwiKSB7IFBhY2tJbWFnZSA9IFwiaHR0cHM6Ly9sb2dvZXBzLmNvbS93cC1jb250ZW50L3VwbG9hZHMvMjAxMy8wNi9mbGFnLW9mLXVzYS12ZWN0b3ItbG9nby5wbmdcIiB9KTtcclxuICAgICAgICAgICAgb2JqZWN0UGFja3MuQWRkKG5ldyBPYmplY3RQYWNrKE1ldHJpYywgXCJUaGUgbWV0cmljIHN5c3RlbS4gIFVzZWQgYnkgZXZlcnlvbmUgZXhjZXB0IHRoZSBVU1wiKSB7IFBhY2tJbWFnZSA9IFwiaHR0cDovL3d3dy5rbmlnaHRzdGVtcGxhcm9yZGVyLm9yZy93cC1jb250ZW50L3VwbG9hZHMvMjAxNi8wNi9VTi1TRUFMLVN0eWxpemVkLTUwMC1Ccm93bi5wbmdcIiB9KTtcclxuICAgICAgICAgICAgb2JqZWN0UGFja3MuQWRkKG5ldyBPYmplY3RQYWNrKFNwYWNlLCBcIk9iamVjdHMgYW5kIE1lYXN1cmVtZW50cyBpbiBzcGFjZVwiKSB7IFBhY2tJbWFnZSA9IFwiaHR0cHM6Ly9zZXAueWltZy5jb20vYXkvc2t5aW1hZ2UvbmFzYS1zcGFjZS1taXNzaW9ucy05LmpwZ1wiIH0pO1xyXG4gICAgICAgICAgICB2YXIgcGFja3MgPSBTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLlRvTGlzdDxPYmplY3RQYWNrPihyZXBvc2l0b3J5LkdldE9iamVjdFBhY2tzKCkpO1xyXG4gICAgICAgICAgICBmb3JlYWNoICh2YXIgb2JqZWN0UGFjayBpbiBvYmplY3RQYWNrcylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLlNlbGVjdDxPYmplY3RQYWNrLHN0cmluZz4ocGFja3MsKFN5c3RlbS5GdW5jPE9iamVjdFBhY2ssc3RyaW5nPikocCA9PiBwLlBhY2tOYW1lKSkuQ29udGFpbnMob2JqZWN0UGFjay5QYWNrTmFtZSkpXHJcbiAgICAgICAgICAgICAgICAgICAgcmVwb3NpdG9yeS5BZGRQYWNrKG9iamVjdFBhY2spO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvL2RiLlNhdmVDaGFuZ2VzKCk7XHJcbiAgICAgICAgICAgIGlmIChTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLkFsbDxPYmplY3RNZWFzdXJlbWVudD4ocmVwb3NpdG9yeS5HZXRPYmplY3RNZWFzdXJlbWVudHMoKSwoU3lzdGVtLkZ1bmM8T2JqZWN0TWVhc3VyZW1lbnQsYm9vbD4pKHAgPT4gcC5TaW5nbGVOYW1lICE9IGNlbnRpbWV0ZXIuU2luZ2xlTmFtZSkpKVxyXG4gICAgICAgICAgICAgICAgcmVwb3NpdG9yeS5BZGRPYmplY3QoY2VudGltZXRlcik7XHJcbiAgICAgICAgICAgIC8vcmVwb3NpdG9yeS5VcGRhdGVQYWNrKEltcGVyaWFsLCBjZW50aW1ldGVyKTtcclxuICAgICAgICAgICAgdmFyIGluY2hlcyA9IHJlcG9zaXRvcnkuTmV3T2JqZWN0KFwiSW5jaGVzXCIsIFwiSW5jaFwiLCAyLjU0LCBjZW50aW1ldGVyLCBJbXBlcmlhbCk7XHJcbiAgICAgICAgICAgIHZhciBmZWV0ID0gcmVwb3NpdG9yeS5OZXdPYmplY3QoXCJGZWV0XCIsIFwiRm9vdFwiLCAxMiwgaW5jaGVzLCBJbXBlcmlhbCk7XHJcbiAgICAgICAgICAgIHZhciBtaWxlID0gcmVwb3NpdG9yeS5OZXdPYmplY3QoXCJNaWxlc1wiLCBcIk1pbGVcIiwgNTI4MCwgZmVldCwgSW1wZXJpYWwpO1xyXG4gICAgICAgICAgICB2YXIgbWV0ZXIgPSByZXBvc2l0b3J5Lk5ld09iamVjdChcIk1ldGVyc1wiLCBcIk1ldGVyXCIsIDEwMCwgY2VudGltZXRlciwgTWV0cmljKTtcclxuICAgICAgICAgICAgdmFyIGtpbG9NZXRlciA9IHJlcG9zaXRvcnkuTmV3T2JqZWN0KFwiS2lsb21ldGVyc1wiLCBcIktpbG9tZXRlclwiLCAxMDAwLCBtZXRlciwgTWV0cmljKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBuYW5vTWV0ZXIgPSByZXBvc2l0b3J5Lk5ld09iamVjdChcIk5hbm9tZXRlcnNcIiwgXCJOYW5vbWV0ZXJcIiwgMC4wMDAwMDAxLCBjZW50aW1ldGVyLCBNZXRyaWMpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGVhcnRoID0gcmVwb3NpdG9yeS5OZXdPYmplY3QoXCJFYXJ0aHNcIiwgXCJFYXJ0aFwiLCAyNTAwMCwgbWlsZSwgU3BhY2UpO1xyXG4gICAgICAgICAgICB2YXIgc3VuID0gcmVwb3NpdG9yeS5OZXdPYmplY3QoXCJTdW5zXCIsIFwiU3VuXCIsIDEwMywgZWFydGgsIFNwYWNlKTtcclxuICAgICAgICAgICAgdmFyIGRpc3QgPSByZXBvc2l0b3J5Lk5ld09iamVjdChcIkRpc3RhbmNlIGZyb20gRWFydGggdG8gU3VuXCIsIFwiRGlzdGFuY2UgZnJvbSBFYXJ0aCB0byBTdW5cIiwgOTI5NTU4MDcsIG1pbGUsIFNwYWNlKTtcclxuICAgICAgICAgICAgdmFyIGxpZ2h0eWVhciA9IHJlcG9zaXRvcnkuTmV3T2JqZWN0KFwiTGlnaHR5ZWFyc1wiLCBcIkxpZ2h0eWVhclwiLCA1ODc4NjI1MDAwMDAwLCBtaWxlLCBTcGFjZSk7XHJcblxyXG4gICAgICAgICAgICB2YXIgYWxwaGEgPSByZXBvc2l0b3J5Lk5ld09iamVjdChcIkRpc3RhbmNlIGZyb20gRWFydGggdG8gQWxwaGEgQ2VudGF1cmlcIiwgXCJEaXN0YW5jZSBmcm9tIEVhcnRoIHRvIEFscGhhIENlbnRhdXJpXCIsIDQuNCwgbGlnaHR5ZWFyLCBTcGFjZSk7XHJcbiAgICAgICAgICAgIHZhciBwaWNvID0gcmVwb3NpdG9yeS5OZXdPYmplY3QoXCJQaWNvbWV0ZXJzXCIsIFwiUGljb21ldGVyXCIsIDAuMDAxLCBuYW5vTWV0ZXIsIE1ldHJpYyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIE9iamVjdE1lYXN1cmVtZW50IE5ld09iamVjdEFjdGlvbihzdHJpbmcgcGx1cmFsTmFtZSwgc3RyaW5nIHNpbmdsZU5hbWUsIGRvdWJsZSB2YWx1ZSwgc3RyaW5nIG1lYXN1cmVtZW50U3RyLCBzdHJpbmcgcGFjaywgSU9iamVjdFJlcG9zaXRvcnkgcmVwb3NpdG9yeSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChtZWFzdXJlbWVudFN0ciAhPSBudWxsICYmIFN5c3RlbS5MaW5xLkVudW1lcmFibGUuQWxsPE9iamVjdE1lYXN1cmVtZW50PihyZXBvc2l0b3J5LkdldE9iamVjdE1lYXN1cmVtZW50cygpLChTeXN0ZW0uRnVuYzxPYmplY3RNZWFzdXJlbWVudCxib29sPikocCA9PiBwLlNpbmdsZU5hbWUgIT0gc2luZ2xlTmFtZSkpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbWVhc3VyZSA9IHJlcG9zaXRvcnkuR2V0T2JqZWN0TWVhc3VyZW1lbnQobWVhc3VyZW1lbnRTdHIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKG1lYXN1cmUgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgbmV3T2JqZWN0ID0gbmV3IE9iamVjdE1lYXN1cmVtZW50KHNpbmdsZU5hbWUsIHBsdXJhbE5hbWUpIHsgVmFsdWUgPSB2YWx1ZSwgT2JqZWN0UGFja05hbWUgPSBwYWNrIH07XHJcbiAgICAgICAgICAgICAgICAgICAgbWVhc3VyZS5BZGQobmV3T2JqZWN0KTtcclxuICAgICAgICAgICAgICAgICAgICByZXBvc2l0b3J5LkFkZE9iamVjdChuZXdPYmplY3QpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vcmVwb3NpdG9yeS5VcGRhdGVQYWNrKHBhY2ssIG5ld09iamVjdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ld09iamVjdDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIElMaXN0PE9iamVjdE1lYXN1cmVtZW50PiBTZXR1cFRyZWUoSUxpc3Q8T2JqZWN0TWVhc3VyZW1lbnQ+IGRhdGEpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3JlYWNoICh2YXIgb2JqZWN0TWVhc3VyZW1lbnQgaW4gZGF0YSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKG9iamVjdE1lYXN1cmVtZW50LlBhcmVudE1lYXN1cmVtZW50U2luZ2xlTmFtZSAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIG9iamVjdE1lYXN1cmVtZW50Lk1lYXN1cmVtZW50ID1cclxuU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5GaXJzdDxPYmplY3RNZWFzdXJlbWVudD4oICAgICAgICAgICAgICAgICAgICAgICAgZGF0YSwoU3lzdGVtLkZ1bmM8T2JqZWN0TWVhc3VyZW1lbnQsYm9vbD4pKHAgPT4gcC5TaW5nbGVOYW1lID09IG9iamVjdE1lYXN1cmVtZW50LlBhcmVudE1lYXN1cmVtZW50U2luZ2xlTmFtZSkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHZhciB0ID0gU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5XaGVyZTxPYmplY3RNZWFzdXJlbWVudD4oZGF0YSwoU3lzdGVtLkZ1bmM8T2JqZWN0TWVhc3VyZW1lbnQsYm9vbD4pKHAgPT4gcC5QYXJlbnRNZWFzdXJlbWVudFNpbmdsZU5hbWUgPT0gb2JqZWN0TWVhc3VyZW1lbnQuU2luZ2xlTmFtZSkpO1xyXG4gICAgICAgICAgICAgICAgb2JqZWN0TWVhc3VyZW1lbnQuT2JqZWN0TWVhc3VyZW1lbnRzID0gdC5Ub0xpc3QoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwidXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5UaHJlYWRpbmcuVGFza3M7XHJcblxyXG5uYW1lc3BhY2UgSG93RmFyLkNvcmUuTW9kZWxzXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBBcHBNb2RlbCA6IElBcHBcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgSURpY3Rpb25hcnk8c3RyaW5nLCBvYmplY3Q+IFByb3BlcnRpZXMgeyBnZXQ7IHByaXZhdGUgc2V0OyB9XHJcbiAgICAgICAgcHVibGljIGFzeW5jIFRhc2sgU2F2ZVByb3BlcnRpZXNBc3luYygpXHJcbiAgICAgICAge1xyXG5cclxuICAgICAgICB9XHJcblxuICAgIFxucHJpdmF0ZSBJRGljdGlvbmFyeTxzdHJpbmcsIG9iamVjdD4gX19Qcm9wZXJ0eV9fSW5pdGlhbGl6ZXJfX1Byb3BlcnRpZXM9bmV3IERpY3Rpb25hcnk8c3RyaW5nLCBvYmplY3Q+KCk7fVxyXG59IiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLk9iamVjdE1vZGVsO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxuXHJcbm5hbWVzcGFjZSBIb3dGYXIuQ29yZS5Nb2RlbHNcclxue1xyXG4gICAgcHVibGljIGNsYXNzIE1lYXN1cmVDb252ZXJ0ZXJzIDogSU1lYXN1cmVDb252ZXJ0ZXJzXHJcbiAgICB7XHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBJT2JqZWN0UmVwb3NpdG9yeSBfcmVwb3NpdG9yeTtcclxucHVibGljIE9iamVjdE1lYXN1cmVtZW50IENlbnRpbWV0ZXJcclxue1xyXG4gICAgZ2V0XHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIEZpbmQoXCJDZW50aW1ldGVyXCIpO1xyXG4gICAgfVxyXG59ICAgICAgICBwdWJsaWMgTWVhc3VyZUNvbnZlcnRlcnMoSU9iamVjdFJlcG9zaXRvcnkgcmVwb3NpdG9yeSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIF9yZXBvc2l0b3J5ID0gcmVwb3NpdG9yeTtcclxuICAgICAgICAgICAgVXBkYXRlTGlzdCgpO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG5cclxuI2lmIEJSSURHRVxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBVcGRhdGVMaXN0KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIE9iamVjdE1lYXN1cmVtZW50cyA9IG5ldyBMaXN0PE9iamVjdE1lYXN1cmVtZW50PihTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLk9yZGVyQnk8T2JqZWN0TWVhc3VyZW1lbnQsT2JqZWN0TWVhc3VyZW1lbnQ+KEdldEFsbCgpLChGdW5jPE9iamVjdE1lYXN1cmVtZW50LE9iamVjdE1lYXN1cmVtZW50PikocCA9PiBwKSwgbmV3IE1lYXN1cmVtZW50Q29tcGFyZSh0aGlzKSkpO1xyXG4gICAgICAgICAgICBPYmplY3RQYWNrcyA9IG5ldyBMaXN0PE9iamVjdFBhY2s+KF9yZXBvc2l0b3J5LkdldE9iamVjdFBhY2tzKCkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgTGlzdDxPYmplY3RQYWNrPiBPYmplY3RQYWNrcyB7IGdldDsgc2V0OyB9XHJcbiAgICAgICAgcHVibGljIExpc3Q8T2JqZWN0TWVhc3VyZW1lbnQ+IE9iamVjdE1lYXN1cmVtZW50cyB7IGdldDsgc2V0OyB9XHJcblxyXG4jZWxzZVxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBVcGRhdGVMaXN0KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIE9iamVjdE1lYXN1cmVtZW50cyA9IG5ldyBPYnNlcnZhYmxlQ29sbGVjdGlvbjxPYmplY3RNZWFzdXJlbWVudD4oR2V0QWxsKCkuT3JkZXJCeShwID0+IHAsIG5ldyBNZWFzdXJlbWVudENvbXBhcmUodGhpcykpKTtcclxuICAgICAgICAgICAgT2JqZWN0UGFja3MgPSBuZXcgT2JzZXJ2YWJsZUNvbGxlY3Rpb248T2JqZWN0UGFjaz4oX3JlcG9zaXRvcnkuR2V0T2JqZWN0UGFja3MoKSk7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgT2JzZXJ2YWJsZUNvbGxlY3Rpb248T2JqZWN0UGFjaz4gT2JqZWN0UGFja3MgeyBnZXQ7IHNldDsgfVxyXG4gICAgICAgIHB1YmxpYyBPYnNlcnZhYmxlQ29sbGVjdGlvbjxPYmplY3RNZWFzdXJlbWVudD4gT2JqZWN0TWVhc3VyZW1lbnRzIHsgZ2V0OyBzZXQ7IH1cclxuXHJcbiNlbmRpZlxyXG5cclxuXHJcbiAgICAgICAgcHVibGljIGRvdWJsZSBDb252ZXJ0KE9iamVjdE1lYXN1cmVtZW50IEBmcm9tLCBPYmplY3RNZWFzdXJlbWVudCB0bywgZG91YmxlIHZhbHVlRnJvbSA9IDEpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZihmcm9tID09IG51bGwpIHRocm93IG5ldyBBcmd1bWVudE51bGxFeGNlcHRpb24oXCInZnJvbScgY2Fubm90IGJlIG51bGxcIik7XHJcbiAgICAgICAgICAgIGlmICh0byA9PSBudWxsKSB0aHJvdyBuZXcgQXJndW1lbnROdWxsRXhjZXB0aW9uKFwiJ3RvJyBjYW5ub3QgYmUgbnVsbFwiKTtcclxuICAgICAgICAgICAgcmV0dXJuIENvbnZlcnQoZnJvbS5QbHVyYWxOYW1lLCB0by5QbHVyYWxOYW1lLCB2YWx1ZUZyb20pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGRvdWJsZSBDb252ZXJ0KHN0cmluZyBuYW1lRnJvbSwgc3RyaW5nIG5hbWVUbywgZG91YmxlIHZhbHVlRnJvbSA9IDEpXHJcbiAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgdmFyIGZyb20gPSBGaW5kKG5hbWVGcm9tKTtcclxuICAgICAgICAgICAgdmFyIHRvID0gRmluZChuYW1lVG8pO1xyXG4gICAgICAgICAgICBpZiAodG8gPT0gZnJvbSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlRnJvbTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWVGcm9tICogQ2FsY3VsYXRlKGZyb20sIHRvKSA/PyAwO1xyXG4gICAgICAgIH1cclxuICAgICAgIFxyXG4gICAgICAgIHByaXZhdGUgZG91YmxlPyBDYWxjdWxhdGUoT2JqZWN0TWVhc3VyZW1lbnQgQGZyb20sIE9iamVjdE1lYXN1cmVtZW50IHRvLCBkb3VibGUgdmFsdWUgPSAxKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKGZyb20uUGFyZW50TWVhc3VyZW1lbnRTaW5nbGVOYW1lICE9IG51bGwpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChmcm9tLlBhcmVudE1lYXN1cmVtZW50U2luZ2xlTmFtZSA9PSB0by5TaW5nbGVOYW1lKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmcm9tLlZhbHVlICogdmFsdWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHVwID0gQ2FsY3VsYXRlKGZyb20uTWVhc3VyZW1lbnQsIHRvLCBmcm9tLlZhbHVlICogdmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh1cCAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHVwO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBHb0Rvd24oZnJvbSwgdG8sIHZhbHVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgZG91YmxlPyBHb0Rvd24oT2JqZWN0TWVhc3VyZW1lbnQgZnJvbSwgT2JqZWN0TWVhc3VyZW1lbnQgdG8sIGRvdWJsZSB2YWx1ZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBjaGlsZHJlbiA9IGZyb20uT2JqZWN0TWVhc3VyZW1lbnRzO1xyXG4gICAgICAgICAgICAvL2lmIChjaGlsZHJlbi5BbnkoKSAhPSB0cnVlKVxyXG4gICAgICAgICAgICAvL3tcclxuICAgICAgICAgICAgLy8gICAgY2hpbGRyZW4gPSBGaW5kKGZyb20uU2luZ2xlTmFtZSkuT2JqZWN0TWVhc3VyZW1lbnRzO1xyXG4gICAgICAgICAgICAvL31cclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIG9iamVjdE1lYXN1cmVtZW50IGluIGNoaWxkcmVuKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAob2JqZWN0TWVhc3VyZW1lbnQgPT0gdG8pXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlIC8gdG8uVmFsdWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRvd24gPSBHb0Rvd24ob2JqZWN0TWVhc3VyZW1lbnQsIHRvLCB2YWx1ZSAvIG9iamVjdE1lYXN1cmVtZW50LlZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZG93biAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRvd247XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBwcml2YXRlIExpc3Q8T2JqZWN0TWVhc3VyZW1lbnQ+IEdldEFsbCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5Ub0xpc3Q8T2JqZWN0TWVhc3VyZW1lbnQ+KF9yZXBvc2l0b3J5LkdldE9iamVjdE1lYXN1cmVtZW50cygpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBPYmplY3RNZWFzdXJlbWVudCBGaW5kKHN0cmluZyBuYW1lKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIF9yZXBvc2l0b3J5LkdldE9iamVjdE1lYXN1cmVtZW50KG5hbWUpO1xyXG4gICAgICAgICAgICAvL3JldHVybiBGaW5kKENlbnRpbWV0ZXIsIG5hbWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuXHJcbiAgICAgICAgcHVibGljIE9iamVjdE1lYXN1cmVtZW50IE5ld09iamVjdChzdHJpbmcgcGx1cmFsTmFtZSwgc3RyaW5nIHNpbmdsZU5hbWUsIGRvdWJsZSB2YWx1ZSwgc3RyaW5nIG1lYXN1cmVtZW50LCBzdHJpbmcgcGFjayA9IFwiQ3VzdG9tXCIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgbWVhc3VyZSA9IEZpbmQobWVhc3VyZW1lbnQpO1xyXG4gICAgICAgICAgICBpZiAobWVhc3VyZSAhPSBudWxsKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbmV3T2JqZWN0ID0gbmV3IE9iamVjdE1lYXN1cmVtZW50KHNpbmdsZU5hbWUsIHBsdXJhbE5hbWUpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgVmFsdWUgPSB2YWx1ZSxcclxuICAgICAgICAgICAgICAgICAgICBPYmplY3RQYWNrTmFtZSA9IHBhY2ssXHJcbiAgICAgICAgICAgICAgICAgICAgUGFyZW50TWVhc3VyZW1lbnRTaW5nbGVOYW1lID0gbWVhc3VyZS5TaW5nbGVOYW1lXHJcblxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIF9yZXBvc2l0b3J5LkFkZE9iamVjdChuZXdPYmplY3QpO1xyXG4gICAgICAgICAgICAgICAgVXBkYXRlTGlzdCgpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ld09iamVjdDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBEZWxldGVQYWNrKE9iamVjdFBhY2sgcGFjaylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIF9yZXBvc2l0b3J5LlJlbW92ZVBhY2socGFjayk7XHJcbiAgICAgICAgICAgIFVwZGF0ZUxpc3QoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIERlbGV0ZU9iamVjdChPYmplY3RNZWFzdXJlbWVudCBzZWxlY3RlZE9iamVjdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIF9yZXBvc2l0b3J5LlJlbW92ZU9iamVjdChzZWxlY3RlZE9iamVjdCk7XHJcbiAgICAgICAgICAgIHRoaXMuVXBkYXRlTGlzdCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgVXBkYXRlT2JqZWN0KE9iamVjdE1lYXN1cmVtZW50IHNlbGVjdGVkT2JqZWN0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgX3JlcG9zaXRvcnkuVXBkYXRlT2JqZWN0KHNlbGVjdGVkT2JqZWN0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBVcGRhdGVQYWNrKHN0cmluZyBwYWNrLCBPYmplY3RNZWFzdXJlbWVudCBuZXdPYmplY3QpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgcGFja3MgPSBTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLkZpcnN0T3JEZWZhdWx0PE9iamVjdFBhY2s+KE9iamVjdFBhY2tzLChGdW5jPE9iamVjdFBhY2ssYm9vbD4pKHAgPT4gcC5QYWNrTmFtZSA9PSBwYWNrKSk7XHJcbiAgICAgICAgICAgIGlmIChwYWNrcyAhPSBudWxsKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBwYWNrcy5PYmplY3RNZWFzdXJlbWVudHMuQWRkKG5ld09iamVjdCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgSW52YWxpZE9wZXJhdGlvbkV4Y2VwdGlvbihzdHJpbmcuRm9ybWF0KFwicGFja2FnZSAnezB9JyBtdXN0IGV4aXN0IGZpcnN0XCIscGFjaykpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgY29uc3Qgc3RyaW5nIFByb3BlcnR5S2V5ID0gXCJDb252ZXJzaW9uc1wiO1xyXG5cclxuXHJcbiAgICAgICAgcHVibGljIE9iamVjdE1lYXN1cmVtZW50IE5ld09iamVjdChzdHJpbmcgcGx1cmFsTmFtZSwgc3RyaW5nIHNpbmdsZU5hbWUsXHJcbiAgICAgICAgICAgIGRvdWJsZSB2YWx1ZSwgT2JqZWN0TWVhc3VyZW1lbnQgbWVhc3VyZW1lbnQsIHN0cmluZyBwYWNrID0gXCJDdXN0b21cIilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBOZXdPYmplY3QocGx1cmFsTmFtZSwgc2luZ2xlTmFtZSwgdmFsdWUsIG1lYXN1cmVtZW50LlBsdXJhbE5hbWUsIHBhY2spO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgTmV3UGFjayhPYmplY3RQYWNrIHBhY2spXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLl9yZXBvc2l0b3J5LkFkZFBhY2socGFjayk7XHJcbiAgICAgICAgICAgIHRoaXMuVXBkYXRlTGlzdCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsInVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uQ29tcG9uZW50TW9kZWwuRGF0YUFubm90YXRpb25zO1xyXG51c2luZyBTeXN0ZW0uQ29tcG9uZW50TW9kZWwuRGF0YUFubm90YXRpb25zLlNjaGVtYTtcclxuXHJcbm5hbWVzcGFjZSBIb3dGYXIuQ29yZS5Nb2RlbHNcclxue1xyXG4gICAgcHVibGljIGNsYXNzIE9iamVjdE1lYXN1cmVtZW50IDogQmluZGFibGVCYXNlLCBJT2JqZWN0TWVhc3VyZW1lbnRcclxuICAgIHtcclxuICAgICAgICBwcml2YXRlIGRvdWJsZSBfdmFsdWU7XHJcbiAgICAgICAgcHJpdmF0ZSBzdHJpbmcgX2ltYWdlO1xyXG4gICAgICAgIHByaXZhdGUgc3RyaW5nIF9wbHVyYWxOYW1lO1xyXG4gICAgICAgIHByaXZhdGUgTGlzdDxPYmplY3RNZWFzdXJlbWVudD4gX29iamVjdE1lYXN1cmVtZW50cztcclxuICAgICAgICBwcml2YXRlIHN0cmluZyBfc2luZ2xlTmFtZTtcclxuICAgICAgICBwcml2YXRlIE9iamVjdFBhY2sgX29iamVjdFBhY2s7XHJcbiAgICAgICAgcHJpdmF0ZSBzdHJpbmcgX29iamVjdFBhY2tOYW1lO1xyXG4gICAgICAgIHByaXZhdGUgT2JqZWN0TWVhc3VyZW1lbnQgX21lYXN1cmVtZW50O1xyXG4gICAgICAgIHByaXZhdGUgc3RyaW5nIF9wYXJlbnRNZWFzdXJlbWVudFNpbmdsZU5hbWU7XHJcblxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSBzdHJpbmcgVG9TdHJpbmcoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIE1lYXN1cmVtZW50ICE9IG51bGwgPyBzdHJpbmcuRm9ybWF0KFwiezB9OiB7MX0gezJ9XCIsU2luZ2xlTmFtZSxWYWx1ZSxNZWFzdXJlbWVudC5QbHVyYWxOYW1lKTogc3RyaW5nLkZvcm1hdChcInswfSB7MX1cIixWYWx1ZSxQbHVyYWxOYW1lKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIFtGb3JlaWduS2V5KFwiTWVhc3VyZW1lbnRcIildXHJcbiAgICAgICAgcHVibGljIHN0cmluZyBQYXJlbnRNZWFzdXJlbWVudFNpbmdsZU5hbWVcclxue1xyXG4gICAgZ2V0XHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIF9wYXJlbnRNZWFzdXJlbWVudFNpbmdsZU5hbWU7XHJcbiAgICB9XHJcblxyXG4gICAgXHJcbiAgICBzZXRcclxuICAgIHtcclxuICAgICAgICBTZXRQcm9wZXJ0eTxzdHJpbmc+KHJlZiBfcGFyZW50TWVhc3VyZW1lbnRTaW5nbGVOYW1lLCB2YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBcclxufVxyXG4gICAgICAgIHB1YmxpYyB2aXJ0dWFsIE9iamVjdE1lYXN1cmVtZW50IE1lYXN1cmVtZW50XHJcbntcclxuICAgIGdldFxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBfbWVhc3VyZW1lbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgXHJcbiAgICBzZXRcclxuICAgIHtcclxuICAgICAgICBTZXRQcm9wZXJ0eTxPYmplY3RNZWFzdXJlbWVudD4ocmVmIF9tZWFzdXJlbWVudCwgdmFsdWUpO1xyXG4gICAgfVxyXG4gICAgXHJcbn1cclxuICAgICAgICBwdWJsaWMgZG91YmxlIFZhbHVlXHJcbntcclxuICAgIGdldFxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBfdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgXHJcbiAgICBzZXRcclxuICAgIHtcclxuICAgICAgICBTZXRQcm9wZXJ0eTxkb3VibGU+KHJlZiBfdmFsdWUsIHZhbHVlKTtcclxuICAgIH1cclxuICAgIFxyXG59XHJcbiAgICAgICAgcHVibGljIHN0cmluZyBJbWFnZVxyXG57XHJcbiAgICBnZXRcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gX2ltYWdlO1xyXG4gICAgfVxyXG5cclxuICAgIFxyXG4gICAgc2V0XHJcbiAgICB7XHJcbiAgICAgICAgU2V0UHJvcGVydHk8c3RyaW5nPihyZWYgX2ltYWdlLCB2YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBcclxufVxyXG4gICAgICAgIHB1YmxpYyBzdHJpbmcgUGx1cmFsTmFtZVxyXG57XHJcbiAgICBnZXRcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gX3BsdXJhbE5hbWU7XHJcbiAgICB9XHJcblxyXG4gICAgXHJcbiAgICBzZXRcclxuICAgIHtcclxuICAgICAgICBTZXRQcm9wZXJ0eTxzdHJpbmc+KHJlZiBfcGx1cmFsTmFtZSwgdmFsdWUpO1xyXG4gICAgfVxyXG4gICAgXHJcbn1cclxuICAgICAgICBwdWJsaWMgT2JqZWN0TWVhc3VyZW1lbnQoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgT2JqZWN0TWVhc3VyZW1lbnRzID0gbmV3IExpc3Q8T2JqZWN0TWVhc3VyZW1lbnQ+KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBPYmplY3RNZWFzdXJlbWVudChzdHJpbmcgc2luZ2xlTmFtZSwgc3RyaW5nIHBsdXJhbE5hbWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBTaW5nbGVOYW1lID0gc2luZ2xlTmFtZTtcclxuICAgICAgICAgICAgUGx1cmFsTmFtZSA9IHBsdXJhbE5hbWU7XHJcbiAgICAgICAgICAgIE9iamVjdE1lYXN1cmVtZW50cyA9IG5ldyBMaXN0PE9iamVjdE1lYXN1cmVtZW50PigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9wdWJsaWMgSUVudW1lcmFibGU8T2JqZWN0TWVhc3VyZW1lbnQ+IEdldENoaWxkcmVuKClcclxuICAgICAgICAvL3tcclxuICAgICAgICAvLyAgICByZXR1cm4gT2JqZWN0TWVhc3VyZW1lbnRzO1xyXG4gICAgICAgIC8vfVxyXG4gICAgICAgIHB1YmxpYyB2b2lkIEFkZChPYmplY3RNZWFzdXJlbWVudCBvYmopXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBvYmouTWVhc3VyZW1lbnQgPSB0aGlzO1xyXG4gICAgICAgICAgICBPYmplY3RNZWFzdXJlbWVudHMuQWRkKG9iaik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdmlydHVhbCBMaXN0PE9iamVjdE1lYXN1cmVtZW50PiBPYmplY3RNZWFzdXJlbWVudHNcclxue1xyXG4gICAgZ2V0XHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIF9vYmplY3RNZWFzdXJlbWVudHM7XHJcbiAgICB9XHJcblxyXG4gICAgXHJcbiAgICBzZXRcclxuICAgIHtcclxuICAgICAgICBTZXRQcm9wZXJ0eTxMaXN0PE9iamVjdE1lYXN1cmVtZW50Pj4ocmVmIF9vYmplY3RNZWFzdXJlbWVudHMsIHZhbHVlKTtcclxuICAgIH1cclxuICAgIFxyXG59XHJcbiAgICAgICAgcHVibGljIHN0cmluZyBTaW5nbGVOYW1lXHJcbntcclxuICAgIGdldFxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBfc2luZ2xlTmFtZTtcclxuICAgIH1cclxuXHJcbiAgICBcclxuICAgIHNldFxyXG4gICAge1xyXG4gICAgICAgIFNldFByb3BlcnR5PHN0cmluZz4ocmVmIF9zaW5nbGVOYW1lLCB2YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBcclxufVxyXG4gICAgICAgIHB1YmxpYyBPYmplY3RQYWNrIE9iamVjdFBhY2tcclxue1xyXG4gICAgZ2V0XHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIF9vYmplY3RQYWNrO1xyXG4gICAgfVxyXG5cclxuICAgIFxyXG4gICAgc2V0XHJcbiAgICB7XHJcbiAgICAgICAgU2V0UHJvcGVydHk8T2JqZWN0UGFjaz4ocmVmIF9vYmplY3RQYWNrLCB2YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBcclxufVxyXG4gICAgICAgIHB1YmxpYyBzdHJpbmcgT2JqZWN0UGFja05hbWVcclxue1xyXG4gICAgZ2V0XHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIF9vYmplY3RQYWNrTmFtZTtcclxuICAgIH1cclxuXHJcbiAgICBcclxuICAgIHNldFxyXG4gICAge1xyXG4gICAgICAgIFNldFByb3BlcnR5PHN0cmluZz4ocmVmIF9vYmplY3RQYWNrTmFtZSwgdmFsdWUpO1xyXG4gICAgfVxyXG4gICAgXHJcbn0gICAgfVxyXG59IiwidXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5PYmplY3RNb2RlbDtcclxuXHJcbm5hbWVzcGFjZSBIb3dGYXIuQ29yZS5Nb2RlbHNcclxue1xyXG4gICAgcHVibGljIGNsYXNzIE9iamVjdFBhY2sgOiBCaW5kYWJsZUJhc2VcclxuICAgIHtcclxuICAgICAgICBwcml2YXRlIHN0cmluZyBfcGFja05hbWU7XHJcbiAgICAgICAgcHJpdmF0ZSBzdHJpbmcgX2Rlc2NyaXB0aW9uO1xyXG4gICAgICAgIHByaXZhdGUgc3RyaW5nIF9wYWNrSW1hZ2U7XHJcblxyXG4jaWYgQlJJREdFXHJcbiAgICAgICAgcHVibGljIHZpcnR1YWwgTGlzdDxPYmplY3RNZWFzdXJlbWVudD4gT2JqZWN0TWVhc3VyZW1lbnRzIHsgZ2V0OyBzZXQ7IH1cclxuI2Vsc2VcclxuICAgICAgICBwdWJsaWMgdmlydHVhbCBPYnNlcnZhYmxlQ29sbGVjdGlvbjxPYmplY3RNZWFzdXJlbWVudD4gT2JqZWN0TWVhc3VyZW1lbnRzIHsgZ2V0OyBzZXQ7IH0gPSBuZXcgT2JzZXJ2YWJsZUNvbGxlY3Rpb248T2JqZWN0TWVhc3VyZW1lbnQ+KCk7XHJcblxyXG4jZW5kaWZcclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgc3RyaW5nIFRvU3RyaW5nKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBQYWNrTmFtZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdHJpbmcgUGFja05hbWVcclxue1xyXG4gICAgZ2V0XHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIF9wYWNrTmFtZTtcclxuICAgIH1cclxuXHJcbiAgICBcclxuICAgIHNldFxyXG4gICAge1xyXG4gICAgICAgIFNldFByb3BlcnR5PHN0cmluZz4ocmVmIF9wYWNrTmFtZSwgdmFsdWUpO1xyXG4gICAgfVxyXG4gICAgXHJcbn1wdWJsaWMgc3RyaW5nIE5hbWVcclxue1xyXG4gICAgZ2V0XHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIFBhY2tOYW1lO1xyXG4gICAgfVxyXG59cHVibGljIHN0cmluZyBJbWFnZVVSTFxyXG57XHJcbiAgICBnZXRcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gUGFja0ltYWdlO1xyXG4gICAgfVxyXG59XHJcbiAgICAgICAgcHVibGljIHN0cmluZyBEZXNjcmlwdGlvblxyXG57XHJcbiAgICBnZXRcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gX2Rlc2NyaXB0aW9uO1xyXG4gICAgfVxyXG5cclxuICAgIFxyXG4gICAgc2V0XHJcbiAgICB7XHJcbiAgICAgICAgU2V0UHJvcGVydHk8c3RyaW5nPihyZWYgX2Rlc2NyaXB0aW9uLCB2YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBcclxufVxyXG4gICAgICAgIHB1YmxpYyBzdHJpbmcgUGFja0ltYWdlXHJcbntcclxuICAgIGdldFxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBfcGFja0ltYWdlO1xyXG4gICAgfVxyXG5cclxuICAgIFxyXG4gICAgc2V0XHJcbiAgICB7XHJcbiAgICAgICAgU2V0UHJvcGVydHk8c3RyaW5nPihyZWYgX3BhY2tJbWFnZSwgdmFsdWUpO1xyXG4gICAgfVxyXG4gICAgXHJcbn1cclxuICAgICAgICBwdWJsaWMgT2JqZWN0UGFjaygpXHJcbiAgICAgICAge1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIE9iamVjdFBhY2soc3RyaW5nIG5hbWUsc3RyaW5nIGRlc2NyaXB0aW9uKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgUGFja05hbWUgPSBuYW1lO1xyXG4gICAgICAgICAgICBEZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xyXG4gICAgICAgICAgICBQYWNrSW1hZ2UgPSBcImh0dHBzOi8vdmlhLnBsYWNlaG9sZGVyLmNvbS8xNTBcIjtcclxuICAgICAgICB9XHJcblxuICAgIFxucHJpdmF0ZSBMaXN0PE9iamVjdE1lYXN1cmVtZW50PiBfX1Byb3BlcnR5X19Jbml0aWFsaXplcl9fT2JqZWN0TWVhc3VyZW1lbnRzPW5ldyBMaXN0PE9iamVjdE1lYXN1cmVtZW50PigpO31cclxufSIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG5cclxubmFtZXNwYWNlIEhvd0Zhci5Db3JlLk1vZGVsc1xyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgT2JqZWN0UmVwb3NpdG9yeUNhY2hlIDogSU9iamVjdFJlcG9zaXRvcnlcclxuICAgIHtcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IElBcHAgX2FwcDtcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IExpc3Q8T2JqZWN0TWVhc3VyZW1lbnQ+IG1lYXN1cmVtZW50cztcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IExpc3Q8T2JqZWN0UGFjaz4gcGFja3M7XHJcblxyXG4gICAgICAgIFQgR2V0S2V5PFQ+KHN0cmluZyBrZXkpXHJcbiAgICAgICAge1xyXG5UIGRhdGE7ICAgICAgICAgICAgaWYgKF9hcHAuUHJvcGVydGllcy5Db250YWluc0tleShrZXkpICYmIChkYXRhID0gX2FwcC5Qcm9wZXJ0aWVzW2tleV0gYXMgVCkgIT0gbnVsbClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGRlZmF1bHQoVCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgT2JqZWN0UmVwb3NpdG9yeUNhY2hlKElBcHAgYXBwKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgX2FwcCA9IGFwcDtcclxuICAgICAgICAgICAgbWVhc3VyZW1lbnRzID0gR2V0S2V5PExpc3Q8T2JqZWN0TWVhc3VyZW1lbnQ+PihPYmplY3RLZXkpID8/IG5ldyBMaXN0PE9iamVjdE1lYXN1cmVtZW50PigpO1xyXG4gICAgICAgICAgICBwYWNrcyA9IEdldEtleTxMaXN0PE9iamVjdFBhY2s+PihQYWNrS2V5KSA/PyBuZXcgTGlzdDxPYmplY3RQYWNrPigpO1xyXG4gICAgICAgICAgICBPYmplY3RSZXBvc2l0b3J5U2VlZGVyLlN0YXJ0dXAodGhpcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyB2b2lkIERpc3Bvc2UoKVxyXG4gICAgICAgIHtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZvaWQgSW5zZXJ0S2V5KHN0cmluZyBrZXksIG9iamVjdCBkYXRhKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKF9hcHAuUHJvcGVydGllcy5Db250YWluc0tleShrZXkpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBfYXBwLlByb3BlcnRpZXNba2V5XSA9IGRhdGE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBfYXBwLlByb3BlcnRpZXMuQWRkKGtleSxkYXRhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBhc3luYyB2b2lkIFNhdmVDaGFuZ2VzKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEluc2VydEtleShPYmplY3RLZXksIG1lYXN1cmVtZW50cyk7XHJcbiAgICAgICAgICAgIEluc2VydEtleShQYWNrS2V5LCBwYWNrcyk7XHJcbiAgICAgICAgICAgIGF3YWl0IF9hcHAuU2F2ZVByb3BlcnRpZXNBc3luYygpO1xyXG4gICAgICAgIH1cclxuICAgICAgIFxyXG4gICAgICAgIHB1YmxpYyBPYmplY3RNZWFzdXJlbWVudCBHZXRPYmplY3RNZWFzdXJlbWVudChzdHJpbmcgbmFtZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBkYXRhID0gR2V0T2JqZWN0TWVhc3VyZW1lbnRzKCk7XHJcbiAgICAgICAgICAgIHJldHVybiBTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLkZpcnN0T3JEZWZhdWx0PE9iamVjdE1lYXN1cmVtZW50PihkYXRhLChGdW5jPE9iamVjdE1lYXN1cmVtZW50LGJvb2w+KShwID0+IHAuU2luZ2xlTmFtZS5Ub0xvd2VyKCkgPT0gbmFtZS5Ub0xvd2VyKCkgfHwgcC5QbHVyYWxOYW1lLlRvTG93ZXIoKSA9PSBuYW1lLlRvTG93ZXIoKSkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGNvbnN0IHN0cmluZyBPYmplY3RLZXkgPSBcIk9iamVjdE1lYXN1cmVtZW50c1wiO1xyXG4gICAgICAgIHB1YmxpYyBjb25zdCBzdHJpbmcgUGFja0tleSA9IFwiT2JqZWN0UGFja3NcIjtcclxuICAgICAgICBwdWJsaWMgSUVudW1lcmFibGU8T2JqZWN0TWVhc3VyZW1lbnQ+IEdldE9iamVjdE1lYXN1cmVtZW50cygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0UmVwb3NpdG9yeVNlZWRlci5TZXR1cFRyZWUobWVhc3VyZW1lbnRzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIHZvaWQgQWRkT2JqZWN0KE9iamVjdE1lYXN1cmVtZW50IG1lYXN1cmVtZW50KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKG1lYXN1cmVtZW50Lk9iamVjdFBhY2tOYW1lPT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBJbnZhbGlkT3BlcmF0aW9uRXhjZXB0aW9uKFwibXVzdCBoYXZlIGEgcGFjayBuYW1lXCIpO1xyXG5cclxuICAgICAgICAgICAgaWYgKG1lYXN1cmVtZW50LlBhcmVudE1lYXN1cmVtZW50U2luZ2xlTmFtZSA9PSBudWxsICYmIG1lYXN1cmVtZW50Lk1lYXN1cmVtZW50ICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICBtZWFzdXJlbWVudC5QYXJlbnRNZWFzdXJlbWVudFNpbmdsZU5hbWUgPSBtZWFzdXJlbWVudC5NZWFzdXJlbWVudC5TaW5nbGVOYW1lO1xyXG4gICAgICAgICAgICBlbHNlIGlmIChtZWFzdXJlbWVudC5QYXJlbnRNZWFzdXJlbWVudFNpbmdsZU5hbWUgIT0gbnVsbCAmJiBtZWFzdXJlbWVudC5NZWFzdXJlbWVudCA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgbWVhc3VyZW1lbnQuTWVhc3VyZW1lbnQgPVxyXG5TeXN0ZW0uTGlucS5FbnVtZXJhYmxlLkZpcnN0T3JEZWZhdWx0PE9iamVjdE1lYXN1cmVtZW50PiggICAgICAgICAgICAgICAgICAgIG1lYXN1cmVtZW50cywoRnVuYzxPYmplY3RNZWFzdXJlbWVudCxib29sPikocCA9PiBwLlNpbmdsZU5hbWUgPT0gbWVhc3VyZW1lbnQuUGFyZW50TWVhc3VyZW1lbnRTaW5nbGVOYW1lKSk7XHJcbiAgICAgICAgICAgIGlmIChtZWFzdXJlbWVudC5PYmplY3RQYWNrTmFtZSA9PSBudWxsICYmIG1lYXN1cmVtZW50Lk9iamVjdFBhY2sgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgIG1lYXN1cmVtZW50Lk9iamVjdFBhY2tOYW1lID0gbWVhc3VyZW1lbnQuT2JqZWN0UGFjay5QYWNrTmFtZTtcclxuICAgICAgICAgICAgZWxzZSBpZiAobWVhc3VyZW1lbnQuT2JqZWN0UGFja05hbWUgIT0gbnVsbCAmJiBtZWFzdXJlbWVudC5PYmplY3RQYWNrID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICBtZWFzdXJlbWVudC5PYmplY3RQYWNrID0gU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5GaXJzdE9yRGVmYXVsdDxPYmplY3RQYWNrPihwYWNrcywoRnVuYzxPYmplY3RQYWNrLGJvb2w+KShwID0+IHAuUGFja05hbWUgPT0gbWVhc3VyZW1lbnQuT2JqZWN0UGFja05hbWUpKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBwYWNrID0gU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5GaXJzdDxPYmplY3RQYWNrPihwYWNrcywoRnVuYzxPYmplY3RQYWNrLGJvb2w+KShwID0+IHAuUGFja05hbWUgPT0gbWVhc3VyZW1lbnQuT2JqZWN0UGFja05hbWUpKTtcclxuICAgICAgICAgICAgaWYgKFN5c3RlbS5MaW5xLkVudW1lcmFibGUuQW55PE9iamVjdE1lYXN1cmVtZW50PihwYWNrLk9iamVjdE1lYXN1cmVtZW50cywoRnVuYzxPYmplY3RNZWFzdXJlbWVudCxib29sPikocCA9PiBwLlNpbmdsZU5hbWUgPT0gbWVhc3VyZW1lbnQuU2luZ2xlTmFtZSkpICE9IHRydWUpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHBhY2suT2JqZWN0TWVhc3VyZW1lbnRzLkFkZChtZWFzdXJlbWVudCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIG1lYXN1cmVtZW50cy5BZGQobWVhc3VyZW1lbnQpO1xyXG4gICAgICAgICAgICBTYXZlQ2hhbmdlcygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgUmVtb3ZlT2JqZWN0KE9iamVjdE1lYXN1cmVtZW50IG1lYXN1cmVtZW50KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbWVhc3VyZW1lbnRzLlJlbW92ZShtZWFzdXJlbWVudCk7XHJcbiAgICAgICAgICAgIFNhdmVDaGFuZ2VzKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgSUVudW1lcmFibGU8T2JqZWN0UGFjaz4gR2V0T2JqZWN0UGFja3MoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIHBhY2tzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgQWRkUGFjayhPYmplY3RQYWNrIHBhY2spXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBwYWNrcy5BZGQocGFjayk7XHJcbiAgICAgICAgICAgIFNhdmVDaGFuZ2VzKCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgUmVtb3ZlUGFjayhPYmplY3RQYWNrIHBhY2spXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBwYWNrcy5SZW1vdmUocGFjayk7XHJcbiAgICAgICAgICAgIFNhdmVDaGFuZ2VzKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBVcGRhdGVPYmplY3QoT2JqZWN0TWVhc3VyZW1lbnQgc2VsZWN0ZWRPYmplY3QpXHJcbiAgICAgICAge1xyXG5cclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBwdWJsaWMgT2JqZWN0TWVhc3VyZW1lbnQgTmV3T2JqZWN0KHN0cmluZyBwbHVyYWwsIHN0cmluZyBzaW5nbGUsIGRvdWJsZSB2YWx1ZSwgT2JqZWN0TWVhc3VyZW1lbnQgcGFyZW50LCBzdHJpbmcgcGFjaylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBPYmplY3RSZXBvc2l0b3J5U2VlZGVyLk5ld09iamVjdEFjdGlvbihwbHVyYWwsIHNpbmdsZSwgdmFsdWUsIHBhcmVudC5TaW5nbGVOYW1lLCBwYWNrLCB0aGlzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJ1c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxuXHJcbm5hbWVzcGFjZSBIb3dGYXIuQ29yZS5Nb2RlbHNcclxue1xyXG4gICAgaW50ZXJuYWwgY2xhc3MgTWVhc3VyZW1lbnRDb21wYXJlIDogSUNvbXBhcmVyPE9iamVjdE1lYXN1cmVtZW50PlxyXG4gICAge1xyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgSU1lYXN1cmVDb252ZXJ0ZXJzIF9jb252ZXJ0ZXJzO1xyXG5cclxuICAgICAgICBwdWJsaWMgTWVhc3VyZW1lbnRDb21wYXJlKElNZWFzdXJlQ29udmVydGVycyBjb252ZXJ0ZXJzKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgX2NvbnZlcnRlcnMgPSBjb252ZXJ0ZXJzO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgaW50IENvbXBhcmUoT2JqZWN0TWVhc3VyZW1lbnQgeCwgT2JqZWN0TWVhc3VyZW1lbnQgeSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciB4dG95ID0gX2NvbnZlcnRlcnMuQ29udmVydCh4LCB5KTtcclxuICAgICAgICAgICAgaWYgKHh0b3kgPiAxKSByZXR1cm4gMTtcclxuICAgICAgICAgICAgcmV0dXJuIC0xO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdCn0K

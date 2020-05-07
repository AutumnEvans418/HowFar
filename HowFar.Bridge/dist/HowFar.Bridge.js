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

            var from = document.getElementById("from");
            var to = document.getElementById("to");
            var num = document.getElementById("num");

            converter.ObjectMeasurements.ForEach(function (p) {
                var $t;
                from.appendChild(($t = document.createElement("option"), $t.text = p.PluralName, $t));
                to.appendChild(($t = document.createElement("option"), $t.text = p.PluralName, $t));
            });

            choose();





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

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICJIb3dGYXIuQnJpZGdlLmpzIiwKICAic291cmNlUm9vdCI6ICIiLAogICJzb3VyY2VzIjogWyJBcHAuY3MiLCIuLi9Ib3dGYXIuQ29yZS9CaW5kYWJsZUJhc2UuY3MiLCIuLi9Ib3dGYXIuQ29yZS9Nb2RlbHMvT2JqZWN0UmVwb3NpdG9yeVNlZWRlci5jcyIsIi4uL0hvd0Zhci5Db3JlL01vZGVscy9BcHBNb2RlbC5jcyIsIi4uL0hvd0Zhci5Db3JlL01vZGVscy9NZWFzdXJlQ29udmVydGVycy5jcyIsIi4uL0hvd0Zhci5Db3JlL01vZGVscy9PYmplY3RNZWFzdXJlbWVudC5jcyIsIi4uL0hvd0Zhci5Db3JlL01vZGVscy9PYmplY3RQYWNrLmNzIiwiLi4vSG93RmFyLkNvcmUvTW9kZWxzL09iamVjdFJlcG9zaXRvcnlDYWNoZS5jcyIsIi4uL0hvd0Zhci5Db3JlL01vZGVscy9NZWFzdXJlbWVudENvbXBhcmUuY3MiXSwKICAibmFtZXMiOiBbIiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7O1lBaUJZQSxnQkFBZ0JBLElBQUlBLHFDQUFrQkEsSUFBSUEseUNBQXNCQSxJQUFJQTs7WUFFcEVBLFdBQVdBO1lBQ1hBLFNBQVNBO1lBQ1RBLFVBQVVBOztZQUVWQSxxQ0FBcUNBLEFBQTRCQTs7Z0JBRXpEQSxpQkFBaUJBLGtEQUFnQ0E7Z0JBQ2pEQSxlQUFlQSxrREFBK0JBOzs7WUFHdERBOzs7Ozs7Ozs7Ozs7Ozs7OzttQ0NuQm9CQSxHQUFHQSxVQUFnQkEsT0FBU0EsUUFBc0JBOzs7Z0JBRXRFQSxJQUFJQSxxQkFBQ0EsY0FBVUEsT0FBS0EsMEJBQWdCQSxTQUFPQSxBQUFPQTtvQkFFOUNBLGFBQVdBO29CQUNYQSx1QkFBa0JBO29CQUNsQkEsNkJBQVFBLFFBQUtBLEFBQXFDQSxXQUFpQkE7Ozs7eUNBT2xDQTs7Z0JBRXJDQSwyQ0FBaUJBLFFBQUtBLEFBQXFDQSxxQkFBdUJBLE1BQU1BLElBQUlBLCtDQUF5QkEsaUJBQWdCQTs7Ozs7Ozs7Ozs7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QkEsSUFBSUEsOEJBQThCQSxRQUFRQSwwQkFBMEJBO3dCQUNyRUEseUJBQXlCQSw0QkFBa0RBLFlBQVpBLDhDQUFrQkEsQUFBd0JBO3VDQUFLQSxtQ0FBY0E7Ozs7O2dCQUVoSUEsV0FBV0EsNEJBQXlDQSxZQUFaQSxxQ0FBa0JBLEFBQXdCQTsrQkFBS0EsbUNBQWNBOztnQkFDckdBLElBQUlBLDRCQUE4Q0EseUJBQW5CQSwwQ0FBMkNBLEFBQStCQTsrQkFBS0EscUNBQWdCQTs7b0JBRTFIQSw0QkFBNEJBOzs7Z0JBR2hDQSxzQkFBaUJBO2dCQUNqQkE7O29DQUdxQkE7Z0JBRXJCQSx5QkFBb0JBO2dCQUNwQkE7OztnQkFLQUEsT0FBT0E7OytCQUdTQTtnQkFFaEJBLGVBQVVBO2dCQUNWQTs7O2tDQUltQkE7Z0JBRW5CQSxrQkFBYUE7Z0JBQ2JBOztvQ0FHcUJBOzs7aUNBTVVBLFFBQWVBLFFBQWVBLE9BQWNBLFFBQTBCQTtnQkFFckdBLE9BQU9BLDBEQUF1Q0EsUUFBUUEsUUFBUUEsT0FBT0EsbUJBQW1CQSxNQUFNQTs7Ozs7Ozs7Ozs7OzRCQy9HeEVBOztnQkFFdEJBLG1CQUFjQTs7OzsrQkFFQ0EsR0FBcUJBO2dCQUVwQ0EsV0FBV0EsK0RBQW9CQSxHQUFHQTtnQkFDbENBLElBQUlBO29CQUFVQTs7Z0JBQ2RBLE9BQU9BIiwKICAic291cmNlc0NvbnRlbnQiOiBbInVzaW5nIEJyaWRnZTtcclxudXNpbmcgTmV3dG9uc29mdC5Kc29uO1xyXG51c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uVGhyZWFkaW5nLlRhc2tzO1xyXG51c2luZyBCcmlkZ2UuSHRtbDU7XHJcbnVzaW5nIEhvd0Zhci5Db3JlLk1vZGVscztcclxuXHJcbm5hbWVzcGFjZSBIb3dGYXIuQnJpZGdlXHJcbntcclxuICAgIFxyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBBcHAgXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIE1haW4oKVxyXG4gICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgIHZhciBjb252ZXJ0ZXIgPSBuZXcgTWVhc3VyZUNvbnZlcnRlcnMobmV3IE9iamVjdFJlcG9zaXRvcnlDYWNoZShuZXcgQXBwTW9kZWwoKSkpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGZyb20gPSBEb2N1bWVudC5HZXRFbGVtZW50QnlJZDxIVE1MU2VsZWN0RWxlbWVudD4oXCJmcm9tXCIpO1xyXG4gICAgICAgICAgICB2YXIgdG8gPSBEb2N1bWVudC5HZXRFbGVtZW50QnlJZDxIVE1MU2VsZWN0RWxlbWVudD4oXCJ0b1wiKTtcclxuICAgICAgICAgICAgdmFyIG51bSA9IERvY3VtZW50LkdldEVsZW1lbnRCeUlkPEhUTUxJbnB1dEVsZW1lbnQ+KFwibnVtXCIpO1xyXG5cclxuICAgICAgICAgICAgY29udmVydGVyLk9iamVjdE1lYXN1cmVtZW50cy5Gb3JFYWNoKChBY3Rpb248T2JqZWN0TWVhc3VyZW1lbnQ+KShwID0+XHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgZnJvbS5BcHBlbmRDaGlsZChuZXcgSFRNTE9wdGlvbkVsZW1lbnQoKSB7VGV4dCA9IHAuUGx1cmFsTmFtZX0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHRvLkFwcGVuZENoaWxkKG5ldyBIVE1MT3B0aW9uRWxlbWVudCgpe1RleHQgPSBwLlBsdXJhbE5hbWV9KTtcclxuICAgICAgICAgICAgICAgIH0pKTtcclxuXHJcbiAgICAgICAgICAgIFNjcmlwdC5DYWxsKFwiY2hvb3NlXCIpO1xyXG5cclxuICAgICAgICAgICAgLy8gV3JpdGUgYSBtZXNzYWdlIHRvIHRoZSBDb25zb2xlXHJcbiAgICAgICAgICAgIC8vQ29uc29sZS5Xcml0ZUxpbmUoXCJXZWxjb21lIHRvIEJyaWRnZS5ORVRcIik7XHJcblxyXG4gICAgICAgICAgICAvLyBBZnRlciBidWlsZGluZyAoQ3RybCArIFNoaWZ0ICsgQikgdGhpcyBwcm9qZWN0LCBcclxuICAgICAgICAgICAgLy8gYnJvd3NlIHRvIHRoZSAvYmluL0RlYnVnIG9yIC9iaW4vUmVsZWFzZSBmb2xkZXIuXHJcblxyXG4gICAgICAgICAgICAvLyBBIG5ldyBicmlkZ2UvIGZvbGRlciBoYXMgYmVlbiBjcmVhdGVkIGFuZFxyXG4gICAgICAgICAgICAvLyBjb250YWlucyB5b3VyIHByb2plY3RzIEphdmFTY3JpcHQgZmlsZXMuIFxyXG5cclxuICAgICAgICAgICAgLy8gT3BlbiB0aGUgYnJpZGdlL2luZGV4Lmh0bWwgZmlsZSBpbiBhIGJyb3dzZXIgYnlcclxuICAgICAgICAgICAgLy8gUmlnaHQtQ2xpY2sgPiBPcGVuIFdpdGguLi4sIHRoZW4gY2hvb3NlIGFcclxuICAgICAgICAgICAgLy8gd2ViIGJyb3dzZXIgZnJvbSB0aGUgbGlzdFxyXG5cclxuICAgICAgICAgICAgLy8gVGhpcyBhcHBsaWNhdGlvbiB3aWxsIHRoZW4gcnVuIGluIHRoZSBicm93c2VyLlxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgIFxyXG4gICAgfVxyXG59IiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29tcG9uZW50TW9kZWw7XHJcbnVzaW5nIFN5c3RlbS5SdW50aW1lLkNvbXBpbGVyU2VydmljZXM7XHJcblxyXG5uYW1lc3BhY2UgSG93RmFyLkNvcmVcclxue1xyXG4gICAgcHVibGljIGNsYXNzIEJpbmRhYmxlQmFzZSA6IElOb3RpZnlQcm9wZXJ0eUNoYW5nZWRcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgZXZlbnQgUHJvcGVydHlDaGFuZ2VkRXZlbnRIYW5kbGVyIFByb3BlcnR5Q2hhbmdlZDtcclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgU2V0UHJvcGVydHk8VD4ocmVmIFQgcHJvcGVydHksIFQgdmFsdWUsIEFjdGlvbiBhY3Rpb24gPSBudWxsLCBbQ2FsbGVyTWVtYmVyTmFtZV0gc3RyaW5nIG5hbWUgPSBudWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKChwcm9wZXJ0eSE9bnVsbD9wcm9wZXJ0eS5FcXVhbHModmFsdWUpOihib29sPyludWxsKSAhPSB0cnVlKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBwcm9wZXJ0eSA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgT25Qcm9wZXJ0eUNoYW5nZWQobmFtZSk7XHJcbiAgICAgICAgICAgICAgICBhY3Rpb24hPW51bGw/Z2xvYmFsOjpCcmlkZ2UuU2NyaXB0LkZyb21MYW1iZGEoKCk9PmFjdGlvbi5JbnZva2UoKSk6bnVsbDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcbiNpZiAhQlJJREdFXHJcbiAgICAgICAgW0hvd0Zhci5Db3JlLkFubm90YXRpb25zLk5vdGlmeVByb3BlcnR5Q2hhbmdlZEludm9jYXRvcl1cclxuI2VuZGlmXHJcbiAgICAgICAgcHJvdGVjdGVkIHZpcnR1YWwgdm9pZCBPblByb3BlcnR5Q2hhbmdlZChbQ2FsbGVyTWVtYmVyTmFtZV0gc3RyaW5nIHByb3BlcnR5TmFtZSA9IG51bGwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBQcm9wZXJ0eUNoYW5nZWQhPW51bGw/Z2xvYmFsOjpCcmlkZ2UuU2NyaXB0LkZyb21MYW1iZGEoKCk9PlByb3BlcnR5Q2hhbmdlZC5JbnZva2UodGhpcywgbmV3IFByb3BlcnR5Q2hhbmdlZEV2ZW50QXJncyhwcm9wZXJ0eU5hbWUpKSk6bnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJ1c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLk9iamVjdE1vZGVsO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxuXHJcbm5hbWVzcGFjZSBIb3dGYXIuQ29yZS5Nb2RlbHNcclxue1xyXG4gICAgcHVibGljIHN0YXRpYyBjbGFzcyBPYmplY3RSZXBvc2l0b3J5U2VlZGVyXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIGNvbnN0IHN0cmluZyBNZXRyaWMgPSBcIk1ldHJpY1wiO1xyXG4gICAgICAgIHB1YmxpYyBjb25zdCBzdHJpbmcgSW1wZXJpYWwgPSBcIkltcGVyaWFsXCI7XHJcbiAgICAgICAgcHVibGljIGNvbnN0IHN0cmluZyBTcGFjZSA9IFwiU3BhY2VcIjtcclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIFN0YXJ0dXAoSU9iamVjdFJlcG9zaXRvcnkgcmVwb3NpdG9yeSlcclxuICAgICAgICB7XHJcbiNpZiBCUklER0VcclxuICAgICAgICAgICAgdmFyIG9iamVjdFBhY2tzID0gbmV3IExpc3Q8T2JqZWN0UGFjaz4oKTtcclxuI2Vsc2VcclxuICAgICAgICAgICAgICAgIHZhciBvYmplY3RQYWNrcyA9IG5ldyBPYnNlcnZhYmxlQ29sbGVjdGlvbjxPYmplY3RQYWNrPigpO1xyXG4jZW5kaWZcclxuICAgICAgICAgICAgdmFyIGNlbnRpbWV0ZXIgPSBuZXcgT2JqZWN0TWVhc3VyZW1lbnQoXCJDZW50aW1ldGVyXCIsIFwiQ2VudGltZXRlcnNcIikgeyBWYWx1ZSA9IDEgfTtcclxuICAgICAgICAgICAgY2VudGltZXRlci5PYmplY3RQYWNrTmFtZSA9IE1ldHJpYztcclxuICAgICAgICAgICAgb2JqZWN0UGFja3MuQWRkKG5ldyBPYmplY3RQYWNrKFwiQ3VzdG9tXCIsIFwiT2JqZWN0cyB0aGF0IGFyZSBtYWRlIGluIHRoZSBhcHAgYXJlIHBsYWNlZCBoZXJlLlwiKSB7IFBhY2tJbWFnZSA9IFwiQXNzZXRzL2Jsb2NrLnBuZ1wiIH0pO1xyXG4gICAgICAgICAgICBvYmplY3RQYWNrcy5BZGQobmV3IE9iamVjdFBhY2soSW1wZXJpYWwsIFwiQSBkZWZhdWx0IHBhY2thZ2UgZm9yIHRoZSBVUyBtZWFzdXJlbWVudCBzeXN0ZW1cIikgeyBQYWNrSW1hZ2UgPSBcImh0dHBzOi8vbG9nb2Vwcy5jb20vd3AtY29udGVudC91cGxvYWRzLzIwMTMvMDYvZmxhZy1vZi11c2EtdmVjdG9yLWxvZ28ucG5nXCIgfSk7XHJcbiAgICAgICAgICAgIG9iamVjdFBhY2tzLkFkZChuZXcgT2JqZWN0UGFjayhNZXRyaWMsIFwiVGhlIG1ldHJpYyBzeXN0ZW0uICBVc2VkIGJ5IGV2ZXJ5b25lIGV4Y2VwdCB0aGUgVVNcIikgeyBQYWNrSW1hZ2UgPSBcImh0dHA6Ly93d3cua25pZ2h0c3RlbXBsYXJvcmRlci5vcmcvd3AtY29udGVudC91cGxvYWRzLzIwMTYvMDYvVU4tU0VBTC1TdHlsaXplZC01MDAtQnJvd24ucG5nXCIgfSk7XHJcbiAgICAgICAgICAgIG9iamVjdFBhY2tzLkFkZChuZXcgT2JqZWN0UGFjayhTcGFjZSwgXCJPYmplY3RzIGFuZCBNZWFzdXJlbWVudHMgaW4gc3BhY2VcIikgeyBQYWNrSW1hZ2UgPSBcImh0dHBzOi8vc2VwLnlpbWcuY29tL2F5L3NreWltYWdlL25hc2Etc3BhY2UtbWlzc2lvbnMtOS5qcGdcIiB9KTtcclxuICAgICAgICAgICAgdmFyIHBhY2tzID0gU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5Ub0xpc3Q8T2JqZWN0UGFjaz4ocmVwb3NpdG9yeS5HZXRPYmplY3RQYWNrcygpKTtcclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIG9iamVjdFBhY2sgaW4gb2JqZWN0UGFja3MpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmICghU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5TZWxlY3Q8T2JqZWN0UGFjayxzdHJpbmc+KHBhY2tzLChTeXN0ZW0uRnVuYzxPYmplY3RQYWNrLHN0cmluZz4pKHAgPT4gcC5QYWNrTmFtZSkpLkNvbnRhaW5zKG9iamVjdFBhY2suUGFja05hbWUpKVxyXG4gICAgICAgICAgICAgICAgICAgIHJlcG9zaXRvcnkuQWRkUGFjayhvYmplY3RQYWNrKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy9kYi5TYXZlQ2hhbmdlcygpO1xyXG4gICAgICAgICAgICBpZiAoU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5BbGw8T2JqZWN0TWVhc3VyZW1lbnQ+KHJlcG9zaXRvcnkuR2V0T2JqZWN0TWVhc3VyZW1lbnRzKCksKFN5c3RlbS5GdW5jPE9iamVjdE1lYXN1cmVtZW50LGJvb2w+KShwID0+IHAuU2luZ2xlTmFtZSAhPSBjZW50aW1ldGVyLlNpbmdsZU5hbWUpKSlcclxuICAgICAgICAgICAgICAgIHJlcG9zaXRvcnkuQWRkT2JqZWN0KGNlbnRpbWV0ZXIpO1xyXG4gICAgICAgICAgICAvL3JlcG9zaXRvcnkuVXBkYXRlUGFjayhJbXBlcmlhbCwgY2VudGltZXRlcik7XHJcbiAgICAgICAgICAgIHZhciBpbmNoZXMgPSByZXBvc2l0b3J5Lk5ld09iamVjdChcIkluY2hlc1wiLCBcIkluY2hcIiwgMi41NCwgY2VudGltZXRlciwgSW1wZXJpYWwpO1xyXG4gICAgICAgICAgICB2YXIgZmVldCA9IHJlcG9zaXRvcnkuTmV3T2JqZWN0KFwiRmVldFwiLCBcIkZvb3RcIiwgMTIsIGluY2hlcywgSW1wZXJpYWwpO1xyXG4gICAgICAgICAgICB2YXIgbWlsZSA9IHJlcG9zaXRvcnkuTmV3T2JqZWN0KFwiTWlsZXNcIiwgXCJNaWxlXCIsIDUyODAsIGZlZXQsIEltcGVyaWFsKTtcclxuICAgICAgICAgICAgdmFyIG1ldGVyID0gcmVwb3NpdG9yeS5OZXdPYmplY3QoXCJNZXRlcnNcIiwgXCJNZXRlclwiLCAxMDAsIGNlbnRpbWV0ZXIsIE1ldHJpYyk7XHJcbiAgICAgICAgICAgIHZhciBraWxvTWV0ZXIgPSByZXBvc2l0b3J5Lk5ld09iamVjdChcIktpbG9tZXRlcnNcIiwgXCJLaWxvbWV0ZXJcIiwgMTAwMCwgbWV0ZXIsIE1ldHJpYyk7XHJcblxyXG4gICAgICAgICAgICB2YXIgbmFub01ldGVyID0gcmVwb3NpdG9yeS5OZXdPYmplY3QoXCJOYW5vbWV0ZXJzXCIsIFwiTmFub21ldGVyXCIsIDAuMDAwMDAwMSwgY2VudGltZXRlciwgTWV0cmljKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBlYXJ0aCA9IHJlcG9zaXRvcnkuTmV3T2JqZWN0KFwiRWFydGhzXCIsIFwiRWFydGhcIiwgMjUwMDAsIG1pbGUsIFNwYWNlKTtcclxuICAgICAgICAgICAgdmFyIHN1biA9IHJlcG9zaXRvcnkuTmV3T2JqZWN0KFwiU3Vuc1wiLCBcIlN1blwiLCAxMDMsIGVhcnRoLCBTcGFjZSk7XHJcbiAgICAgICAgICAgIHZhciBkaXN0ID0gcmVwb3NpdG9yeS5OZXdPYmplY3QoXCJEaXN0YW5jZSBmcm9tIEVhcnRoIHRvIFN1blwiLCBcIkRpc3RhbmNlIGZyb20gRWFydGggdG8gU3VuXCIsIDkyOTU1ODA3LCBtaWxlLCBTcGFjZSk7XHJcbiAgICAgICAgICAgIHZhciBsaWdodHllYXIgPSByZXBvc2l0b3J5Lk5ld09iamVjdChcIkxpZ2h0eWVhcnNcIiwgXCJMaWdodHllYXJcIiwgNTg3ODYyNTAwMDAwMCwgbWlsZSwgU3BhY2UpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGFscGhhID0gcmVwb3NpdG9yeS5OZXdPYmplY3QoXCJEaXN0YW5jZSBmcm9tIEVhcnRoIHRvIEFscGhhIENlbnRhdXJpXCIsIFwiRGlzdGFuY2UgZnJvbSBFYXJ0aCB0byBBbHBoYSBDZW50YXVyaVwiLCA0LjQsIGxpZ2h0eWVhciwgU3BhY2UpO1xyXG4gICAgICAgICAgICB2YXIgcGljbyA9IHJlcG9zaXRvcnkuTmV3T2JqZWN0KFwiUGljb21ldGVyc1wiLCBcIlBpY29tZXRlclwiLCAwLjAwMSwgbmFub01ldGVyLCBNZXRyaWMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBPYmplY3RNZWFzdXJlbWVudCBOZXdPYmplY3RBY3Rpb24oc3RyaW5nIHBsdXJhbE5hbWUsIHN0cmluZyBzaW5nbGVOYW1lLCBkb3VibGUgdmFsdWUsIHN0cmluZyBtZWFzdXJlbWVudFN0ciwgc3RyaW5nIHBhY2ssIElPYmplY3RSZXBvc2l0b3J5IHJlcG9zaXRvcnkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAobWVhc3VyZW1lbnRTdHIgIT0gbnVsbCAmJiBTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLkFsbDxPYmplY3RNZWFzdXJlbWVudD4ocmVwb3NpdG9yeS5HZXRPYmplY3RNZWFzdXJlbWVudHMoKSwoU3lzdGVtLkZ1bmM8T2JqZWN0TWVhc3VyZW1lbnQsYm9vbD4pKHAgPT4gcC5TaW5nbGVOYW1lICE9IHNpbmdsZU5hbWUpKSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyIG1lYXN1cmUgPSByZXBvc2l0b3J5LkdldE9iamVjdE1lYXN1cmVtZW50KG1lYXN1cmVtZW50U3RyKTtcclxuICAgICAgICAgICAgICAgIGlmIChtZWFzdXJlICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG5ld09iamVjdCA9IG5ldyBPYmplY3RNZWFzdXJlbWVudChzaW5nbGVOYW1lLCBwbHVyYWxOYW1lKSB7IFZhbHVlID0gdmFsdWUsIE9iamVjdFBhY2tOYW1lID0gcGFjayB9O1xyXG4gICAgICAgICAgICAgICAgICAgIG1lYXN1cmUuQWRkKG5ld09iamVjdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVwb3NpdG9yeS5BZGRPYmplY3QobmV3T2JqZWN0KTtcclxuICAgICAgICAgICAgICAgICAgICAvL3JlcG9zaXRvcnkuVXBkYXRlUGFjayhwYWNrLCBuZXdPYmplY3QpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXdPYmplY3Q7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBJTGlzdDxPYmplY3RNZWFzdXJlbWVudD4gU2V0dXBUcmVlKElMaXN0PE9iamVjdE1lYXN1cmVtZW50PiBkYXRhKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIG9iamVjdE1lYXN1cmVtZW50IGluIGRhdGEpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChvYmplY3RNZWFzdXJlbWVudC5QYXJlbnRNZWFzdXJlbWVudFNpbmdsZU5hbWUgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBvYmplY3RNZWFzdXJlbWVudC5NZWFzdXJlbWVudCA9XHJcblN5c3RlbS5MaW5xLkVudW1lcmFibGUuRmlyc3Q8T2JqZWN0TWVhc3VyZW1lbnQ+KCAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEsKFN5c3RlbS5GdW5jPE9iamVjdE1lYXN1cmVtZW50LGJvb2w+KShwID0+IHAuU2luZ2xlTmFtZSA9PSBvYmplY3RNZWFzdXJlbWVudC5QYXJlbnRNZWFzdXJlbWVudFNpbmdsZU5hbWUpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgdCA9IFN5c3RlbS5MaW5xLkVudW1lcmFibGUuV2hlcmU8T2JqZWN0TWVhc3VyZW1lbnQ+KGRhdGEsKFN5c3RlbS5GdW5jPE9iamVjdE1lYXN1cmVtZW50LGJvb2w+KShwID0+IHAuUGFyZW50TWVhc3VyZW1lbnRTaW5nbGVOYW1lID09IG9iamVjdE1lYXN1cmVtZW50LlNpbmdsZU5hbWUpKTtcclxuICAgICAgICAgICAgICAgIG9iamVjdE1lYXN1cmVtZW50Lk9iamVjdE1lYXN1cmVtZW50cyA9IHQuVG9MaXN0KCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBkYXRhO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsInVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uVGhyZWFkaW5nLlRhc2tzO1xyXG5cclxubmFtZXNwYWNlIEhvd0Zhci5Db3JlLk1vZGVsc1xyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgQXBwTW9kZWwgOiBJQXBwXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIElEaWN0aW9uYXJ5PHN0cmluZywgb2JqZWN0PiBQcm9wZXJ0aWVzIHsgZ2V0OyBwcml2YXRlIHNldDsgfVxyXG4gICAgICAgIHB1YmxpYyBhc3luYyBUYXNrIFNhdmVQcm9wZXJ0aWVzQXN5bmMoKVxyXG4gICAgICAgIHtcclxuXHJcbiAgICAgICAgfVxyXG5cbiAgICBcbnByaXZhdGUgSURpY3Rpb25hcnk8c3RyaW5nLCBvYmplY3Q+IF9fUHJvcGVydHlfX0luaXRpYWxpemVyX19Qcm9wZXJ0aWVzPW5ldyBEaWN0aW9uYXJ5PHN0cmluZywgb2JqZWN0PigpO31cclxufSIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5PYmplY3RNb2RlbDtcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcblxyXG5uYW1lc3BhY2UgSG93RmFyLkNvcmUuTW9kZWxzXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBNZWFzdXJlQ29udmVydGVycyA6IElNZWFzdXJlQ29udmVydGVyc1xyXG4gICAge1xyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgSU9iamVjdFJlcG9zaXRvcnkgX3JlcG9zaXRvcnk7XHJcbnB1YmxpYyBPYmplY3RNZWFzdXJlbWVudCBDZW50aW1ldGVyXHJcbntcclxuICAgIGdldFxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBGaW5kKFwiQ2VudGltZXRlclwiKTtcclxuICAgIH1cclxufSAgICAgICAgcHVibGljIE1lYXN1cmVDb252ZXJ0ZXJzKElPYmplY3RSZXBvc2l0b3J5IHJlcG9zaXRvcnkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBfcmVwb3NpdG9yeSA9IHJlcG9zaXRvcnk7XHJcbiAgICAgICAgICAgIFVwZGF0ZUxpc3QoKTtcclxuICAgICAgICB9XHJcblxyXG5cclxuXHJcbiNpZiBCUklER0VcclxuICAgICAgICBwcml2YXRlIHZvaWQgVXBkYXRlTGlzdCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBPYmplY3RNZWFzdXJlbWVudHMgPSBuZXcgTGlzdDxPYmplY3RNZWFzdXJlbWVudD4oU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5PcmRlckJ5PE9iamVjdE1lYXN1cmVtZW50LE9iamVjdE1lYXN1cmVtZW50PihHZXRBbGwoKSwoRnVuYzxPYmplY3RNZWFzdXJlbWVudCxPYmplY3RNZWFzdXJlbWVudD4pKHAgPT4gcCksIG5ldyBNZWFzdXJlbWVudENvbXBhcmUodGhpcykpKTtcclxuICAgICAgICAgICAgT2JqZWN0UGFja3MgPSBuZXcgTGlzdDxPYmplY3RQYWNrPihfcmVwb3NpdG9yeS5HZXRPYmplY3RQYWNrcygpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIExpc3Q8T2JqZWN0UGFjaz4gT2JqZWN0UGFja3MgeyBnZXQ7IHNldDsgfVxyXG4gICAgICAgIHB1YmxpYyBMaXN0PE9iamVjdE1lYXN1cmVtZW50PiBPYmplY3RNZWFzdXJlbWVudHMgeyBnZXQ7IHNldDsgfVxyXG5cclxuI2Vsc2VcclxuICAgICAgICBwcml2YXRlIHZvaWQgVXBkYXRlTGlzdCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBPYmplY3RNZWFzdXJlbWVudHMgPSBuZXcgT2JzZXJ2YWJsZUNvbGxlY3Rpb248T2JqZWN0TWVhc3VyZW1lbnQ+KEdldEFsbCgpLk9yZGVyQnkocCA9PiBwLCBuZXcgTWVhc3VyZW1lbnRDb21wYXJlKHRoaXMpKSk7XHJcbiAgICAgICAgICAgIE9iamVjdFBhY2tzID0gbmV3IE9ic2VydmFibGVDb2xsZWN0aW9uPE9iamVjdFBhY2s+KF9yZXBvc2l0b3J5LkdldE9iamVjdFBhY2tzKCkpO1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIE9ic2VydmFibGVDb2xsZWN0aW9uPE9iamVjdFBhY2s+IE9iamVjdFBhY2tzIHsgZ2V0OyBzZXQ7IH1cclxuICAgICAgICBwdWJsaWMgT2JzZXJ2YWJsZUNvbGxlY3Rpb248T2JqZWN0TWVhc3VyZW1lbnQ+IE9iamVjdE1lYXN1cmVtZW50cyB7IGdldDsgc2V0OyB9XHJcblxyXG4jZW5kaWZcclxuXHJcblxyXG4gICAgICAgIHB1YmxpYyBkb3VibGUgQ29udmVydChPYmplY3RNZWFzdXJlbWVudCBAZnJvbSwgT2JqZWN0TWVhc3VyZW1lbnQgdG8sIGRvdWJsZSB2YWx1ZUZyb20gPSAxKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYoZnJvbSA9PSBudWxsKSB0aHJvdyBuZXcgQXJndW1lbnROdWxsRXhjZXB0aW9uKFwiJ2Zyb20nIGNhbm5vdCBiZSBudWxsXCIpO1xyXG4gICAgICAgICAgICBpZiAodG8gPT0gbnVsbCkgdGhyb3cgbmV3IEFyZ3VtZW50TnVsbEV4Y2VwdGlvbihcIid0bycgY2Fubm90IGJlIG51bGxcIik7XHJcbiAgICAgICAgICAgIHJldHVybiBDb252ZXJ0KGZyb20uUGx1cmFsTmFtZSwgdG8uUGx1cmFsTmFtZSwgdmFsdWVGcm9tKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBkb3VibGUgQ29udmVydChzdHJpbmcgbmFtZUZyb20sIHN0cmluZyBuYW1lVG8sIGRvdWJsZSB2YWx1ZUZyb20gPSAxKVxyXG4gICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgIHZhciBmcm9tID0gRmluZChuYW1lRnJvbSk7XHJcbiAgICAgICAgICAgIHZhciB0byA9IEZpbmQobmFtZVRvKTtcclxuICAgICAgICAgICAgaWYgKHRvID09IGZyb20pXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZUZyb207XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlRnJvbSAqIENhbGN1bGF0ZShmcm9tLCB0bykgPz8gMDtcclxuICAgICAgICB9XHJcbiAgICAgICBcclxuICAgICAgICBwcml2YXRlIGRvdWJsZT8gQ2FsY3VsYXRlKE9iamVjdE1lYXN1cmVtZW50IEBmcm9tLCBPYmplY3RNZWFzdXJlbWVudCB0bywgZG91YmxlIHZhbHVlID0gMSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChmcm9tLlBhcmVudE1lYXN1cmVtZW50U2luZ2xlTmFtZSAhPSBudWxsKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZnJvbS5QYXJlbnRNZWFzdXJlbWVudFNpbmdsZU5hbWUgPT0gdG8uU2luZ2xlTmFtZSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZnJvbS5WYWx1ZSAqIHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB1cCA9IENhbGN1bGF0ZShmcm9tLk1lYXN1cmVtZW50LCB0bywgZnJvbS5WYWx1ZSAqIHZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodXAgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB1cDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gR29Eb3duKGZyb20sIHRvLCB2YWx1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGRvdWJsZT8gR29Eb3duKE9iamVjdE1lYXN1cmVtZW50IGZyb20sIE9iamVjdE1lYXN1cmVtZW50IHRvLCBkb3VibGUgdmFsdWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgY2hpbGRyZW4gPSBmcm9tLk9iamVjdE1lYXN1cmVtZW50cztcclxuICAgICAgICAgICAgLy9pZiAoY2hpbGRyZW4uQW55KCkgIT0gdHJ1ZSlcclxuICAgICAgICAgICAgLy97XHJcbiAgICAgICAgICAgIC8vICAgIGNoaWxkcmVuID0gRmluZChmcm9tLlNpbmdsZU5hbWUpLk9iamVjdE1lYXN1cmVtZW50cztcclxuICAgICAgICAgICAgLy99XHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciBvYmplY3RNZWFzdXJlbWVudCBpbiBjaGlsZHJlbilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKG9iamVjdE1lYXN1cmVtZW50ID09IHRvKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZSAvIHRvLlZhbHVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBkb3duID0gR29Eb3duKG9iamVjdE1lYXN1cmVtZW50LCB0bywgdmFsdWUgLyBvYmplY3RNZWFzdXJlbWVudC5WYWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRvd24gIT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkb3duO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBMaXN0PE9iamVjdE1lYXN1cmVtZW50PiBHZXRBbGwoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIFN5c3RlbS5MaW5xLkVudW1lcmFibGUuVG9MaXN0PE9iamVjdE1lYXN1cmVtZW50PihfcmVwb3NpdG9yeS5HZXRPYmplY3RNZWFzdXJlbWVudHMoKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgT2JqZWN0TWVhc3VyZW1lbnQgRmluZChzdHJpbmcgbmFtZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBfcmVwb3NpdG9yeS5HZXRPYmplY3RNZWFzdXJlbWVudChuYW1lKTtcclxuICAgICAgICAgICAgLy9yZXR1cm4gRmluZChDZW50aW1ldGVyLCBuYW1lKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcblxyXG4gICAgICAgIHB1YmxpYyBPYmplY3RNZWFzdXJlbWVudCBOZXdPYmplY3Qoc3RyaW5nIHBsdXJhbE5hbWUsIHN0cmluZyBzaW5nbGVOYW1lLCBkb3VibGUgdmFsdWUsIHN0cmluZyBtZWFzdXJlbWVudCwgc3RyaW5nIHBhY2sgPSBcIkN1c3RvbVwiKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIG1lYXN1cmUgPSBGaW5kKG1lYXN1cmVtZW50KTtcclxuICAgICAgICAgICAgaWYgKG1lYXN1cmUgIT0gbnVsbClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyIG5ld09iamVjdCA9IG5ldyBPYmplY3RNZWFzdXJlbWVudChzaW5nbGVOYW1lLCBwbHVyYWxOYW1lKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFZhbHVlID0gdmFsdWUsXHJcbiAgICAgICAgICAgICAgICAgICAgT2JqZWN0UGFja05hbWUgPSBwYWNrLFxyXG4gICAgICAgICAgICAgICAgICAgIFBhcmVudE1lYXN1cmVtZW50U2luZ2xlTmFtZSA9IG1lYXN1cmUuU2luZ2xlTmFtZVxyXG5cclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICBfcmVwb3NpdG9yeS5BZGRPYmplY3QobmV3T2JqZWN0KTtcclxuICAgICAgICAgICAgICAgIFVwZGF0ZUxpc3QoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXdPYmplY3Q7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgRGVsZXRlUGFjayhPYmplY3RQYWNrIHBhY2spXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBfcmVwb3NpdG9yeS5SZW1vdmVQYWNrKHBhY2spO1xyXG4gICAgICAgICAgICBVcGRhdGVMaXN0KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBEZWxldGVPYmplY3QoT2JqZWN0TWVhc3VyZW1lbnQgc2VsZWN0ZWRPYmplY3QpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBfcmVwb3NpdG9yeS5SZW1vdmVPYmplY3Qoc2VsZWN0ZWRPYmplY3QpO1xyXG4gICAgICAgICAgICB0aGlzLlVwZGF0ZUxpc3QoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFVwZGF0ZU9iamVjdChPYmplY3RNZWFzdXJlbWVudCBzZWxlY3RlZE9iamVjdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIF9yZXBvc2l0b3J5LlVwZGF0ZU9iamVjdChzZWxlY3RlZE9iamVjdCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHZvaWQgVXBkYXRlUGFjayhzdHJpbmcgcGFjaywgT2JqZWN0TWVhc3VyZW1lbnQgbmV3T2JqZWN0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIHBhY2tzID0gU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5GaXJzdE9yRGVmYXVsdDxPYmplY3RQYWNrPihPYmplY3RQYWNrcywoRnVuYzxPYmplY3RQYWNrLGJvb2w+KShwID0+IHAuUGFja05hbWUgPT0gcGFjaykpO1xyXG4gICAgICAgICAgICBpZiAocGFja3MgIT0gbnVsbClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcGFja3MuT2JqZWN0TWVhc3VyZW1lbnRzLkFkZChuZXdPYmplY3QpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEludmFsaWRPcGVyYXRpb25FeGNlcHRpb24oc3RyaW5nLkZvcm1hdChcInBhY2thZ2UgJ3swfScgbXVzdCBleGlzdCBmaXJzdFwiLHBhY2spKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGNvbnN0IHN0cmluZyBQcm9wZXJ0eUtleSA9IFwiQ29udmVyc2lvbnNcIjtcclxuXHJcblxyXG4gICAgICAgIHB1YmxpYyBPYmplY3RNZWFzdXJlbWVudCBOZXdPYmplY3Qoc3RyaW5nIHBsdXJhbE5hbWUsIHN0cmluZyBzaW5nbGVOYW1lLFxyXG4gICAgICAgICAgICBkb3VibGUgdmFsdWUsIE9iamVjdE1lYXN1cmVtZW50IG1lYXN1cmVtZW50LCBzdHJpbmcgcGFjayA9IFwiQ3VzdG9tXCIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gTmV3T2JqZWN0KHBsdXJhbE5hbWUsIHNpbmdsZU5hbWUsIHZhbHVlLCBtZWFzdXJlbWVudC5QbHVyYWxOYW1lLCBwYWNrKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIE5ld1BhY2soT2JqZWN0UGFjayBwYWNrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5fcmVwb3NpdG9yeS5BZGRQYWNrKHBhY2spO1xyXG4gICAgICAgICAgICB0aGlzLlVwZGF0ZUxpc3QoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJ1c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLkNvbXBvbmVudE1vZGVsLkRhdGFBbm5vdGF0aW9ucztcclxudXNpbmcgU3lzdGVtLkNvbXBvbmVudE1vZGVsLkRhdGFBbm5vdGF0aW9ucy5TY2hlbWE7XHJcblxyXG5uYW1lc3BhY2UgSG93RmFyLkNvcmUuTW9kZWxzXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBPYmplY3RNZWFzdXJlbWVudCA6IEJpbmRhYmxlQmFzZSwgSU9iamVjdE1lYXN1cmVtZW50XHJcbiAgICB7XHJcbiAgICAgICAgcHJpdmF0ZSBkb3VibGUgX3ZhbHVlO1xyXG4gICAgICAgIHByaXZhdGUgc3RyaW5nIF9pbWFnZTtcclxuICAgICAgICBwcml2YXRlIHN0cmluZyBfcGx1cmFsTmFtZTtcclxuICAgICAgICBwcml2YXRlIExpc3Q8T2JqZWN0TWVhc3VyZW1lbnQ+IF9vYmplY3RNZWFzdXJlbWVudHM7XHJcbiAgICAgICAgcHJpdmF0ZSBzdHJpbmcgX3NpbmdsZU5hbWU7XHJcbiAgICAgICAgcHJpdmF0ZSBPYmplY3RQYWNrIF9vYmplY3RQYWNrO1xyXG4gICAgICAgIHByaXZhdGUgc3RyaW5nIF9vYmplY3RQYWNrTmFtZTtcclxuICAgICAgICBwcml2YXRlIE9iamVjdE1lYXN1cmVtZW50IF9tZWFzdXJlbWVudDtcclxuICAgICAgICBwcml2YXRlIHN0cmluZyBfcGFyZW50TWVhc3VyZW1lbnRTaW5nbGVOYW1lO1xyXG5cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgc3RyaW5nIFRvU3RyaW5nKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBNZWFzdXJlbWVudCAhPSBudWxsID8gc3RyaW5nLkZvcm1hdChcInswfTogezF9IHsyfVwiLFNpbmdsZU5hbWUsVmFsdWUsTWVhc3VyZW1lbnQuUGx1cmFsTmFtZSk6IHN0cmluZy5Gb3JtYXQoXCJ7MH0gezF9XCIsVmFsdWUsUGx1cmFsTmFtZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBbRm9yZWlnbktleShcIk1lYXN1cmVtZW50XCIpXVxyXG4gICAgICAgIHB1YmxpYyBzdHJpbmcgUGFyZW50TWVhc3VyZW1lbnRTaW5nbGVOYW1lXHJcbntcclxuICAgIGdldFxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBfcGFyZW50TWVhc3VyZW1lbnRTaW5nbGVOYW1lO1xyXG4gICAgfVxyXG5cclxuICAgIFxyXG4gICAgc2V0XHJcbiAgICB7XHJcbiAgICAgICAgU2V0UHJvcGVydHk8c3RyaW5nPihyZWYgX3BhcmVudE1lYXN1cmVtZW50U2luZ2xlTmFtZSwgdmFsdWUpO1xyXG4gICAgfVxyXG4gICAgXHJcbn1cclxuICAgICAgICBwdWJsaWMgdmlydHVhbCBPYmplY3RNZWFzdXJlbWVudCBNZWFzdXJlbWVudFxyXG57XHJcbiAgICBnZXRcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gX21lYXN1cmVtZW50O1xyXG4gICAgfVxyXG5cclxuICAgIFxyXG4gICAgc2V0XHJcbiAgICB7XHJcbiAgICAgICAgU2V0UHJvcGVydHk8T2JqZWN0TWVhc3VyZW1lbnQ+KHJlZiBfbWVhc3VyZW1lbnQsIHZhbHVlKTtcclxuICAgIH1cclxuICAgIFxyXG59XHJcbiAgICAgICAgcHVibGljIGRvdWJsZSBWYWx1ZVxyXG57XHJcbiAgICBnZXRcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gX3ZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIFxyXG4gICAgc2V0XHJcbiAgICB7XHJcbiAgICAgICAgU2V0UHJvcGVydHk8ZG91YmxlPihyZWYgX3ZhbHVlLCB2YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBcclxufVxyXG4gICAgICAgIHB1YmxpYyBzdHJpbmcgSW1hZ2Vcclxue1xyXG4gICAgZ2V0XHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIF9pbWFnZTtcclxuICAgIH1cclxuXHJcbiAgICBcclxuICAgIHNldFxyXG4gICAge1xyXG4gICAgICAgIFNldFByb3BlcnR5PHN0cmluZz4ocmVmIF9pbWFnZSwgdmFsdWUpO1xyXG4gICAgfVxyXG4gICAgXHJcbn1cclxuICAgICAgICBwdWJsaWMgc3RyaW5nIFBsdXJhbE5hbWVcclxue1xyXG4gICAgZ2V0XHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIF9wbHVyYWxOYW1lO1xyXG4gICAgfVxyXG5cclxuICAgIFxyXG4gICAgc2V0XHJcbiAgICB7XHJcbiAgICAgICAgU2V0UHJvcGVydHk8c3RyaW5nPihyZWYgX3BsdXJhbE5hbWUsIHZhbHVlKTtcclxuICAgIH1cclxuICAgIFxyXG59XHJcbiAgICAgICAgcHVibGljIE9iamVjdE1lYXN1cmVtZW50KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIE9iamVjdE1lYXN1cmVtZW50cyA9IG5ldyBMaXN0PE9iamVjdE1lYXN1cmVtZW50PigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgT2JqZWN0TWVhc3VyZW1lbnQoc3RyaW5nIHNpbmdsZU5hbWUsIHN0cmluZyBwbHVyYWxOYW1lKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgU2luZ2xlTmFtZSA9IHNpbmdsZU5hbWU7XHJcbiAgICAgICAgICAgIFBsdXJhbE5hbWUgPSBwbHVyYWxOYW1lO1xyXG4gICAgICAgICAgICBPYmplY3RNZWFzdXJlbWVudHMgPSBuZXcgTGlzdDxPYmplY3RNZWFzdXJlbWVudD4oKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vcHVibGljIElFbnVtZXJhYmxlPE9iamVjdE1lYXN1cmVtZW50PiBHZXRDaGlsZHJlbigpXHJcbiAgICAgICAgLy97XHJcbiAgICAgICAgLy8gICAgcmV0dXJuIE9iamVjdE1lYXN1cmVtZW50cztcclxuICAgICAgICAvL31cclxuICAgICAgICBwdWJsaWMgdm9pZCBBZGQoT2JqZWN0TWVhc3VyZW1lbnQgb2JqKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgb2JqLk1lYXN1cmVtZW50ID0gdGhpcztcclxuICAgICAgICAgICAgT2JqZWN0TWVhc3VyZW1lbnRzLkFkZChvYmopO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZpcnR1YWwgTGlzdDxPYmplY3RNZWFzdXJlbWVudD4gT2JqZWN0TWVhc3VyZW1lbnRzXHJcbntcclxuICAgIGdldFxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBfb2JqZWN0TWVhc3VyZW1lbnRzO1xyXG4gICAgfVxyXG5cclxuICAgIFxyXG4gICAgc2V0XHJcbiAgICB7XHJcbiAgICAgICAgU2V0UHJvcGVydHk8TGlzdDxPYmplY3RNZWFzdXJlbWVudD4+KHJlZiBfb2JqZWN0TWVhc3VyZW1lbnRzLCB2YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBcclxufVxyXG4gICAgICAgIHB1YmxpYyBzdHJpbmcgU2luZ2xlTmFtZVxyXG57XHJcbiAgICBnZXRcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gX3NpbmdsZU5hbWU7XHJcbiAgICB9XHJcblxyXG4gICAgXHJcbiAgICBzZXRcclxuICAgIHtcclxuICAgICAgICBTZXRQcm9wZXJ0eTxzdHJpbmc+KHJlZiBfc2luZ2xlTmFtZSwgdmFsdWUpO1xyXG4gICAgfVxyXG4gICAgXHJcbn1cclxuICAgICAgICBwdWJsaWMgT2JqZWN0UGFjayBPYmplY3RQYWNrXHJcbntcclxuICAgIGdldFxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBfb2JqZWN0UGFjaztcclxuICAgIH1cclxuXHJcbiAgICBcclxuICAgIHNldFxyXG4gICAge1xyXG4gICAgICAgIFNldFByb3BlcnR5PE9iamVjdFBhY2s+KHJlZiBfb2JqZWN0UGFjaywgdmFsdWUpO1xyXG4gICAgfVxyXG4gICAgXHJcbn1cclxuICAgICAgICBwdWJsaWMgc3RyaW5nIE9iamVjdFBhY2tOYW1lXHJcbntcclxuICAgIGdldFxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBfb2JqZWN0UGFja05hbWU7XHJcbiAgICB9XHJcblxyXG4gICAgXHJcbiAgICBzZXRcclxuICAgIHtcclxuICAgICAgICBTZXRQcm9wZXJ0eTxzdHJpbmc+KHJlZiBfb2JqZWN0UGFja05hbWUsIHZhbHVlKTtcclxuICAgIH1cclxuICAgIFxyXG59ICAgIH1cclxufSIsInVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuT2JqZWN0TW9kZWw7XHJcblxyXG5uYW1lc3BhY2UgSG93RmFyLkNvcmUuTW9kZWxzXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBPYmplY3RQYWNrIDogQmluZGFibGVCYXNlXHJcbiAgICB7XHJcbiAgICAgICAgcHJpdmF0ZSBzdHJpbmcgX3BhY2tOYW1lO1xyXG4gICAgICAgIHByaXZhdGUgc3RyaW5nIF9kZXNjcmlwdGlvbjtcclxuICAgICAgICBwcml2YXRlIHN0cmluZyBfcGFja0ltYWdlO1xyXG5cclxuI2lmIEJSSURHRVxyXG4gICAgICAgIHB1YmxpYyB2aXJ0dWFsIExpc3Q8T2JqZWN0TWVhc3VyZW1lbnQ+IE9iamVjdE1lYXN1cmVtZW50cyB7IGdldDsgc2V0OyB9XHJcbiNlbHNlXHJcbiAgICAgICAgcHVibGljIHZpcnR1YWwgT2JzZXJ2YWJsZUNvbGxlY3Rpb248T2JqZWN0TWVhc3VyZW1lbnQ+IE9iamVjdE1lYXN1cmVtZW50cyB7IGdldDsgc2V0OyB9ID0gbmV3IE9ic2VydmFibGVDb2xsZWN0aW9uPE9iamVjdE1lYXN1cmVtZW50PigpO1xyXG5cclxuI2VuZGlmXHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIHN0cmluZyBUb1N0cmluZygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gUGFja05hbWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RyaW5nIFBhY2tOYW1lXHJcbntcclxuICAgIGdldFxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBfcGFja05hbWU7XHJcbiAgICB9XHJcblxyXG4gICAgXHJcbiAgICBzZXRcclxuICAgIHtcclxuICAgICAgICBTZXRQcm9wZXJ0eTxzdHJpbmc+KHJlZiBfcGFja05hbWUsIHZhbHVlKTtcclxuICAgIH1cclxuICAgIFxyXG59cHVibGljIHN0cmluZyBOYW1lXHJcbntcclxuICAgIGdldFxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBQYWNrTmFtZTtcclxuICAgIH1cclxufXB1YmxpYyBzdHJpbmcgSW1hZ2VVUkxcclxue1xyXG4gICAgZ2V0XHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIFBhY2tJbWFnZTtcclxuICAgIH1cclxufVxyXG4gICAgICAgIHB1YmxpYyBzdHJpbmcgRGVzY3JpcHRpb25cclxue1xyXG4gICAgZ2V0XHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIF9kZXNjcmlwdGlvbjtcclxuICAgIH1cclxuXHJcbiAgICBcclxuICAgIHNldFxyXG4gICAge1xyXG4gICAgICAgIFNldFByb3BlcnR5PHN0cmluZz4ocmVmIF9kZXNjcmlwdGlvbiwgdmFsdWUpO1xyXG4gICAgfVxyXG4gICAgXHJcbn1cclxuICAgICAgICBwdWJsaWMgc3RyaW5nIFBhY2tJbWFnZVxyXG57XHJcbiAgICBnZXRcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gX3BhY2tJbWFnZTtcclxuICAgIH1cclxuXHJcbiAgICBcclxuICAgIHNldFxyXG4gICAge1xyXG4gICAgICAgIFNldFByb3BlcnR5PHN0cmluZz4ocmVmIF9wYWNrSW1hZ2UsIHZhbHVlKTtcclxuICAgIH1cclxuICAgIFxyXG59XHJcbiAgICAgICAgcHVibGljIE9iamVjdFBhY2soKVxyXG4gICAgICAgIHtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBPYmplY3RQYWNrKHN0cmluZyBuYW1lLHN0cmluZyBkZXNjcmlwdGlvbilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFBhY2tOYW1lID0gbmFtZTtcclxuICAgICAgICAgICAgRGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbjtcclxuICAgICAgICAgICAgUGFja0ltYWdlID0gXCJodHRwczovL3ZpYS5wbGFjZWhvbGRlci5jb20vMTUwXCI7XHJcbiAgICAgICAgfVxyXG5cbiAgICBcbnByaXZhdGUgTGlzdDxPYmplY3RNZWFzdXJlbWVudD4gX19Qcm9wZXJ0eV9fSW5pdGlhbGl6ZXJfX09iamVjdE1lYXN1cmVtZW50cz1uZXcgTGlzdDxPYmplY3RNZWFzdXJlbWVudD4oKTt9XHJcbn0iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxuXHJcbm5hbWVzcGFjZSBIb3dGYXIuQ29yZS5Nb2RlbHNcclxue1xyXG4gICAgcHVibGljIGNsYXNzIE9iamVjdFJlcG9zaXRvcnlDYWNoZSA6IElPYmplY3RSZXBvc2l0b3J5XHJcbiAgICB7XHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBJQXBwIF9hcHA7XHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBMaXN0PE9iamVjdE1lYXN1cmVtZW50PiBtZWFzdXJlbWVudHM7XHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBMaXN0PE9iamVjdFBhY2s+IHBhY2tzO1xyXG5cclxuICAgICAgICBUIEdldEtleTxUPihzdHJpbmcga2V5KVxyXG4gICAgICAgIHtcclxuVCBkYXRhOyAgICAgICAgICAgIGlmIChfYXBwLlByb3BlcnRpZXMuQ29udGFpbnNLZXkoa2V5KSAmJiAoZGF0YSA9IF9hcHAuUHJvcGVydGllc1trZXldIGFzIFQpICE9IG51bGwpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBkYXRhO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBkZWZhdWx0KFQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIE9iamVjdFJlcG9zaXRvcnlDYWNoZShJQXBwIGFwcClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIF9hcHAgPSBhcHA7XHJcbiAgICAgICAgICAgIG1lYXN1cmVtZW50cyA9IEdldEtleTxMaXN0PE9iamVjdE1lYXN1cmVtZW50Pj4oT2JqZWN0S2V5KSA/PyBuZXcgTGlzdDxPYmplY3RNZWFzdXJlbWVudD4oKTtcclxuICAgICAgICAgICAgcGFja3MgPSBHZXRLZXk8TGlzdDxPYmplY3RQYWNrPj4oUGFja0tleSkgPz8gbmV3IExpc3Q8T2JqZWN0UGFjaz4oKTtcclxuICAgICAgICAgICAgT2JqZWN0UmVwb3NpdG9yeVNlZWRlci5TdGFydHVwKHRoaXMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgdm9pZCBEaXNwb3NlKClcclxuICAgICAgICB7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2b2lkIEluc2VydEtleShzdHJpbmcga2V5LCBvYmplY3QgZGF0YSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChfYXBwLlByb3BlcnRpZXMuQ29udGFpbnNLZXkoa2V5KSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgX2FwcC5Qcm9wZXJ0aWVzW2tleV0gPSBkYXRhO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgX2FwcC5Qcm9wZXJ0aWVzLkFkZChrZXksZGF0YSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgYXN5bmMgdm9pZCBTYXZlQ2hhbmdlcygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBJbnNlcnRLZXkoT2JqZWN0S2V5LCBtZWFzdXJlbWVudHMpO1xyXG4gICAgICAgICAgICBJbnNlcnRLZXkoUGFja0tleSwgcGFja3MpO1xyXG4gICAgICAgICAgICBhd2FpdCBfYXBwLlNhdmVQcm9wZXJ0aWVzQXN5bmMoKTtcclxuICAgICAgICB9XHJcbiAgICAgICBcclxuICAgICAgICBwdWJsaWMgT2JqZWN0TWVhc3VyZW1lbnQgR2V0T2JqZWN0TWVhc3VyZW1lbnQoc3RyaW5nIG5hbWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgZGF0YSA9IEdldE9iamVjdE1lYXN1cmVtZW50cygpO1xyXG4gICAgICAgICAgICByZXR1cm4gU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5GaXJzdE9yRGVmYXVsdDxPYmplY3RNZWFzdXJlbWVudD4oZGF0YSwoRnVuYzxPYmplY3RNZWFzdXJlbWVudCxib29sPikocCA9PiBwLlNpbmdsZU5hbWUuVG9Mb3dlcigpID09IG5hbWUuVG9Mb3dlcigpIHx8IHAuUGx1cmFsTmFtZS5Ub0xvd2VyKCkgPT0gbmFtZS5Ub0xvd2VyKCkpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBjb25zdCBzdHJpbmcgT2JqZWN0S2V5ID0gXCJPYmplY3RNZWFzdXJlbWVudHNcIjtcclxuICAgICAgICBwdWJsaWMgY29uc3Qgc3RyaW5nIFBhY2tLZXkgPSBcIk9iamVjdFBhY2tzXCI7XHJcbiAgICAgICAgcHVibGljIElFbnVtZXJhYmxlPE9iamVjdE1lYXN1cmVtZW50PiBHZXRPYmplY3RNZWFzdXJlbWVudHMoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdFJlcG9zaXRvcnlTZWVkZXIuU2V0dXBUcmVlKG1lYXN1cmVtZW50cyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyB2b2lkIEFkZE9iamVjdChPYmplY3RNZWFzdXJlbWVudCBtZWFzdXJlbWVudClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChtZWFzdXJlbWVudC5PYmplY3RQYWNrTmFtZT09IG51bGwpXHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgSW52YWxpZE9wZXJhdGlvbkV4Y2VwdGlvbihcIm11c3QgaGF2ZSBhIHBhY2sgbmFtZVwiKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChtZWFzdXJlbWVudC5QYXJlbnRNZWFzdXJlbWVudFNpbmdsZU5hbWUgPT0gbnVsbCAmJiBtZWFzdXJlbWVudC5NZWFzdXJlbWVudCAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgbWVhc3VyZW1lbnQuUGFyZW50TWVhc3VyZW1lbnRTaW5nbGVOYW1lID0gbWVhc3VyZW1lbnQuTWVhc3VyZW1lbnQuU2luZ2xlTmFtZTtcclxuICAgICAgICAgICAgZWxzZSBpZiAobWVhc3VyZW1lbnQuUGFyZW50TWVhc3VyZW1lbnRTaW5nbGVOYW1lICE9IG51bGwgJiYgbWVhc3VyZW1lbnQuTWVhc3VyZW1lbnQgPT0gbnVsbClcclxuICAgICAgICAgICAgICAgIG1lYXN1cmVtZW50Lk1lYXN1cmVtZW50ID1cclxuU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5GaXJzdE9yRGVmYXVsdDxPYmplY3RNZWFzdXJlbWVudD4oICAgICAgICAgICAgICAgICAgICBtZWFzdXJlbWVudHMsKEZ1bmM8T2JqZWN0TWVhc3VyZW1lbnQsYm9vbD4pKHAgPT4gcC5TaW5nbGVOYW1lID09IG1lYXN1cmVtZW50LlBhcmVudE1lYXN1cmVtZW50U2luZ2xlTmFtZSkpO1xyXG4gICAgICAgICAgICBpZiAobWVhc3VyZW1lbnQuT2JqZWN0UGFja05hbWUgPT0gbnVsbCAmJiBtZWFzdXJlbWVudC5PYmplY3RQYWNrICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICBtZWFzdXJlbWVudC5PYmplY3RQYWNrTmFtZSA9IG1lYXN1cmVtZW50Lk9iamVjdFBhY2suUGFja05hbWU7XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKG1lYXN1cmVtZW50Lk9iamVjdFBhY2tOYW1lICE9IG51bGwgJiYgbWVhc3VyZW1lbnQuT2JqZWN0UGFjayA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgbWVhc3VyZW1lbnQuT2JqZWN0UGFjayA9IFN5c3RlbS5MaW5xLkVudW1lcmFibGUuRmlyc3RPckRlZmF1bHQ8T2JqZWN0UGFjaz4ocGFja3MsKEZ1bmM8T2JqZWN0UGFjayxib29sPikocCA9PiBwLlBhY2tOYW1lID09IG1lYXN1cmVtZW50Lk9iamVjdFBhY2tOYW1lKSk7XHJcblxyXG4gICAgICAgICAgICB2YXIgcGFjayA9IFN5c3RlbS5MaW5xLkVudW1lcmFibGUuRmlyc3Q8T2JqZWN0UGFjaz4ocGFja3MsKEZ1bmM8T2JqZWN0UGFjayxib29sPikocCA9PiBwLlBhY2tOYW1lID09IG1lYXN1cmVtZW50Lk9iamVjdFBhY2tOYW1lKSk7XHJcbiAgICAgICAgICAgIGlmIChTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLkFueTxPYmplY3RNZWFzdXJlbWVudD4ocGFjay5PYmplY3RNZWFzdXJlbWVudHMsKEZ1bmM8T2JqZWN0TWVhc3VyZW1lbnQsYm9vbD4pKHAgPT4gcC5TaW5nbGVOYW1lID09IG1lYXN1cmVtZW50LlNpbmdsZU5hbWUpKSAhPSB0cnVlKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBwYWNrLk9iamVjdE1lYXN1cmVtZW50cy5BZGQobWVhc3VyZW1lbnQpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBtZWFzdXJlbWVudHMuQWRkKG1lYXN1cmVtZW50KTtcclxuICAgICAgICAgICAgU2F2ZUNoYW5nZXMoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFJlbW92ZU9iamVjdChPYmplY3RNZWFzdXJlbWVudCBtZWFzdXJlbWVudClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG1lYXN1cmVtZW50cy5SZW1vdmUobWVhc3VyZW1lbnQpO1xyXG4gICAgICAgICAgICBTYXZlQ2hhbmdlcygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIElFbnVtZXJhYmxlPE9iamVjdFBhY2s+IEdldE9iamVjdFBhY2tzKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBwYWNrcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIEFkZFBhY2soT2JqZWN0UGFjayBwYWNrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcGFja3MuQWRkKHBhY2spO1xyXG4gICAgICAgICAgICBTYXZlQ2hhbmdlcygpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFJlbW92ZVBhY2soT2JqZWN0UGFjayBwYWNrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcGFja3MuUmVtb3ZlKHBhY2spO1xyXG4gICAgICAgICAgICBTYXZlQ2hhbmdlcygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgVXBkYXRlT2JqZWN0KE9iamVjdE1lYXN1cmVtZW50IHNlbGVjdGVkT2JqZWN0KVxyXG4gICAgICAgIHtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgcHVibGljIE9iamVjdE1lYXN1cmVtZW50IE5ld09iamVjdChzdHJpbmcgcGx1cmFsLCBzdHJpbmcgc2luZ2xlLCBkb3VibGUgdmFsdWUsIE9iamVjdE1lYXN1cmVtZW50IHBhcmVudCwgc3RyaW5nIHBhY2spXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0UmVwb3NpdG9yeVNlZWRlci5OZXdPYmplY3RBY3Rpb24ocGx1cmFsLCBzaW5nbGUsIHZhbHVlLCBwYXJlbnQuU2luZ2xlTmFtZSwgcGFjaywgdGhpcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwidXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcblxyXG5uYW1lc3BhY2UgSG93RmFyLkNvcmUuTW9kZWxzXHJcbntcclxuICAgIGludGVybmFsIGNsYXNzIE1lYXN1cmVtZW50Q29tcGFyZSA6IElDb21wYXJlcjxPYmplY3RNZWFzdXJlbWVudD5cclxuICAgIHtcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IElNZWFzdXJlQ29udmVydGVycyBfY29udmVydGVycztcclxuXHJcbiAgICAgICAgcHVibGljIE1lYXN1cmVtZW50Q29tcGFyZShJTWVhc3VyZUNvbnZlcnRlcnMgY29udmVydGVycylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIF9jb252ZXJ0ZXJzID0gY29udmVydGVycztcclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIGludCBDb21wYXJlKE9iamVjdE1lYXN1cmVtZW50IHgsIE9iamVjdE1lYXN1cmVtZW50IHkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgeHRveSA9IF9jb252ZXJ0ZXJzLkNvbnZlcnQoeCwgeSk7XHJcbiAgICAgICAgICAgIGlmICh4dG95ID4gMSkgcmV0dXJuIDE7XHJcbiAgICAgICAgICAgIHJldHVybiAtMTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iXQp9Cg==

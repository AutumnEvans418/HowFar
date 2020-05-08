/**
 * @version 1.0.0.0
 * @copyright Copyright ©  2020
 * @compiler Bridge.NET 17.10.1
 */
Bridge.assembly("HowFar.Bridge", function ($asm, globals) {
    "use strict";

    Bridge.define("HowFar.Bridge.App", {
        main: function Main () {

            new HowFar.Core.Models.AppModel();

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
            fromSelect: null,
            toSelect: null,
            num: null,
            answer: null,
            reversebtn: null,
            converter: null,
            Properties: null
        },
        alias: [
            "Properties", "HowFar$Core$Models$IApp$Properties",
            "SavePropertiesAsync", "HowFar$Core$Models$IApp$SavePropertiesAsync"
        ],
        ctors: {
            init: function () {
                this.fromSelect = document.getElementById("from");
                this.toSelect = document.getElementById("to");
                this.num = document.getElementById("num");
                this.answer = document.getElementById("answer");
                this.reversebtn = document.getElementById("reverse");
                this.Properties = new (System.Collections.Generic.Dictionary$2(System.String,System.Object)).ctor();
            },
            ctor: function () {
                this.$initialize();
                this.converter = new HowFar.Core.Models.MeasureConverters(new HowFar.Core.Models.ObjectRepositoryCache(this));
                this.converter.ObjectMeasurements.ForEach(Bridge.fn.bind(this, function (p) {
                    var $t;
                    this.fromSelect.appendChild(($t = document.createElement("option"), $t.text = p.PluralName, $t));
                    this.toSelect.appendChild(($t = document.createElement("option"), $t.text = p.PluralName, $t));
                }));

                this.fromSelect.onchange = Bridge.fn.bind(this, function (e) {
                    this.Convert();
                });
                this.toSelect.onchange = Bridge.fn.bind(this, function (e) {
                    this.Convert();
                });

                if (this.reversebtn != null) {
                    this.reversebtn.onclick = Bridge.fn.bind(this, function (e) {
                        var f = this.fromSelect.selectedIndex;
                        var to = this.toSelect.selectedIndex;
                        this.fromSelect.selectedIndex = to;
                        this.toSelect.selectedIndex = f;
                        update();
                        this.Convert();
                    });
                }

                this.num.onkeydown = Bridge.fn.bind(this, function (e) {
                    this.Convert();
                });
                this.num.onmouseup = Bridge.fn.bind(this, function (e) {
                    this.Convert();
                });
                choose();
                this.Convert();
            }
        },
        methods: {
            Convert: function () {
                var n = { };
                if (System.Double.tryParse(this.num.value, null, n)) {
                    var result = this.converter.Convert$1(this.fromSelect.value, this.toSelect.value, n.v);

                    this.answer.textContent = System.String.format("1 {0} = {1} {2}", this.fromSelect.value, Bridge.box(result, System.Double, System.Double.format, System.Double.getHashCode), this.toSelect.value);
                }
            },
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
            Convert: function (fromMeasurement, to, valueFrom) {
                if (valueFrom === void 0) { valueFrom = 1.0; }
                if (fromMeasurement == null) {
                    throw new System.ArgumentNullException.$ctor1("'from' cannot be null");
                }
                if (to == null) {
                    throw new System.ArgumentNullException.$ctor1("'to' cannot be null");
                }
                return this.Convert$1(fromMeasurement.PluralName, to.PluralName, valueFrom);
            },
            Convert$1: function (nameFrom, nameTo, valueFrom) {
                var $t;
                if (valueFrom === void 0) { valueFrom = 1.0; }

                var fromMeasurement = this.Find(nameFrom);
                var to = this.Find(nameTo);
                if (Bridge.referenceEquals(to, fromMeasurement)) {
                    return valueFrom;
                }
                return ($t = System.Nullable.mul(valueFrom, this.Calculate(fromMeasurement, to)), $t != null ? $t : 0);
            },
            Calculate: function (fromMeasurement, to, value) {
                if (value === void 0) { value = 1.0; }
                if (fromMeasurement.ParentMeasurementSingleName != null) {
                    if (Bridge.referenceEquals(fromMeasurement.ParentMeasurementSingleName, to.SingleName)) {
                        return fromMeasurement.Value * value;
                    } else {
                        var up = this.Calculate(fromMeasurement.Measurement, to, fromMeasurement.Value * value);
                        if (up != null) {
                            return up;
                        }
                    }
                } else {
                    return this.GoDown(fromMeasurement, to, value);
                }
                return null;
            },
            GoDown: function (fromMeasurement, to, value) {
                var $t;
                var children = fromMeasurement.ObjectMeasurements;
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

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICJIb3dGYXIuQnJpZGdlLmpzIiwKICAic291cmNlUm9vdCI6ICIiLAogICJzb3VyY2VzIjogWyJBcHAuY3MiLCIuLi9Ib3dGYXIuQ29yZS9CaW5kYWJsZUJhc2UuY3MiLCIuLi9Ib3dGYXIuQ29yZS9Nb2RlbHMvT2JqZWN0UmVwb3NpdG9yeVNlZWRlci5jcyIsIkFwcE1vZGVsLmNzIiwiLi4vSG93RmFyLkNvcmUvTW9kZWxzL01lYXN1cmVDb252ZXJ0ZXJzLmNzIiwiLi4vSG93RmFyLkNvcmUvTW9kZWxzL09iamVjdE1lYXN1cmVtZW50LmNzIiwiLi4vSG93RmFyLkNvcmUvTW9kZWxzL09iamVjdFBhY2suY3MiLCIuLi9Ib3dGYXIuQ29yZS9Nb2RlbHMvT2JqZWN0UmVwb3NpdG9yeUNhY2hlLmNzIiwiLi4vSG93RmFyLkNvcmUvTW9kZWxzL01lYXN1cmVtZW50Q29tcGFyZS5jcyJdLAogICJuYW1lcyI6IFsiIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7WUFzQllBLElBQUlBOzs7Ozs7Ozs7Ozs7O21DQ1pnQkEsR0FBR0EsVUFBZ0JBLE9BQVNBLFFBQXNCQTs7O2dCQUV0RUEsSUFBSUEscUJBQUNBLGNBQVVBLE9BQUtBLDBCQUFnQkEsU0FBT0EsQUFBT0E7b0JBRTlDQSxhQUFXQTtvQkFDWEEsdUJBQWtCQTtvQkFDbEJBLDZCQUFRQSxRQUFLQSxBQUFxQ0EsV0FBaUJBOzs7O3lDQU9sQ0E7O2dCQUVyQ0EsMkNBQWlCQSxRQUFLQSxBQUFxQ0EscUJBQXVCQSxNQUFNQSxJQUFJQSwrQ0FBeUJBLGlCQUFnQkE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7bUNDYjlHQTs7b0JBR3ZCQSxrQkFBa0JBLEtBQUlBO29CQUl0QkEsaUJBQWlCQSxVQUFJQTtvQkFDckJBLDRCQUE0QkE7b0JBQzVCQSxnQkFBZ0JBLFVBQUlBO29CQUNwQkEsZ0JBQWdCQSxVQUFJQSxxQ0FBV0E7b0JBQy9CQSxnQkFBZ0JBLFVBQUlBLHFDQUFXQTtvQkFD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VUE7O2dCQUNkQSxPQUFPQSIsCiAgInNvdXJjZXNDb250ZW50IjogWyJ1c2luZyBCcmlkZ2U7XHJcbnVzaW5nIE5ld3RvbnNvZnQuSnNvbjtcclxudXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcclxudXNpbmcgQnJpZGdlLkh0bWw1O1xyXG51c2luZyBIb3dGYXIuQ29yZS5Nb2RlbHM7XHJcblxyXG5uYW1lc3BhY2UgSG93RmFyLkJyaWRnZVxyXG57XHJcblxyXG4gXHJcblxyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBBcHAgXHJcbiAgICB7XHJcbiAgICAgIFxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgTWFpbigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvL1dpbmRvdy5PbkxvYWQgPSBlID0+IHsgbmV3IEFwcE1vZGVsKCk7IH07XHJcblxyXG4gICAgICAgICAgICBuZXcgQXBwTW9kZWwoKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBcclxuICAgICAgXHJcbiAgICB9XHJcbn0iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db21wb25lbnRNb2RlbDtcclxudXNpbmcgU3lzdGVtLlJ1bnRpbWUuQ29tcGlsZXJTZXJ2aWNlcztcclxuXHJcbm5hbWVzcGFjZSBIb3dGYXIuQ29yZVxyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgQmluZGFibGVCYXNlIDogSU5vdGlmeVByb3BlcnR5Q2hhbmdlZFxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBldmVudCBQcm9wZXJ0eUNoYW5nZWRFdmVudEhhbmRsZXIgUHJvcGVydHlDaGFuZ2VkO1xyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBTZXRQcm9wZXJ0eTxUPihyZWYgVCBwcm9wZXJ0eSwgVCB2YWx1ZSwgQWN0aW9uIGFjdGlvbiA9IG51bGwsIFtDYWxsZXJNZW1iZXJOYW1lXSBzdHJpbmcgbmFtZSA9IG51bGwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoKHByb3BlcnR5IT1udWxsP3Byb3BlcnR5LkVxdWFscyh2YWx1ZSk6KGJvb2w/KW51bGwpICE9IHRydWUpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHByb3BlcnR5ID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICBPblByb3BlcnR5Q2hhbmdlZChuYW1lKTtcclxuICAgICAgICAgICAgICAgIGFjdGlvbiE9bnVsbD9nbG9iYWw6OkJyaWRnZS5TY3JpcHQuRnJvbUxhbWJkYSgoKT0+YWN0aW9uLkludm9rZSgpKTpudWxsO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuI2lmICFCUklER0VcclxuICAgICAgICBbSG93RmFyLkNvcmUuQW5ub3RhdGlvbnMuTm90aWZ5UHJvcGVydHlDaGFuZ2VkSW52b2NhdG9yXVxyXG4jZW5kaWZcclxuICAgICAgICBwcm90ZWN0ZWQgdmlydHVhbCB2b2lkIE9uUHJvcGVydHlDaGFuZ2VkKFtDYWxsZXJNZW1iZXJOYW1lXSBzdHJpbmcgcHJvcGVydHlOYW1lID0gbnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFByb3BlcnR5Q2hhbmdlZCE9bnVsbD9nbG9iYWw6OkJyaWRnZS5TY3JpcHQuRnJvbUxhbWJkYSgoKT0+UHJvcGVydHlDaGFuZ2VkLkludm9rZSh0aGlzLCBuZXcgUHJvcGVydHlDaGFuZ2VkRXZlbnRBcmdzKHByb3BlcnR5TmFtZSkpKTpudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsInVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuT2JqZWN0TW9kZWw7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG5cclxubmFtZXNwYWNlIEhvd0Zhci5Db3JlLk1vZGVsc1xyXG57XHJcbiAgICBwdWJsaWMgc3RhdGljIGNsYXNzIE9iamVjdFJlcG9zaXRvcnlTZWVkZXJcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgY29uc3Qgc3RyaW5nIE1ldHJpYyA9IFwiTWV0cmljXCI7XHJcbiAgICAgICAgcHVibGljIGNvbnN0IHN0cmluZyBJbXBlcmlhbCA9IFwiSW1wZXJpYWxcIjtcclxuICAgICAgICBwdWJsaWMgY29uc3Qgc3RyaW5nIFNwYWNlID0gXCJTcGFjZVwiO1xyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgU3RhcnR1cChJT2JqZWN0UmVwb3NpdG9yeSByZXBvc2l0b3J5KVxyXG4gICAgICAgIHtcclxuI2lmIEJSSURHRVxyXG4gICAgICAgICAgICB2YXIgb2JqZWN0UGFja3MgPSBuZXcgTGlzdDxPYmplY3RQYWNrPigpO1xyXG4jZWxzZVxyXG4gICAgICAgICAgICAgICAgdmFyIG9iamVjdFBhY2tzID0gbmV3IE9ic2VydmFibGVDb2xsZWN0aW9uPE9iamVjdFBhY2s+KCk7XHJcbiNlbmRpZlxyXG4gICAgICAgICAgICB2YXIgY2VudGltZXRlciA9IG5ldyBPYmplY3RNZWFzdXJlbWVudChcIkNlbnRpbWV0ZXJcIiwgXCJDZW50aW1ldGVyc1wiKSB7IFZhbHVlID0gMSB9O1xyXG4gICAgICAgICAgICBjZW50aW1ldGVyLk9iamVjdFBhY2tOYW1lID0gTWV0cmljO1xyXG4gICAgICAgICAgICBvYmplY3RQYWNrcy5BZGQobmV3IE9iamVjdFBhY2soXCJDdXN0b21cIiwgXCJPYmplY3RzIHRoYXQgYXJlIG1hZGUgaW4gdGhlIGFwcCBhcmUgcGxhY2VkIGhlcmUuXCIpIHsgUGFja0ltYWdlID0gXCJBc3NldHMvYmxvY2sucG5nXCIgfSk7XHJcbiAgICAgICAgICAgIG9iamVjdFBhY2tzLkFkZChuZXcgT2JqZWN0UGFjayhJbXBlcmlhbCwgXCJBIGRlZmF1bHQgcGFja2FnZSBmb3IgdGhlIFVTIG1lYXN1cmVtZW50IHN5c3RlbVwiKSB7IFBhY2tJbWFnZSA9IFwiaHR0cHM6Ly9sb2dvZXBzLmNvbS93cC1jb250ZW50L3VwbG9hZHMvMjAxMy8wNi9mbGFnLW9mLXVzYS12ZWN0b3ItbG9nby5wbmdcIiB9KTtcclxuICAgICAgICAgICAgb2JqZWN0UGFja3MuQWRkKG5ldyBPYmplY3RQYWNrKE1ldHJpYywgXCJUaGUgbWV0cmljIHN5c3RlbS4gIFVzZWQgYnkgZXZlcnlvbmUgZXhjZXB0IHRoZSBVU1wiKSB7IFBhY2tJbWFnZSA9IFwiaHR0cDovL3d3dy5rbmlnaHRzdGVtcGxhcm9yZGVyLm9yZy93cC1jb250ZW50L3VwbG9hZHMvMjAxNi8wNi9VTi1TRUFMLVN0eWxpemVkLTUwMC1Ccm93bi5wbmdcIiB9KTtcclxuICAgICAgICAgICAgb2JqZWN0UGFja3MuQWRkKG5ldyBPYmplY3RQYWNrKFNwYWNlLCBcIk9iamVjdHMgYW5kIE1lYXN1cmVtZW50cyBpbiBzcGFjZVwiKSB7IFBhY2tJbWFnZSA9IFwiaHR0cHM6Ly9zZXAueWltZy5jb20vYXkvc2t5aW1hZ2UvbmFzYS1zcGFjZS1taXNzaW9ucy05LmpwZ1wiIH0pO1xyXG4gICAgICAgICAgICB2YXIgcGFja3MgPSBTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLlRvTGlzdDxPYmplY3RQYWNrPihyZXBvc2l0b3J5LkdldE9iamVjdFBhY2tzKCkpO1xyXG4gICAgICAgICAgICBmb3JlYWNoICh2YXIgb2JqZWN0UGFjayBpbiBvYmplY3RQYWNrcylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLlNlbGVjdDxPYmplY3RQYWNrLHN0cmluZz4ocGFja3MsKFN5c3RlbS5GdW5jPE9iamVjdFBhY2ssc3RyaW5nPikocCA9PiBwLlBhY2tOYW1lKSkuQ29udGFpbnMob2JqZWN0UGFjay5QYWNrTmFtZSkpXHJcbiAgICAgICAgICAgICAgICAgICAgcmVwb3NpdG9yeS5BZGRQYWNrKG9iamVjdFBhY2spO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvL2RiLlNhdmVDaGFuZ2VzKCk7XHJcbiAgICAgICAgICAgIGlmIChTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLkFsbDxPYmplY3RNZWFzdXJlbWVudD4ocmVwb3NpdG9yeS5HZXRPYmplY3RNZWFzdXJlbWVudHMoKSwoU3lzdGVtLkZ1bmM8T2JqZWN0TWVhc3VyZW1lbnQsYm9vbD4pKHAgPT4gcC5TaW5nbGVOYW1lICE9IGNlbnRpbWV0ZXIuU2luZ2xlTmFtZSkpKVxyXG4gICAgICAgICAgICAgICAgcmVwb3NpdG9yeS5BZGRPYmplY3QoY2VudGltZXRlcik7XHJcbiAgICAgICAgICAgIC8vcmVwb3NpdG9yeS5VcGRhdGVQYWNrKEltcGVyaWFsLCBjZW50aW1ldGVyKTtcclxuICAgICAgICAgICAgdmFyIGluY2hlcyA9IHJlcG9zaXRvcnkuTmV3T2JqZWN0KFwiSW5jaGVzXCIsIFwiSW5jaFwiLCAyLjU0LCBjZW50aW1ldGVyLCBJbXBlcmlhbCk7XHJcbiAgICAgICAgICAgIHZhciBmZWV0ID0gcmVwb3NpdG9yeS5OZXdPYmplY3QoXCJGZWV0XCIsIFwiRm9vdFwiLCAxMiwgaW5jaGVzLCBJbXBlcmlhbCk7XHJcbiAgICAgICAgICAgIHZhciBtaWxlID0gcmVwb3NpdG9yeS5OZXdPYmplY3QoXCJNaWxlc1wiLCBcIk1pbGVcIiwgNTI4MCwgZmVldCwgSW1wZXJpYWwpO1xyXG4gICAgICAgICAgICB2YXIgbWV0ZXIgPSByZXBvc2l0b3J5Lk5ld09iamVjdChcIk1ldGVyc1wiLCBcIk1ldGVyXCIsIDEwMCwgY2VudGltZXRlciwgTWV0cmljKTtcclxuICAgICAgICAgICAgdmFyIGtpbG9NZXRlciA9IHJlcG9zaXRvcnkuTmV3T2JqZWN0KFwiS2lsb21ldGVyc1wiLCBcIktpbG9tZXRlclwiLCAxMDAwLCBtZXRlciwgTWV0cmljKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBuYW5vTWV0ZXIgPSByZXBvc2l0b3J5Lk5ld09iamVjdChcIk5hbm9tZXRlcnNcIiwgXCJOYW5vbWV0ZXJcIiwgMC4wMDAwMDAxLCBjZW50aW1ldGVyLCBNZXRyaWMpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGVhcnRoID0gcmVwb3NpdG9yeS5OZXdPYmplY3QoXCJFYXJ0aHNcIiwgXCJFYXJ0aFwiLCAyNTAwMCwgbWlsZSwgU3BhY2UpO1xyXG4gICAgICAgICAgICB2YXIgc3VuID0gcmVwb3NpdG9yeS5OZXdPYmplY3QoXCJTdW5zXCIsIFwiU3VuXCIsIDEwMywgZWFydGgsIFNwYWNlKTtcclxuICAgICAgICAgICAgdmFyIGRpc3QgPSByZXBvc2l0b3J5Lk5ld09iamVjdChcIkRpc3RhbmNlIGZyb20gRWFydGggdG8gU3VuXCIsIFwiRGlzdGFuY2UgZnJvbSBFYXJ0aCB0byBTdW5cIiwgOTI5NTU4MDcsIG1pbGUsIFNwYWNlKTtcclxuICAgICAgICAgICAgdmFyIGxpZ2h0eWVhciA9IHJlcG9zaXRvcnkuTmV3T2JqZWN0KFwiTGlnaHR5ZWFyc1wiLCBcIkxpZ2h0eWVhclwiLCA1ODc4NjI1MDAwMDAwLCBtaWxlLCBTcGFjZSk7XHJcblxyXG4gICAgICAgICAgICB2YXIgYWxwaGEgPSByZXBvc2l0b3J5Lk5ld09iamVjdChcIkRpc3RhbmNlIGZyb20gRWFydGggdG8gQWxwaGEgQ2VudGF1cmlcIiwgXCJEaXN0YW5jZSBmcm9tIEVhcnRoIHRvIEFscGhhIENlbnRhdXJpXCIsIDQuNCwgbGlnaHR5ZWFyLCBTcGFjZSk7XHJcbiAgICAgICAgICAgIHZhciBwaWNvID0gcmVwb3NpdG9yeS5OZXdPYmplY3QoXCJQaWNvbWV0ZXJzXCIsIFwiUGljb21ldGVyXCIsIDAuMDAxLCBuYW5vTWV0ZXIsIE1ldHJpYyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIE9iamVjdE1lYXN1cmVtZW50IE5ld09iamVjdEFjdGlvbihzdHJpbmcgcGx1cmFsTmFtZSwgc3RyaW5nIHNpbmdsZU5hbWUsIGRvdWJsZSB2YWx1ZSwgc3RyaW5nIG1lYXN1cmVtZW50U3RyLCBzdHJpbmcgcGFjaywgSU9iamVjdFJlcG9zaXRvcnkgcmVwb3NpdG9yeSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChtZWFzdXJlbWVudFN0ciAhPSBudWxsICYmIFN5c3RlbS5MaW5xLkVudW1lcmFibGUuQWxsPE9iamVjdE1lYXN1cmVtZW50PihyZXBvc2l0b3J5LkdldE9iamVjdE1lYXN1cmVtZW50cygpLChTeXN0ZW0uRnVuYzxPYmplY3RNZWFzdXJlbWVudCxib29sPikocCA9PiBwLlNpbmdsZU5hbWUgIT0gc2luZ2xlTmFtZSkpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbWVhc3VyZSA9IHJlcG9zaXRvcnkuR2V0T2JqZWN0TWVhc3VyZW1lbnQobWVhc3VyZW1lbnRTdHIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKG1lYXN1cmUgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgbmV3T2JqZWN0ID0gbmV3IE9iamVjdE1lYXN1cmVtZW50KHNpbmdsZU5hbWUsIHBsdXJhbE5hbWUpIHsgVmFsdWUgPSB2YWx1ZSwgT2JqZWN0UGFja05hbWUgPSBwYWNrIH07XHJcbiAgICAgICAgICAgICAgICAgICAgbWVhc3VyZS5BZGQobmV3T2JqZWN0KTtcclxuICAgICAgICAgICAgICAgICAgICByZXBvc2l0b3J5LkFkZE9iamVjdChuZXdPYmplY3QpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vcmVwb3NpdG9yeS5VcGRhdGVQYWNrKHBhY2ssIG5ld09iamVjdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ld09iamVjdDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIElMaXN0PE9iamVjdE1lYXN1cmVtZW50PiBTZXR1cFRyZWUoSUxpc3Q8T2JqZWN0TWVhc3VyZW1lbnQ+IGRhdGEpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3JlYWNoICh2YXIgb2JqZWN0TWVhc3VyZW1lbnQgaW4gZGF0YSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKG9iamVjdE1lYXN1cmVtZW50LlBhcmVudE1lYXN1cmVtZW50U2luZ2xlTmFtZSAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIG9iamVjdE1lYXN1cmVtZW50Lk1lYXN1cmVtZW50ID1cclxuU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5GaXJzdDxPYmplY3RNZWFzdXJlbWVudD4oICAgICAgICAgICAgICAgICAgICAgICAgZGF0YSwoU3lzdGVtLkZ1bmM8T2JqZWN0TWVhc3VyZW1lbnQsYm9vbD4pKHAgPT4gcC5TaW5nbGVOYW1lID09IG9iamVjdE1lYXN1cmVtZW50LlBhcmVudE1lYXN1cmVtZW50U2luZ2xlTmFtZSkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHZhciB0ID0gU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5XaGVyZTxPYmplY3RNZWFzdXJlbWVudD4oZGF0YSwoU3lzdGVtLkZ1bmM8T2JqZWN0TWVhc3VyZW1lbnQsYm9vbD4pKHAgPT4gcC5QYXJlbnRNZWFzdXJlbWVudFNpbmdsZU5hbWUgPT0gb2JqZWN0TWVhc3VyZW1lbnQuU2luZ2xlTmFtZSkpO1xyXG4gICAgICAgICAgICAgICAgb2JqZWN0TWVhc3VyZW1lbnQuT2JqZWN0TWVhc3VyZW1lbnRzID0gdC5Ub0xpc3QoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwidXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5UaHJlYWRpbmcuVGFza3M7XHJcbnVzaW5nIEJyaWRnZTtcclxudXNpbmcgQnJpZGdlLkh0bWw1O1xyXG5cclxubmFtZXNwYWNlIEhvd0Zhci5Db3JlLk1vZGVsc1xyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgQXBwTW9kZWwgOiBJQXBwXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIEFwcE1vZGVsKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNvbnZlcnRlciA9IG5ldyBNZWFzdXJlQ29udmVydGVycyhuZXcgT2JqZWN0UmVwb3NpdG9yeUNhY2hlKHRoaXMpKTtcclxuICAgICAgICAgICAgY29udmVydGVyLk9iamVjdE1lYXN1cmVtZW50cy5Gb3JFYWNoKChTeXN0ZW0uQWN0aW9uPE9iamVjdE1lYXN1cmVtZW50PikocCA9PlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBmcm9tU2VsZWN0LkFwcGVuZENoaWxkKG5ldyBIVE1MT3B0aW9uRWxlbWVudCgpIHsgVGV4dCA9IHAuUGx1cmFsTmFtZSB9KTtcclxuICAgICAgICAgICAgICAgIHRvU2VsZWN0LkFwcGVuZENoaWxkKG5ldyBIVE1MT3B0aW9uRWxlbWVudCgpIHsgVGV4dCA9IHAuUGx1cmFsTmFtZSB9KTtcclxuICAgICAgICAgICAgfSkpO1xyXG5cclxuICAgICAgICAgICAgZnJvbVNlbGVjdC5PbkNoYW5nZSA9IGUgPT4gQ29udmVydCgpO1xyXG4gICAgICAgICAgICB0b1NlbGVjdC5PbkNoYW5nZSA9IGUgPT4gQ29udmVydCgpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHJldmVyc2VidG4gIT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHJldmVyc2VidG4uT25DbGljayA9IGUgPT5cclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZiA9IGZyb21TZWxlY3QuU2VsZWN0ZWRJbmRleDtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdG8gPSB0b1NlbGVjdC5TZWxlY3RlZEluZGV4O1xyXG4gICAgICAgICAgICAgICAgICAgIGZyb21TZWxlY3QuU2VsZWN0ZWRJbmRleCA9IHRvO1xyXG4gICAgICAgICAgICAgICAgICAgIHRvU2VsZWN0LlNlbGVjdGVkSW5kZXggPSBmO1xyXG4gICAgICAgICAgICAgICAgICAgIFNjcmlwdC5DYWxsKFwidXBkYXRlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIENvbnZlcnQoKTtcclxuICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBudW0uT25LZXlEb3duID0gZSA9PiBDb252ZXJ0KCk7XHJcbiAgICAgICAgICAgIG51bS5Pbk1vdXNlVXAgPSBlID0+IENvbnZlcnQoKTtcclxuICAgICAgICAgICAgU2NyaXB0LkNhbGwoXCJjaG9vc2VcIik7XHJcbiAgICAgICAgICAgIENvbnZlcnQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgSFRNTFNlbGVjdEVsZW1lbnQgZnJvbVNlbGVjdCA9IERvY3VtZW50LkdldEVsZW1lbnRCeUlkPEhUTUxTZWxlY3RFbGVtZW50PihcImZyb21cIik7XHJcbiAgICAgICAgSFRNTFNlbGVjdEVsZW1lbnQgdG9TZWxlY3QgPSBEb2N1bWVudC5HZXRFbGVtZW50QnlJZDxIVE1MU2VsZWN0RWxlbWVudD4oXCJ0b1wiKTtcclxuICAgICAgICBIVE1MSW5wdXRFbGVtZW50IG51bSA9IERvY3VtZW50LkdldEVsZW1lbnRCeUlkPEhUTUxJbnB1dEVsZW1lbnQ+KFwibnVtXCIpO1xyXG5cclxuICAgICAgICBIVE1MRWxlbWVudCBhbnN3ZXIgPSBEb2N1bWVudC5HZXRFbGVtZW50QnlJZChcImFuc3dlclwiKTtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBIVE1MRWxlbWVudCByZXZlcnNlYnRuID0gRG9jdW1lbnQuR2V0RWxlbWVudEJ5SWQoXCJyZXZlcnNlXCIpO1xyXG5cclxuICAgICAgICBNZWFzdXJlQ29udmVydGVycyBjb252ZXJ0ZXI7XHJcbiAgICAgICAgdm9pZCBDb252ZXJ0KClcclxuICAgICAgICB7XHJcbmRvdWJsZSBuO1xuICAgICAgICAgICAgaWYgKGRvdWJsZS5UcnlQYXJzZShudW0uVmFsdWUsIG91dCBuKSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IGNvbnZlcnRlci5Db252ZXJ0KGZyb21TZWxlY3QuVmFsdWUsIHRvU2VsZWN0LlZhbHVlLCBuKTtcclxuXHJcbiAgICAgICAgICAgICAgICBhbnN3ZXIuVGV4dENvbnRlbnQgPSBzdHJpbmcuRm9ybWF0KFwiMSB7MH0gPSB7MX0gezJ9XCIsZnJvbVNlbGVjdC5WYWx1ZSxyZXN1bHQsdG9TZWxlY3QuVmFsdWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgSURpY3Rpb25hcnk8c3RyaW5nLCBvYmplY3Q+IFByb3BlcnRpZXMgeyBnZXQ7IHByaXZhdGUgc2V0OyB9XHJcbiAgICAgICAgcHVibGljIGFzeW5jIFRhc2sgU2F2ZVByb3BlcnRpZXNBc3luYygpXHJcbiAgICAgICAge1xyXG5cclxuICAgICAgICB9XHJcblxuXHJcblxyXG5cclxuXHJcbiAgICBcbnByaXZhdGUgSURpY3Rpb25hcnk8c3RyaW5nLCBvYmplY3Q+IF9fUHJvcGVydHlfX0luaXRpYWxpemVyX19Qcm9wZXJ0aWVzPW5ldyBEaWN0aW9uYXJ5PHN0cmluZywgb2JqZWN0PigpO31cclxufSIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5PYmplY3RNb2RlbDtcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcblxyXG5uYW1lc3BhY2UgSG93RmFyLkNvcmUuTW9kZWxzXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBNZWFzdXJlQ29udmVydGVycyA6IElNZWFzdXJlQ29udmVydGVyc1xyXG4gICAge1xyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgSU9iamVjdFJlcG9zaXRvcnkgX3JlcG9zaXRvcnk7XHJcbnB1YmxpYyBPYmplY3RNZWFzdXJlbWVudCBDZW50aW1ldGVyXHJcbntcclxuICAgIGdldFxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBGaW5kKFwiQ2VudGltZXRlclwiKTtcclxuICAgIH1cclxufSAgICAgICAgcHVibGljIE1lYXN1cmVDb252ZXJ0ZXJzKElPYmplY3RSZXBvc2l0b3J5IHJlcG9zaXRvcnkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBfcmVwb3NpdG9yeSA9IHJlcG9zaXRvcnk7XHJcbiAgICAgICAgICAgIFVwZGF0ZUxpc3QoKTtcclxuICAgICAgICB9XHJcblxyXG5cclxuXHJcbiNpZiBCUklER0VcclxuICAgICAgICBwcml2YXRlIHZvaWQgVXBkYXRlTGlzdCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBPYmplY3RNZWFzdXJlbWVudHMgPSBuZXcgTGlzdDxPYmplY3RNZWFzdXJlbWVudD4oU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5PcmRlckJ5PE9iamVjdE1lYXN1cmVtZW50LE9iamVjdE1lYXN1cmVtZW50PihHZXRBbGwoKSwoRnVuYzxPYmplY3RNZWFzdXJlbWVudCxPYmplY3RNZWFzdXJlbWVudD4pKHAgPT4gcCksIG5ldyBNZWFzdXJlbWVudENvbXBhcmUodGhpcykpKTtcclxuICAgICAgICAgICAgT2JqZWN0UGFja3MgPSBuZXcgTGlzdDxPYmplY3RQYWNrPihfcmVwb3NpdG9yeS5HZXRPYmplY3RQYWNrcygpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIExpc3Q8T2JqZWN0UGFjaz4gT2JqZWN0UGFja3MgeyBnZXQ7IHNldDsgfVxyXG4gICAgICAgIHB1YmxpYyBMaXN0PE9iamVjdE1lYXN1cmVtZW50PiBPYmplY3RNZWFzdXJlbWVudHMgeyBnZXQ7IHNldDsgfVxyXG5cclxuI2Vsc2VcclxuICAgICAgICBwcml2YXRlIHZvaWQgVXBkYXRlTGlzdCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBPYmplY3RNZWFzdXJlbWVudHMgPSBuZXcgT2JzZXJ2YWJsZUNvbGxlY3Rpb248T2JqZWN0TWVhc3VyZW1lbnQ+KEdldEFsbCgpLk9yZGVyQnkocCA9PiBwLCBuZXcgTWVhc3VyZW1lbnRDb21wYXJlKHRoaXMpKSk7XHJcbiAgICAgICAgICAgIE9iamVjdFBhY2tzID0gbmV3IE9ic2VydmFibGVDb2xsZWN0aW9uPE9iamVjdFBhY2s+KF9yZXBvc2l0b3J5LkdldE9iamVjdFBhY2tzKCkpO1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIE9ic2VydmFibGVDb2xsZWN0aW9uPE9iamVjdFBhY2s+IE9iamVjdFBhY2tzIHsgZ2V0OyBzZXQ7IH1cclxuICAgICAgICBwdWJsaWMgT2JzZXJ2YWJsZUNvbGxlY3Rpb248T2JqZWN0TWVhc3VyZW1lbnQ+IE9iamVjdE1lYXN1cmVtZW50cyB7IGdldDsgc2V0OyB9XHJcblxyXG4jZW5kaWZcclxuXHJcblxyXG4gICAgICAgIHB1YmxpYyBkb3VibGUgQ29udmVydChPYmplY3RNZWFzdXJlbWVudCBmcm9tTWVhc3VyZW1lbnQsIE9iamVjdE1lYXN1cmVtZW50IHRvLCBkb3VibGUgdmFsdWVGcm9tID0gMSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKGZyb21NZWFzdXJlbWVudCA9PSBudWxsKSB0aHJvdyBuZXcgQXJndW1lbnROdWxsRXhjZXB0aW9uKFwiJ2Zyb20nIGNhbm5vdCBiZSBudWxsXCIpO1xyXG4gICAgICAgICAgICBpZiAodG8gPT0gbnVsbCkgdGhyb3cgbmV3IEFyZ3VtZW50TnVsbEV4Y2VwdGlvbihcIid0bycgY2Fubm90IGJlIG51bGxcIik7XHJcbiAgICAgICAgICAgIHJldHVybiBDb252ZXJ0KGZyb21NZWFzdXJlbWVudC5QbHVyYWxOYW1lLCB0by5QbHVyYWxOYW1lLCB2YWx1ZUZyb20pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGRvdWJsZSBDb252ZXJ0KHN0cmluZyBuYW1lRnJvbSwgc3RyaW5nIG5hbWVUbywgZG91YmxlIHZhbHVlRnJvbSA9IDEpXHJcbiAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgdmFyIGZyb21NZWFzdXJlbWVudCA9IEZpbmQobmFtZUZyb20pO1xyXG4gICAgICAgICAgICB2YXIgdG8gPSBGaW5kKG5hbWVUbyk7XHJcbiAgICAgICAgICAgIGlmICh0byA9PSBmcm9tTWVhc3VyZW1lbnQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZUZyb207XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlRnJvbSAqIENhbGN1bGF0ZShmcm9tTWVhc3VyZW1lbnQsIHRvKSA/PyAwO1xyXG4gICAgICAgIH1cclxuICAgICAgIFxyXG4gICAgICAgIHByaXZhdGUgZG91YmxlPyBDYWxjdWxhdGUoT2JqZWN0TWVhc3VyZW1lbnQgZnJvbU1lYXN1cmVtZW50LCBPYmplY3RNZWFzdXJlbWVudCB0bywgZG91YmxlIHZhbHVlID0gMSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChmcm9tTWVhc3VyZW1lbnQuUGFyZW50TWVhc3VyZW1lbnRTaW5nbGVOYW1lICE9IG51bGwpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChmcm9tTWVhc3VyZW1lbnQuUGFyZW50TWVhc3VyZW1lbnRTaW5nbGVOYW1lID09IHRvLlNpbmdsZU5hbWUpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZyb21NZWFzdXJlbWVudC5WYWx1ZSAqIHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB1cCA9IENhbGN1bGF0ZShmcm9tTWVhc3VyZW1lbnQuTWVhc3VyZW1lbnQsIHRvLCBmcm9tTWVhc3VyZW1lbnQuVmFsdWUgKiB2YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHVwICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdXA7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIEdvRG93bihmcm9tTWVhc3VyZW1lbnQsIHRvLCB2YWx1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGRvdWJsZT8gR29Eb3duKE9iamVjdE1lYXN1cmVtZW50IGZyb21NZWFzdXJlbWVudCwgT2JqZWN0TWVhc3VyZW1lbnQgdG8sIGRvdWJsZSB2YWx1ZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBjaGlsZHJlbiA9IGZyb21NZWFzdXJlbWVudC5PYmplY3RNZWFzdXJlbWVudHM7XHJcbiAgICAgICAgICAgIC8vaWYgKGNoaWxkcmVuLkFueSgpICE9IHRydWUpXHJcbiAgICAgICAgICAgIC8ve1xyXG4gICAgICAgICAgICAvLyAgICBjaGlsZHJlbiA9IEZpbmQoZnJvbS5TaW5nbGVOYW1lKS5PYmplY3RNZWFzdXJlbWVudHM7XHJcbiAgICAgICAgICAgIC8vfVxyXG4gICAgICAgICAgICBmb3JlYWNoICh2YXIgb2JqZWN0TWVhc3VyZW1lbnQgaW4gY2hpbGRyZW4pXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChvYmplY3RNZWFzdXJlbWVudCA9PSB0bylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWUgLyB0by5WYWx1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZG93biA9IEdvRG93bihvYmplY3RNZWFzdXJlbWVudCwgdG8sIHZhbHVlIC8gb2JqZWN0TWVhc3VyZW1lbnQuVmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkb3duICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZG93bjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHByaXZhdGUgTGlzdDxPYmplY3RNZWFzdXJlbWVudD4gR2V0QWxsKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLlRvTGlzdDxPYmplY3RNZWFzdXJlbWVudD4oX3JlcG9zaXRvcnkuR2V0T2JqZWN0TWVhc3VyZW1lbnRzKCkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIE9iamVjdE1lYXN1cmVtZW50IEZpbmQoc3RyaW5nIG5hbWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gX3JlcG9zaXRvcnkuR2V0T2JqZWN0TWVhc3VyZW1lbnQobmFtZSk7XHJcbiAgICAgICAgICAgIC8vcmV0dXJuIEZpbmQoQ2VudGltZXRlciwgbmFtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG5cclxuICAgICAgICBwdWJsaWMgT2JqZWN0TWVhc3VyZW1lbnQgTmV3T2JqZWN0KHN0cmluZyBwbHVyYWxOYW1lLCBzdHJpbmcgc2luZ2xlTmFtZSwgZG91YmxlIHZhbHVlLCBzdHJpbmcgbWVhc3VyZW1lbnQsIHN0cmluZyBwYWNrID0gXCJDdXN0b21cIilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBtZWFzdXJlID0gRmluZChtZWFzdXJlbWVudCk7XHJcbiAgICAgICAgICAgIGlmIChtZWFzdXJlICE9IG51bGwpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciBuZXdPYmplY3QgPSBuZXcgT2JqZWN0TWVhc3VyZW1lbnQoc2luZ2xlTmFtZSwgcGx1cmFsTmFtZSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBWYWx1ZSA9IHZhbHVlLFxyXG4gICAgICAgICAgICAgICAgICAgIE9iamVjdFBhY2tOYW1lID0gcGFjayxcclxuICAgICAgICAgICAgICAgICAgICBQYXJlbnRNZWFzdXJlbWVudFNpbmdsZU5hbWUgPSBtZWFzdXJlLlNpbmdsZU5hbWVcclxuXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgX3JlcG9zaXRvcnkuQWRkT2JqZWN0KG5ld09iamVjdCk7XHJcbiAgICAgICAgICAgICAgICBVcGRhdGVMaXN0KCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3T2JqZWN0O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIERlbGV0ZVBhY2soT2JqZWN0UGFjayBwYWNrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgX3JlcG9zaXRvcnkuUmVtb3ZlUGFjayhwYWNrKTtcclxuICAgICAgICAgICAgVXBkYXRlTGlzdCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgRGVsZXRlT2JqZWN0KE9iamVjdE1lYXN1cmVtZW50IHNlbGVjdGVkT2JqZWN0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgX3JlcG9zaXRvcnkuUmVtb3ZlT2JqZWN0KHNlbGVjdGVkT2JqZWN0KTtcclxuICAgICAgICAgICAgdGhpcy5VcGRhdGVMaXN0KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBVcGRhdGVPYmplY3QoT2JqZWN0TWVhc3VyZW1lbnQgc2VsZWN0ZWRPYmplY3QpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBfcmVwb3NpdG9yeS5VcGRhdGVPYmplY3Qoc2VsZWN0ZWRPYmplY3QpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIFVwZGF0ZVBhY2soc3RyaW5nIHBhY2ssIE9iamVjdE1lYXN1cmVtZW50IG5ld09iamVjdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBwYWNrcyA9IFN5c3RlbS5MaW5xLkVudW1lcmFibGUuRmlyc3RPckRlZmF1bHQ8T2JqZWN0UGFjaz4oT2JqZWN0UGFja3MsKEZ1bmM8T2JqZWN0UGFjayxib29sPikocCA9PiBwLlBhY2tOYW1lID09IHBhY2spKTtcclxuICAgICAgICAgICAgaWYgKHBhY2tzICE9IG51bGwpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHBhY2tzLk9iamVjdE1lYXN1cmVtZW50cy5BZGQobmV3T2JqZWN0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBJbnZhbGlkT3BlcmF0aW9uRXhjZXB0aW9uKHN0cmluZy5Gb3JtYXQoXCJwYWNrYWdlICd7MH0nIG11c3QgZXhpc3QgZmlyc3RcIixwYWNrKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBjb25zdCBzdHJpbmcgUHJvcGVydHlLZXkgPSBcIkNvbnZlcnNpb25zXCI7XHJcblxyXG5cclxuICAgICAgICBwdWJsaWMgT2JqZWN0TWVhc3VyZW1lbnQgTmV3T2JqZWN0KHN0cmluZyBwbHVyYWxOYW1lLCBzdHJpbmcgc2luZ2xlTmFtZSxcclxuICAgICAgICAgICAgZG91YmxlIHZhbHVlLCBPYmplY3RNZWFzdXJlbWVudCBtZWFzdXJlbWVudCwgc3RyaW5nIHBhY2sgPSBcIkN1c3RvbVwiKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIE5ld09iamVjdChwbHVyYWxOYW1lLCBzaW5nbGVOYW1lLCB2YWx1ZSwgbWVhc3VyZW1lbnQuUGx1cmFsTmFtZSwgcGFjayk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBOZXdQYWNrKE9iamVjdFBhY2sgcGFjaylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuX3JlcG9zaXRvcnkuQWRkUGFjayhwYWNrKTtcclxuICAgICAgICAgICAgdGhpcy5VcGRhdGVMaXN0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwidXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5Db21wb25lbnRNb2RlbC5EYXRhQW5ub3RhdGlvbnM7XHJcbnVzaW5nIFN5c3RlbS5Db21wb25lbnRNb2RlbC5EYXRhQW5ub3RhdGlvbnMuU2NoZW1hO1xyXG5cclxubmFtZXNwYWNlIEhvd0Zhci5Db3JlLk1vZGVsc1xyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgT2JqZWN0TWVhc3VyZW1lbnQgOiBCaW5kYWJsZUJhc2UsIElPYmplY3RNZWFzdXJlbWVudFxyXG4gICAge1xyXG4gICAgICAgIHByaXZhdGUgZG91YmxlIF92YWx1ZTtcclxuICAgICAgICBwcml2YXRlIHN0cmluZyBfaW1hZ2U7XHJcbiAgICAgICAgcHJpdmF0ZSBzdHJpbmcgX3BsdXJhbE5hbWU7XHJcbiAgICAgICAgcHJpdmF0ZSBMaXN0PE9iamVjdE1lYXN1cmVtZW50PiBfb2JqZWN0TWVhc3VyZW1lbnRzO1xyXG4gICAgICAgIHByaXZhdGUgc3RyaW5nIF9zaW5nbGVOYW1lO1xyXG4gICAgICAgIHByaXZhdGUgT2JqZWN0UGFjayBfb2JqZWN0UGFjaztcclxuICAgICAgICBwcml2YXRlIHN0cmluZyBfb2JqZWN0UGFja05hbWU7XHJcbiAgICAgICAgcHJpdmF0ZSBPYmplY3RNZWFzdXJlbWVudCBfbWVhc3VyZW1lbnQ7XHJcbiAgICAgICAgcHJpdmF0ZSBzdHJpbmcgX3BhcmVudE1lYXN1cmVtZW50U2luZ2xlTmFtZTtcclxuXHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIHN0cmluZyBUb1N0cmluZygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gTWVhc3VyZW1lbnQgIT0gbnVsbCA/IHN0cmluZy5Gb3JtYXQoXCJ7MH06IHsxfSB7Mn1cIixTaW5nbGVOYW1lLFZhbHVlLE1lYXN1cmVtZW50LlBsdXJhbE5hbWUpOiBzdHJpbmcuRm9ybWF0KFwiezB9IHsxfVwiLFZhbHVlLFBsdXJhbE5hbWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgW0ZvcmVpZ25LZXkoXCJNZWFzdXJlbWVudFwiKV1cclxuICAgICAgICBwdWJsaWMgc3RyaW5nIFBhcmVudE1lYXN1cmVtZW50U2luZ2xlTmFtZVxyXG57XHJcbiAgICBnZXRcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gX3BhcmVudE1lYXN1cmVtZW50U2luZ2xlTmFtZTtcclxuICAgIH1cclxuXHJcbiAgICBcclxuICAgIHNldFxyXG4gICAge1xyXG4gICAgICAgIFNldFByb3BlcnR5PHN0cmluZz4ocmVmIF9wYXJlbnRNZWFzdXJlbWVudFNpbmdsZU5hbWUsIHZhbHVlKTtcclxuICAgIH1cclxuICAgIFxyXG59XHJcbiAgICAgICAgcHVibGljIHZpcnR1YWwgT2JqZWN0TWVhc3VyZW1lbnQgTWVhc3VyZW1lbnRcclxue1xyXG4gICAgZ2V0XHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIF9tZWFzdXJlbWVudDtcclxuICAgIH1cclxuXHJcbiAgICBcclxuICAgIHNldFxyXG4gICAge1xyXG4gICAgICAgIFNldFByb3BlcnR5PE9iamVjdE1lYXN1cmVtZW50PihyZWYgX21lYXN1cmVtZW50LCB2YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBcclxufVxyXG4gICAgICAgIHB1YmxpYyBkb3VibGUgVmFsdWVcclxue1xyXG4gICAgZ2V0XHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIF92YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBcclxuICAgIHNldFxyXG4gICAge1xyXG4gICAgICAgIFNldFByb3BlcnR5PGRvdWJsZT4ocmVmIF92YWx1ZSwgdmFsdWUpO1xyXG4gICAgfVxyXG4gICAgXHJcbn1cclxuICAgICAgICBwdWJsaWMgc3RyaW5nIEltYWdlXHJcbntcclxuICAgIGdldFxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBfaW1hZ2U7XHJcbiAgICB9XHJcblxyXG4gICAgXHJcbiAgICBzZXRcclxuICAgIHtcclxuICAgICAgICBTZXRQcm9wZXJ0eTxzdHJpbmc+KHJlZiBfaW1hZ2UsIHZhbHVlKTtcclxuICAgIH1cclxuICAgIFxyXG59XHJcbiAgICAgICAgcHVibGljIHN0cmluZyBQbHVyYWxOYW1lXHJcbntcclxuICAgIGdldFxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBfcGx1cmFsTmFtZTtcclxuICAgIH1cclxuXHJcbiAgICBcclxuICAgIHNldFxyXG4gICAge1xyXG4gICAgICAgIFNldFByb3BlcnR5PHN0cmluZz4ocmVmIF9wbHVyYWxOYW1lLCB2YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBcclxufVxyXG4gICAgICAgIHB1YmxpYyBPYmplY3RNZWFzdXJlbWVudCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBPYmplY3RNZWFzdXJlbWVudHMgPSBuZXcgTGlzdDxPYmplY3RNZWFzdXJlbWVudD4oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIE9iamVjdE1lYXN1cmVtZW50KHN0cmluZyBzaW5nbGVOYW1lLCBzdHJpbmcgcGx1cmFsTmFtZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFNpbmdsZU5hbWUgPSBzaW5nbGVOYW1lO1xyXG4gICAgICAgICAgICBQbHVyYWxOYW1lID0gcGx1cmFsTmFtZTtcclxuICAgICAgICAgICAgT2JqZWN0TWVhc3VyZW1lbnRzID0gbmV3IExpc3Q8T2JqZWN0TWVhc3VyZW1lbnQ+KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL3B1YmxpYyBJRW51bWVyYWJsZTxPYmplY3RNZWFzdXJlbWVudD4gR2V0Q2hpbGRyZW4oKVxyXG4gICAgICAgIC8ve1xyXG4gICAgICAgIC8vICAgIHJldHVybiBPYmplY3RNZWFzdXJlbWVudHM7XHJcbiAgICAgICAgLy99XHJcbiAgICAgICAgcHVibGljIHZvaWQgQWRkKE9iamVjdE1lYXN1cmVtZW50IG9iailcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG9iai5NZWFzdXJlbWVudCA9IHRoaXM7XHJcbiAgICAgICAgICAgIE9iamVjdE1lYXN1cmVtZW50cy5BZGQob2JqKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2aXJ0dWFsIExpc3Q8T2JqZWN0TWVhc3VyZW1lbnQ+IE9iamVjdE1lYXN1cmVtZW50c1xyXG57XHJcbiAgICBnZXRcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gX29iamVjdE1lYXN1cmVtZW50cztcclxuICAgIH1cclxuXHJcbiAgICBcclxuICAgIHNldFxyXG4gICAge1xyXG4gICAgICAgIFNldFByb3BlcnR5PExpc3Q8T2JqZWN0TWVhc3VyZW1lbnQ+PihyZWYgX29iamVjdE1lYXN1cmVtZW50cywgdmFsdWUpO1xyXG4gICAgfVxyXG4gICAgXHJcbn1cclxuICAgICAgICBwdWJsaWMgc3RyaW5nIFNpbmdsZU5hbWVcclxue1xyXG4gICAgZ2V0XHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIF9zaW5nbGVOYW1lO1xyXG4gICAgfVxyXG5cclxuICAgIFxyXG4gICAgc2V0XHJcbiAgICB7XHJcbiAgICAgICAgU2V0UHJvcGVydHk8c3RyaW5nPihyZWYgX3NpbmdsZU5hbWUsIHZhbHVlKTtcclxuICAgIH1cclxuICAgIFxyXG59XHJcbiAgICAgICAgcHVibGljIE9iamVjdFBhY2sgT2JqZWN0UGFja1xyXG57XHJcbiAgICBnZXRcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gX29iamVjdFBhY2s7XHJcbiAgICB9XHJcblxyXG4gICAgXHJcbiAgICBzZXRcclxuICAgIHtcclxuICAgICAgICBTZXRQcm9wZXJ0eTxPYmplY3RQYWNrPihyZWYgX29iamVjdFBhY2ssIHZhbHVlKTtcclxuICAgIH1cclxuICAgIFxyXG59XHJcbiAgICAgICAgcHVibGljIHN0cmluZyBPYmplY3RQYWNrTmFtZVxyXG57XHJcbiAgICBnZXRcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gX29iamVjdFBhY2tOYW1lO1xyXG4gICAgfVxyXG5cclxuICAgIFxyXG4gICAgc2V0XHJcbiAgICB7XHJcbiAgICAgICAgU2V0UHJvcGVydHk8c3RyaW5nPihyZWYgX29iamVjdFBhY2tOYW1lLCB2YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBcclxufSAgICB9XHJcbn0iLCJ1c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLk9iamVjdE1vZGVsO1xyXG5cclxubmFtZXNwYWNlIEhvd0Zhci5Db3JlLk1vZGVsc1xyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgT2JqZWN0UGFjayA6IEJpbmRhYmxlQmFzZVxyXG4gICAge1xyXG4gICAgICAgIHByaXZhdGUgc3RyaW5nIF9wYWNrTmFtZTtcclxuICAgICAgICBwcml2YXRlIHN0cmluZyBfZGVzY3JpcHRpb247XHJcbiAgICAgICAgcHJpdmF0ZSBzdHJpbmcgX3BhY2tJbWFnZTtcclxuXHJcbiNpZiBCUklER0VcclxuICAgICAgICBwdWJsaWMgdmlydHVhbCBMaXN0PE9iamVjdE1lYXN1cmVtZW50PiBPYmplY3RNZWFzdXJlbWVudHMgeyBnZXQ7IHNldDsgfVxyXG4jZWxzZVxyXG4gICAgICAgIHB1YmxpYyB2aXJ0dWFsIE9ic2VydmFibGVDb2xsZWN0aW9uPE9iamVjdE1lYXN1cmVtZW50PiBPYmplY3RNZWFzdXJlbWVudHMgeyBnZXQ7IHNldDsgfSA9IG5ldyBPYnNlcnZhYmxlQ29sbGVjdGlvbjxPYmplY3RNZWFzdXJlbWVudD4oKTtcclxuXHJcbiNlbmRpZlxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSBzdHJpbmcgVG9TdHJpbmcoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIFBhY2tOYW1lO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0cmluZyBQYWNrTmFtZVxyXG57XHJcbiAgICBnZXRcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gX3BhY2tOYW1lO1xyXG4gICAgfVxyXG5cclxuICAgIFxyXG4gICAgc2V0XHJcbiAgICB7XHJcbiAgICAgICAgU2V0UHJvcGVydHk8c3RyaW5nPihyZWYgX3BhY2tOYW1lLCB2YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBcclxufXB1YmxpYyBzdHJpbmcgTmFtZVxyXG57XHJcbiAgICBnZXRcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gUGFja05hbWU7XHJcbiAgICB9XHJcbn1wdWJsaWMgc3RyaW5nIEltYWdlVVJMXHJcbntcclxuICAgIGdldFxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBQYWNrSW1hZ2U7XHJcbiAgICB9XHJcbn1cclxuICAgICAgICBwdWJsaWMgc3RyaW5nIERlc2NyaXB0aW9uXHJcbntcclxuICAgIGdldFxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBfZGVzY3JpcHRpb247XHJcbiAgICB9XHJcblxyXG4gICAgXHJcbiAgICBzZXRcclxuICAgIHtcclxuICAgICAgICBTZXRQcm9wZXJ0eTxzdHJpbmc+KHJlZiBfZGVzY3JpcHRpb24sIHZhbHVlKTtcclxuICAgIH1cclxuICAgIFxyXG59XHJcbiAgICAgICAgcHVibGljIHN0cmluZyBQYWNrSW1hZ2Vcclxue1xyXG4gICAgZ2V0XHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIF9wYWNrSW1hZ2U7XHJcbiAgICB9XHJcblxyXG4gICAgXHJcbiAgICBzZXRcclxuICAgIHtcclxuICAgICAgICBTZXRQcm9wZXJ0eTxzdHJpbmc+KHJlZiBfcGFja0ltYWdlLCB2YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBcclxufVxyXG4gICAgICAgIHB1YmxpYyBPYmplY3RQYWNrKClcclxuICAgICAgICB7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgT2JqZWN0UGFjayhzdHJpbmcgbmFtZSxzdHJpbmcgZGVzY3JpcHRpb24pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBQYWNrTmFtZSA9IG5hbWU7XHJcbiAgICAgICAgICAgIERlc2NyaXB0aW9uID0gZGVzY3JpcHRpb247XHJcbiAgICAgICAgICAgIFBhY2tJbWFnZSA9IFwiaHR0cHM6Ly92aWEucGxhY2Vob2xkZXIuY29tLzE1MFwiO1xyXG4gICAgICAgIH1cclxuXG4gICAgXG5wcml2YXRlIExpc3Q8T2JqZWN0TWVhc3VyZW1lbnQ+IF9fUHJvcGVydHlfX0luaXRpYWxpemVyX19PYmplY3RNZWFzdXJlbWVudHM9bmV3IExpc3Q8T2JqZWN0TWVhc3VyZW1lbnQ+KCk7fVxyXG59IiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcblxyXG5uYW1lc3BhY2UgSG93RmFyLkNvcmUuTW9kZWxzXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBPYmplY3RSZXBvc2l0b3J5Q2FjaGUgOiBJT2JqZWN0UmVwb3NpdG9yeVxyXG4gICAge1xyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgSUFwcCBfYXBwO1xyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgTGlzdDxPYmplY3RNZWFzdXJlbWVudD4gbWVhc3VyZW1lbnRzO1xyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgTGlzdDxPYmplY3RQYWNrPiBwYWNrcztcclxuXHJcbiAgICAgICAgVCBHZXRLZXk8VD4oc3RyaW5nIGtleSlcclxuICAgICAgICB7XHJcblQgZGF0YTsgICAgICAgICAgICBpZiAoX2FwcC5Qcm9wZXJ0aWVzLkNvbnRhaW5zS2V5KGtleSkgJiYgKGRhdGEgPSBfYXBwLlByb3BlcnRpZXNba2V5XSBhcyBUKSAhPSBudWxsKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZGF0YTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gZGVmYXVsdChUKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBPYmplY3RSZXBvc2l0b3J5Q2FjaGUoSUFwcCBhcHApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBfYXBwID0gYXBwO1xyXG4gICAgICAgICAgICBtZWFzdXJlbWVudHMgPSBHZXRLZXk8TGlzdDxPYmplY3RNZWFzdXJlbWVudD4+KE9iamVjdEtleSkgPz8gbmV3IExpc3Q8T2JqZWN0TWVhc3VyZW1lbnQ+KCk7XHJcbiAgICAgICAgICAgIHBhY2tzID0gR2V0S2V5PExpc3Q8T2JqZWN0UGFjaz4+KFBhY2tLZXkpID8/IG5ldyBMaXN0PE9iamVjdFBhY2s+KCk7XHJcbiAgICAgICAgICAgIE9iamVjdFJlcG9zaXRvcnlTZWVkZXIuU3RhcnR1cCh0aGlzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIHZvaWQgRGlzcG9zZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdm9pZCBJbnNlcnRLZXkoc3RyaW5nIGtleSwgb2JqZWN0IGRhdGEpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoX2FwcC5Qcm9wZXJ0aWVzLkNvbnRhaW5zS2V5KGtleSkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIF9hcHAuUHJvcGVydGllc1trZXldID0gZGF0YTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIF9hcHAuUHJvcGVydGllcy5BZGQoa2V5LGRhdGEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGFzeW5jIHZvaWQgU2F2ZUNoYW5nZXMoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgSW5zZXJ0S2V5KE9iamVjdEtleSwgbWVhc3VyZW1lbnRzKTtcclxuICAgICAgICAgICAgSW5zZXJ0S2V5KFBhY2tLZXksIHBhY2tzKTtcclxuICAgICAgICAgICAgYXdhaXQgX2FwcC5TYXZlUHJvcGVydGllc0FzeW5jKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgXHJcbiAgICAgICAgcHVibGljIE9iamVjdE1lYXN1cmVtZW50IEdldE9iamVjdE1lYXN1cmVtZW50KHN0cmluZyBuYW1lKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIGRhdGEgPSBHZXRPYmplY3RNZWFzdXJlbWVudHMoKTtcclxuICAgICAgICAgICAgcmV0dXJuIFN5c3RlbS5MaW5xLkVudW1lcmFibGUuRmlyc3RPckRlZmF1bHQ8T2JqZWN0TWVhc3VyZW1lbnQ+KGRhdGEsKEZ1bmM8T2JqZWN0TWVhc3VyZW1lbnQsYm9vbD4pKHAgPT4gcC5TaW5nbGVOYW1lLlRvTG93ZXIoKSA9PSBuYW1lLlRvTG93ZXIoKSB8fCBwLlBsdXJhbE5hbWUuVG9Mb3dlcigpID09IG5hbWUuVG9Mb3dlcigpKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgY29uc3Qgc3RyaW5nIE9iamVjdEtleSA9IFwiT2JqZWN0TWVhc3VyZW1lbnRzXCI7XHJcbiAgICAgICAgcHVibGljIGNvbnN0IHN0cmluZyBQYWNrS2V5ID0gXCJPYmplY3RQYWNrc1wiO1xyXG4gICAgICAgIHB1YmxpYyBJRW51bWVyYWJsZTxPYmplY3RNZWFzdXJlbWVudD4gR2V0T2JqZWN0TWVhc3VyZW1lbnRzKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBPYmplY3RSZXBvc2l0b3J5U2VlZGVyLlNldHVwVHJlZShtZWFzdXJlbWVudHMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgdm9pZCBBZGRPYmplY3QoT2JqZWN0TWVhc3VyZW1lbnQgbWVhc3VyZW1lbnQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAobWVhc3VyZW1lbnQuT2JqZWN0UGFja05hbWU9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEludmFsaWRPcGVyYXRpb25FeGNlcHRpb24oXCJtdXN0IGhhdmUgYSBwYWNrIG5hbWVcIik7XHJcblxyXG4gICAgICAgICAgICBpZiAobWVhc3VyZW1lbnQuUGFyZW50TWVhc3VyZW1lbnRTaW5nbGVOYW1lID09IG51bGwgJiYgbWVhc3VyZW1lbnQuTWVhc3VyZW1lbnQgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgIG1lYXN1cmVtZW50LlBhcmVudE1lYXN1cmVtZW50U2luZ2xlTmFtZSA9IG1lYXN1cmVtZW50Lk1lYXN1cmVtZW50LlNpbmdsZU5hbWU7XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKG1lYXN1cmVtZW50LlBhcmVudE1lYXN1cmVtZW50U2luZ2xlTmFtZSAhPSBudWxsICYmIG1lYXN1cmVtZW50Lk1lYXN1cmVtZW50ID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICBtZWFzdXJlbWVudC5NZWFzdXJlbWVudCA9XHJcblN5c3RlbS5MaW5xLkVudW1lcmFibGUuRmlyc3RPckRlZmF1bHQ8T2JqZWN0TWVhc3VyZW1lbnQ+KCAgICAgICAgICAgICAgICAgICAgbWVhc3VyZW1lbnRzLChGdW5jPE9iamVjdE1lYXN1cmVtZW50LGJvb2w+KShwID0+IHAuU2luZ2xlTmFtZSA9PSBtZWFzdXJlbWVudC5QYXJlbnRNZWFzdXJlbWVudFNpbmdsZU5hbWUpKTtcclxuICAgICAgICAgICAgaWYgKG1lYXN1cmVtZW50Lk9iamVjdFBhY2tOYW1lID09IG51bGwgJiYgbWVhc3VyZW1lbnQuT2JqZWN0UGFjayAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgbWVhc3VyZW1lbnQuT2JqZWN0UGFja05hbWUgPSBtZWFzdXJlbWVudC5PYmplY3RQYWNrLlBhY2tOYW1lO1xyXG4gICAgICAgICAgICBlbHNlIGlmIChtZWFzdXJlbWVudC5PYmplY3RQYWNrTmFtZSAhPSBudWxsICYmIG1lYXN1cmVtZW50Lk9iamVjdFBhY2sgPT0gbnVsbClcclxuICAgICAgICAgICAgICAgIG1lYXN1cmVtZW50Lk9iamVjdFBhY2sgPSBTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLkZpcnN0T3JEZWZhdWx0PE9iamVjdFBhY2s+KHBhY2tzLChGdW5jPE9iamVjdFBhY2ssYm9vbD4pKHAgPT4gcC5QYWNrTmFtZSA9PSBtZWFzdXJlbWVudC5PYmplY3RQYWNrTmFtZSkpO1xyXG5cclxuICAgICAgICAgICAgdmFyIHBhY2sgPSBTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLkZpcnN0PE9iamVjdFBhY2s+KHBhY2tzLChGdW5jPE9iamVjdFBhY2ssYm9vbD4pKHAgPT4gcC5QYWNrTmFtZSA9PSBtZWFzdXJlbWVudC5PYmplY3RQYWNrTmFtZSkpO1xyXG4gICAgICAgICAgICBpZiAoU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5Bbnk8T2JqZWN0TWVhc3VyZW1lbnQ+KHBhY2suT2JqZWN0TWVhc3VyZW1lbnRzLChGdW5jPE9iamVjdE1lYXN1cmVtZW50LGJvb2w+KShwID0+IHAuU2luZ2xlTmFtZSA9PSBtZWFzdXJlbWVudC5TaW5nbGVOYW1lKSkgIT0gdHJ1ZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcGFjay5PYmplY3RNZWFzdXJlbWVudHMuQWRkKG1lYXN1cmVtZW50KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbWVhc3VyZW1lbnRzLkFkZChtZWFzdXJlbWVudCk7XHJcbiAgICAgICAgICAgIFNhdmVDaGFuZ2VzKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBSZW1vdmVPYmplY3QoT2JqZWN0TWVhc3VyZW1lbnQgbWVhc3VyZW1lbnQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBtZWFzdXJlbWVudHMuUmVtb3ZlKG1lYXN1cmVtZW50KTtcclxuICAgICAgICAgICAgU2F2ZUNoYW5nZXMoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBJRW51bWVyYWJsZTxPYmplY3RQYWNrPiBHZXRPYmplY3RQYWNrcygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gcGFja3M7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBBZGRQYWNrKE9iamVjdFBhY2sgcGFjaylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHBhY2tzLkFkZChwYWNrKTtcclxuICAgICAgICAgICAgU2F2ZUNoYW5nZXMoKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBSZW1vdmVQYWNrKE9iamVjdFBhY2sgcGFjaylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHBhY2tzLlJlbW92ZShwYWNrKTtcclxuICAgICAgICAgICAgU2F2ZUNoYW5nZXMoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFVwZGF0ZU9iamVjdChPYmplY3RNZWFzdXJlbWVudCBzZWxlY3RlZE9iamVjdClcclxuICAgICAgICB7XHJcblxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHB1YmxpYyBPYmplY3RNZWFzdXJlbWVudCBOZXdPYmplY3Qoc3RyaW5nIHBsdXJhbCwgc3RyaW5nIHNpbmdsZSwgZG91YmxlIHZhbHVlLCBPYmplY3RNZWFzdXJlbWVudCBwYXJlbnQsIHN0cmluZyBwYWNrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdFJlcG9zaXRvcnlTZWVkZXIuTmV3T2JqZWN0QWN0aW9uKHBsdXJhbCwgc2luZ2xlLCB2YWx1ZSwgcGFyZW50LlNpbmdsZU5hbWUsIHBhY2ssIHRoaXMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsInVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG5cclxubmFtZXNwYWNlIEhvd0Zhci5Db3JlLk1vZGVsc1xyXG57XHJcbiAgICBpbnRlcm5hbCBjbGFzcyBNZWFzdXJlbWVudENvbXBhcmUgOiBJQ29tcGFyZXI8T2JqZWN0TWVhc3VyZW1lbnQ+XHJcbiAgICB7XHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBJTWVhc3VyZUNvbnZlcnRlcnMgX2NvbnZlcnRlcnM7XHJcblxyXG4gICAgICAgIHB1YmxpYyBNZWFzdXJlbWVudENvbXBhcmUoSU1lYXN1cmVDb252ZXJ0ZXJzIGNvbnZlcnRlcnMpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBfY29udmVydGVycyA9IGNvbnZlcnRlcnM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBpbnQgQ29tcGFyZShPYmplY3RNZWFzdXJlbWVudCB4LCBPYmplY3RNZWFzdXJlbWVudCB5KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIHh0b3kgPSBfY29udmVydGVycy5Db252ZXJ0KHgsIHkpO1xyXG4gICAgICAgICAgICBpZiAoeHRveSA+IDEpIHJldHVybiAxO1xyXG4gICAgICAgICAgICByZXR1cm4gLTE7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59Il0KfQo=

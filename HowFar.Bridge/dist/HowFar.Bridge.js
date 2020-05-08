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

        },
        statics: {
            methods: {
                NumberFormat: function (x) {
                    return numberWithCommas(x);
                }
            }
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

    Bridge.define("HowFar.Core.Models.AddModel", {
        fields: {
            name: null,
            quantity: null,
            unit: null,
            btn: null
        },
        ctors: {
            ctor: function (converters, onAdd) {
                this.$initialize();
                this.name = document.getElementById("add_name");
                this.quantity = document.getElementById("add_num");
                this.unit = document.getElementById("add_unit");
                this.btn = document.getElementById("add_btn");

                converters.HowFar$Core$Models$IMeasureConverters$ObjectMeasurements.ForEach(Bridge.fn.bind(this, function (p) {
                    var $t;
                    this.unit.appendChild(($t = document.createElement("option"), $t.text = p.PluralName, $t));
                }));
                update();
                this.btn.onclick = Bridge.fn.bind(this, function (e) {
                    var result = converters.HowFar$Core$Models$IMeasureConverters$NewObject$1(this.name.value, this.name.value, this.quantity.valueAsNumber, this.unit.value, "Custom");
                    this.name.value = "";
                    this.quantity.value = "";

                    onAdd(result);
                });
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

    Bridge.define("HowFar.Core.Models.IProperties", {
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
                    repository.HowFar$Core$Models$IObjectRepository$ShouldSave = false;
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

                    repository.HowFar$Core$Models$IObjectRepository$ShouldSave = true;
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
            randombtn: null,
            random: null,
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
                this.randombtn = document.getElementById("random");
                this.random = new System.Random.ctor();
                this.Properties = new HowFar.Core.Models.Properties();
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

                if (this.randombtn != null) {
                    this.randombtn.onclick = Bridge.fn.bind(this, function (e) {
                        this.Random();
                    });
                }

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
                this.Random();
                var add = new HowFar.Core.Models.AddModel(this.converter, Bridge.fn.bind(this, function (p) {
                    var $t;
                    var f = ($t = document.createElement("option"), $t.text = p.PluralName, $t);
                    this.fromSelect.appendChild(f);
                    this.toSelect.appendChild(($t = document.createElement("option"), $t.text = p.PluralName, $t));

                    this.fromSelect.selectedIndex = f.index;
                    update();
                    this.Convert();
                }));
            }
        },
        methods: {
            Random: function () {
                var count = this.fromSelect.options.length;

                this.fromSelect.selectedIndex = this.random.Next$2(0, ((count - 1) | 0));
                this.toSelect.selectedIndex = this.random.Next$2(0, ((count - 1) | 0));
                update();
                this.Convert();
            },
            Convert: function () {
                var n = { };
                if (System.Double.tryParse(this.num.value, null, n)) {
                    var result = this.converter.Convert$1(this.fromSelect.value, this.toSelect.value, n.v);

                    this.answer.textContent = System.String.format("1 {0} = {1} {2}", this.fromSelect.value, HowFar.Bridge.App.NumberFormat(result), this.toSelect.value);
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
            packs: null,
            ShouldSave: false
        },
        alias: [
            "Dispose", "System$IDisposable$Dispose",
            "ShouldSave", "HowFar$Core$Models$IObjectRepository$ShouldSave",
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
            init: function () {
                this.ShouldSave = true;
            },
            ctor: function (app) {
                this.$initialize();
                this._app = app;
                this.measurements = this.GetKey(System.Collections.Generic.List$1(HowFar.Core.Models.ObjectMeasurement), HowFar.Core.Models.ObjectRepositoryCache.ObjectKey) || new (System.Collections.Generic.List$1(HowFar.Core.Models.ObjectMeasurement)).ctor();
                this.packs = this.GetKey(System.Collections.Generic.List$1(HowFar.Core.Models.ObjectPack), HowFar.Core.Models.ObjectRepositoryCache.PackKey) || new (System.Collections.Generic.List$1(HowFar.Core.Models.ObjectPack)).ctor();
                if (!System.Linq.Enumerable.from(this.measurements, HowFar.Core.Models.ObjectMeasurement).any()) {
                    HowFar.Core.Models.ObjectRepositorySeeder.Startup(this);
                }
            }
        },
        methods: {
            GetKey: function (T, key) {
                if (this._app.HowFar$Core$Models$IApp$Properties.HowFar$Core$Models$IProperties$ContainsKey(key)) {
                    return this._app.HowFar$Core$Models$IApp$Properties.HowFar$Core$Models$IProperties$Get(T, key);
                }
                return null;
            },
            Dispose: function () { },
            InsertKey: function (key, data) {
                if (this._app.HowFar$Core$Models$IApp$Properties.HowFar$Core$Models$IProperties$ContainsKey(key)) {
                    this._app.HowFar$Core$Models$IApp$Properties.HowFar$Core$Models$IProperties$Set(key, data);
                } else {
                    this._app.HowFar$Core$Models$IApp$Properties.HowFar$Core$Models$IProperties$Add(key, data);
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
                                    if (!this.ShouldSave) {
                                        return;
                                    }

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

    Bridge.define("HowFar.Core.Models.Properties", {
        inherits: [HowFar.Core.Models.IProperties],
        alias: [
            "Add", "HowFar$Core$Models$IProperties$Add",
            "ContainsKey", "HowFar$Core$Models$IProperties$ContainsKey",
            "Get", "HowFar$Core$Models$IProperties$Get",
            "Set", "HowFar$Core$Models$IProperties$Set"
        ],
        ctors: {
            ctor: function () {
                this.$initialize();

            }
        },
        methods: {
            Add: function (key, obj) {
                if (window.localStorage == null) {
                    return;
                }

                var str = Newtonsoft.Json.JsonConvert.SerializeObject(obj);
                window.localStorage.setItem(key, str);
            },
            ContainsKey: function (key) {
                if (window.localStorage == null) {
                    return false;
                }
                return window.localStorage.getItem(key) != null;
            },
            Get: function (T, key) {
                if (window.localStorage == null) {
                    return null;
                }

                var value = window.localStorage.getItem(key);
                if (value == null) {
                    return null;
                }
                return Newtonsoft.Json.JsonConvert.DeserializeObject(Bridge.toString(value), T);
            },
            Set: function (key, obj) {
                this.Add(key, obj);
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

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICJIb3dGYXIuQnJpZGdlLmpzIiwKICAic291cmNlUm9vdCI6ICIiLAogICJzb3VyY2VzIjogWyJBcHAuY3MiLCIuLi9Ib3dGYXIuQ29yZS9CaW5kYWJsZUJhc2UuY3MiLCJBZGRNb2RlbC5jcyIsIi4uL0hvd0Zhci5Db3JlL01vZGVscy9PYmplY3RSZXBvc2l0b3J5U2VlZGVyLmNzIiwiQXBwTW9kZWwuY3MiLCIuLi9Ib3dGYXIuQ29yZS9Nb2RlbHMvTWVhc3VyZUNvbnZlcnRlcnMuY3MiLCIuLi9Ib3dGYXIuQ29yZS9Nb2RlbHMvT2JqZWN0TWVhc3VyZW1lbnQuY3MiLCIuLi9Ib3dGYXIuQ29yZS9Nb2RlbHMvT2JqZWN0UGFjay5jcyIsIi4uL0hvd0Zhci5Db3JlL01vZGVscy9PYmplY3RSZXBvc2l0b3J5Q2FjaGUuY3MiLCJQcm9wZXJ0aWVzLmNzIiwiLi4vSG93RmFyLkNvcmUvTW9kZWxzL01lYXN1cmVtZW50Q29tcGFyZS5jcyJdLAogICJuYW1lcyI6IFsiIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7WUF5QllBLElBQUlBOzs7Ozt3Q0FUMEJBO29CQUU5QkEsT0FBT0EsaUJBQXdDQTs7Ozs7Ozs7Ozs7Ozs7bUNDUjNCQSxHQUFHQSxVQUFnQkEsT0FBU0EsUUFBc0JBOzs7Z0JBRXRFQSxJQUFJQSxxQkFBQ0EsY0FBVUEsT0FBS0EsMEJBQWdCQSxTQUFPQSxBQUFPQTtvQkFFOUNBLGFBQVdBO29CQUNYQSx1QkFBa0JBO29CQUNsQkEsNkJBQVFBLFFBQUtBLEFBQXFDQSxXQUFpQkE7Ozs7eUNBT2xDQTs7Z0JBRXJDQSwyQ0FBaUJBLFFBQUtBLEFBQXFDQSxxQkFBdUJBLE1BQU1BLElBQUlBLCtDQUF5QkEsaUJBQWdCQTs7Ozs7Ozs7Ozs7Ozs0QkNiekhBLFlBQStCQTs7Z0JBRTNDQSxZQUFPQTtnQkFDUEEsZ0JBQVdBO2dCQUNYQSxZQUFPQTtnQkFDUEEsV0FBTUE7O2dCQUVOQSw0RUFBc0NBLEFBQTRCQTs7b0JBQUtBLHNCQUFpQkEsa0RB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LG1CQUFjQTs7OzsrQkFFQ0EsR0FBcUJBO2dCQUVwQ0EsV0FBV0EsK0RBQW9CQSxHQUFHQTtnQkFDbENBLElBQUlBO29CQUFVQTs7Z0JBQ2RBLE9BQU9BIiwKICAic291cmNlc0NvbnRlbnQiOiBbInVzaW5nIEJyaWRnZTtcclxudXNpbmcgTmV3dG9uc29mdC5Kc29uO1xyXG51c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uVGhyZWFkaW5nLlRhc2tzO1xyXG51c2luZyBCcmlkZ2UuSHRtbDU7XHJcbnVzaW5nIEhvd0Zhci5Db3JlLk1vZGVscztcclxuXHJcbm5hbWVzcGFjZSBIb3dGYXIuQnJpZGdlXHJcbntcclxuXHJcbiBcclxuXHJcblxyXG4gICAgcHVibGljIGNsYXNzIEFwcCBcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgc3RhdGljIHN0cmluZyBOdW1iZXJGb3JtYXQoZG91YmxlIHgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gU2NyaXB0LkNhbGw8c3RyaW5nPihcIm51bWJlcldpdGhDb21tYXNcIiwgeCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgTWFpbigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvL1dpbmRvdy5PbkxvYWQgPSBlID0+IHsgbmV3IEFwcE1vZGVsKCk7IH07XHJcblxyXG4gICAgICAgICAgICBuZXcgQXBwTW9kZWwoKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBcclxuICAgICAgXHJcbiAgICB9XHJcbn0iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db21wb25lbnRNb2RlbDtcclxudXNpbmcgU3lzdGVtLlJ1bnRpbWUuQ29tcGlsZXJTZXJ2aWNlcztcclxuXHJcbm5hbWVzcGFjZSBIb3dGYXIuQ29yZVxyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgQmluZGFibGVCYXNlIDogSU5vdGlmeVByb3BlcnR5Q2hhbmdlZFxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBldmVudCBQcm9wZXJ0eUNoYW5nZWRFdmVudEhhbmRsZXIgUHJvcGVydHlDaGFuZ2VkO1xyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBTZXRQcm9wZXJ0eTxUPihyZWYgVCBwcm9wZXJ0eSwgVCB2YWx1ZSwgQWN0aW9uIGFjdGlvbiA9IG51bGwsIFtDYWxsZXJNZW1iZXJOYW1lXSBzdHJpbmcgbmFtZSA9IG51bGwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoKHByb3BlcnR5IT1udWxsP3Byb3BlcnR5LkVxdWFscyh2YWx1ZSk6KGJvb2w/KW51bGwpICE9IHRydWUpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHByb3BlcnR5ID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICBPblByb3BlcnR5Q2hhbmdlZChuYW1lKTtcclxuICAgICAgICAgICAgICAgIGFjdGlvbiE9bnVsbD9nbG9iYWw6OkJyaWRnZS5TY3JpcHQuRnJvbUxhbWJkYSgoKT0+YWN0aW9uLkludm9rZSgpKTpudWxsO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuI2lmICFCUklER0VcclxuICAgICAgICBbSG93RmFyLkNvcmUuQW5ub3RhdGlvbnMuTm90aWZ5UHJvcGVydHlDaGFuZ2VkSW52b2NhdG9yXVxyXG4jZW5kaWZcclxuICAgICAgICBwcm90ZWN0ZWQgdmlydHVhbCB2b2lkIE9uUHJvcGVydHlDaGFuZ2VkKFtDYWxsZXJNZW1iZXJOYW1lXSBzdHJpbmcgcHJvcGVydHlOYW1lID0gbnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFByb3BlcnR5Q2hhbmdlZCE9bnVsbD9nbG9iYWw6OkJyaWRnZS5TY3JpcHQuRnJvbUxhbWJkYSgoKT0+UHJvcGVydHlDaGFuZ2VkLkludm9rZSh0aGlzLCBuZXcgUHJvcGVydHlDaGFuZ2VkRXZlbnRBcmdzKHByb3BlcnR5TmFtZSkpKTpudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgQnJpZGdlO1xyXG51c2luZyBCcmlkZ2UuSHRtbDU7XHJcblxyXG5uYW1lc3BhY2UgSG93RmFyLkNvcmUuTW9kZWxzXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBBZGRNb2RlbFxyXG4gICAge1xyXG4gICAgICAgIHByaXZhdGUgSFRNTElucHV0RWxlbWVudCBuYW1lO1xyXG4gICAgICAgIHByaXZhdGUgSFRNTElucHV0RWxlbWVudCBxdWFudGl0eTtcclxuICAgICAgICBwcml2YXRlIEhUTUxTZWxlY3RFbGVtZW50IHVuaXQ7XHJcbiAgICAgICAgcHJpdmF0ZSBIVE1MRWxlbWVudCBidG47XHJcbiAgICAgICAgcHVibGljIEFkZE1vZGVsKElNZWFzdXJlQ29udmVydGVycyBjb252ZXJ0ZXJzLCBBY3Rpb248T2JqZWN0TWVhc3VyZW1lbnQ+IG9uQWRkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbmFtZSA9IERvY3VtZW50LkdldEVsZW1lbnRCeUlkPEhUTUxJbnB1dEVsZW1lbnQ+KFwiYWRkX25hbWVcIik7XHJcbiAgICAgICAgICAgIHF1YW50aXR5ID0gRG9jdW1lbnQuR2V0RWxlbWVudEJ5SWQ8SFRNTElucHV0RWxlbWVudD4oXCJhZGRfbnVtXCIpO1xyXG4gICAgICAgICAgICB1bml0ID0gRG9jdW1lbnQuR2V0RWxlbWVudEJ5SWQ8SFRNTFNlbGVjdEVsZW1lbnQ+KFwiYWRkX3VuaXRcIik7XHJcbiAgICAgICAgICAgIGJ0biA9IERvY3VtZW50LkdldEVsZW1lbnRCeUlkKFwiYWRkX2J0blwiKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnZlcnRlcnMuT2JqZWN0TWVhc3VyZW1lbnRzLkZvckVhY2goKEFjdGlvbjxPYmplY3RNZWFzdXJlbWVudD4pKHAgPT4gdW5pdC5BcHBlbmRDaGlsZChuZXcgSFRNTE9wdGlvbkVsZW1lbnQoKSB7IFRleHQgPSBwLlBsdXJhbE5hbWUgfSkpKTtcclxuICAgICAgICAgICAgU2NyaXB0LkNhbGwoXCJ1cGRhdGVcIik7XHJcbiAgICAgICAgICAgIGJ0bi5PbkNsaWNrID0gZSA9PlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gY29udmVydGVycy5OZXdPYmplY3QobmFtZS5WYWx1ZSwgbmFtZS5WYWx1ZSwgcXVhbnRpdHkuVmFsdWVBc051bWJlciwgdW5pdC5WYWx1ZSk7XHJcbiAgICAgICAgICAgICAgICBuYW1lLlZhbHVlID0gXCJcIjtcclxuICAgICAgICAgICAgICAgIHF1YW50aXR5LlZhbHVlID0gXCJcIjtcclxuXHJcbiAgICAgICAgICAgICAgICBvbkFkZChyZXN1bHQpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsInVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuT2JqZWN0TW9kZWw7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG5cclxubmFtZXNwYWNlIEhvd0Zhci5Db3JlLk1vZGVsc1xyXG57XHJcbiAgICBwdWJsaWMgc3RhdGljIGNsYXNzIE9iamVjdFJlcG9zaXRvcnlTZWVkZXJcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgY29uc3Qgc3RyaW5nIE1ldHJpYyA9IFwiTWV0cmljXCI7XHJcbiAgICAgICAgcHVibGljIGNvbnN0IHN0cmluZyBJbXBlcmlhbCA9IFwiSW1wZXJpYWxcIjtcclxuICAgICAgICBwdWJsaWMgY29uc3Qgc3RyaW5nIFNwYWNlID0gXCJTcGFjZVwiO1xyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgU3RhcnR1cChJT2JqZWN0UmVwb3NpdG9yeSByZXBvc2l0b3J5KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmVwb3NpdG9yeS5TaG91bGRTYXZlID0gZmFsc2U7XHJcbiNpZiBCUklER0VcclxuICAgICAgICAgICAgdmFyIG9iamVjdFBhY2tzID0gbmV3IExpc3Q8T2JqZWN0UGFjaz4oKTtcclxuI2Vsc2VcclxuICAgICAgICAgICAgICAgIHZhciBvYmplY3RQYWNrcyA9IG5ldyBPYnNlcnZhYmxlQ29sbGVjdGlvbjxPYmplY3RQYWNrPigpO1xyXG4jZW5kaWZcclxuICAgICAgICAgICAgdmFyIGNlbnRpbWV0ZXIgPSBuZXcgT2JqZWN0TWVhc3VyZW1lbnQoXCJDZW50aW1ldGVyXCIsIFwiQ2VudGltZXRlcnNcIikgeyBWYWx1ZSA9IDEgfTtcclxuICAgICAgICAgICAgY2VudGltZXRlci5PYmplY3RQYWNrTmFtZSA9IE1ldHJpYztcclxuICAgICAgICAgICAgb2JqZWN0UGFja3MuQWRkKG5ldyBPYmplY3RQYWNrKFwiQ3VzdG9tXCIsIFwiT2JqZWN0cyB0aGF0IGFyZSBtYWRlIGluIHRoZSBhcHAgYXJlIHBsYWNlZCBoZXJlLlwiKSB7IFBhY2tJbWFnZSA9IFwiQXNzZXRzL2Jsb2NrLnBuZ1wiIH0pO1xyXG4gICAgICAgICAgICBvYmplY3RQYWNrcy5BZGQobmV3IE9iamVjdFBhY2soSW1wZXJpYWwsIFwiQSBkZWZhdWx0IHBhY2thZ2UgZm9yIHRoZSBVUyBtZWFzdXJlbWVudCBzeXN0ZW1cIikgeyBQYWNrSW1hZ2UgPSBcImh0dHBzOi8vbG9nb2Vwcy5jb20vd3AtY29udGVudC91cGxvYWRzLzIwMTMvMDYvZmxhZy1vZi11c2EtdmVjdG9yLWxvZ28ucG5nXCIgfSk7XHJcbiAgICAgICAgICAgIG9iamVjdFBhY2tzLkFkZChuZXcgT2JqZWN0UGFjayhNZXRyaWMsIFwiVGhlIG1ldHJpYyBzeXN0ZW0uICBVc2VkIGJ5IGV2ZXJ5b25lIGV4Y2VwdCB0aGUgVVNcIikgeyBQYWNrSW1hZ2UgPSBcImh0dHA6Ly93d3cua25pZ2h0c3RlbXBsYXJvcmRlci5vcmcvd3AtY29udGVudC91cGxvYWRzLzIwMTYvMDYvVU4tU0VBTC1TdHlsaXplZC01MDAtQnJvd24ucG5nXCIgfSk7XHJcbiAgICAgICAgICAgIG9iamVjdFBhY2tzLkFkZChuZXcgT2JqZWN0UGFjayhTcGFjZSwgXCJPYmplY3RzIGFuZCBNZWFzdXJlbWVudHMgaW4gc3BhY2VcIikgeyBQYWNrSW1hZ2UgPSBcImh0dHBzOi8vc2VwLnlpbWcuY29tL2F5L3NreWltYWdlL25hc2Etc3BhY2UtbWlzc2lvbnMtOS5qcGdcIiB9KTtcclxuICAgICAgICAgICAgdmFyIHBhY2tzID0gU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5Ub0xpc3Q8T2JqZWN0UGFjaz4ocmVwb3NpdG9yeS5HZXRPYmplY3RQYWNrcygpKTtcclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIG9iamVjdFBhY2sgaW4gb2JqZWN0UGFja3MpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmICghU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5TZWxlY3Q8T2JqZWN0UGFjayxzdHJpbmc+KHBhY2tzLChTeXN0ZW0uRnVuYzxPYmplY3RQYWNrLHN0cmluZz4pKHAgPT4gcC5QYWNrTmFtZSkpLkNvbnRhaW5zKG9iamVjdFBhY2suUGFja05hbWUpKVxyXG4gICAgICAgICAgICAgICAgICAgIHJlcG9zaXRvcnkuQWRkUGFjayhvYmplY3RQYWNrKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy9kYi5TYXZlQ2hhbmdlcygpO1xyXG4gICAgICAgICAgICBpZiAoU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5BbGw8T2JqZWN0TWVhc3VyZW1lbnQ+KHJlcG9zaXRvcnkuR2V0T2JqZWN0TWVhc3VyZW1lbnRzKCksKFN5c3RlbS5GdW5jPE9iamVjdE1lYXN1cmVtZW50LGJvb2w+KShwID0+IHAuU2luZ2xlTmFtZSAhPSBjZW50aW1ldGVyLlNpbmdsZU5hbWUpKSlcclxuICAgICAgICAgICAgICAgIHJlcG9zaXRvcnkuQWRkT2JqZWN0KGNlbnRpbWV0ZXIpO1xyXG4gICAgICAgICAgICAvL3JlcG9zaXRvcnkuVXBkYXRlUGFjayhJbXBlcmlhbCwgY2VudGltZXRlcik7XHJcbiAgICAgICAgICAgIHZhciBpbmNoZXMgPSByZXBvc2l0b3J5Lk5ld09iamVjdChcIkluY2hlc1wiLCBcIkluY2hcIiwgMi41NCwgY2VudGltZXRlciwgSW1wZXJpYWwpO1xyXG4gICAgICAgICAgICB2YXIgZmVldCA9IHJlcG9zaXRvcnkuTmV3T2JqZWN0KFwiRmVldFwiLCBcIkZvb3RcIiwgMTIsIGluY2hlcywgSW1wZXJpYWwpO1xyXG4gICAgICAgICAgICB2YXIgbWlsZSA9IHJlcG9zaXRvcnkuTmV3T2JqZWN0KFwiTWlsZXNcIiwgXCJNaWxlXCIsIDUyODAsIGZlZXQsIEltcGVyaWFsKTtcclxuICAgICAgICAgICAgdmFyIG1ldGVyID0gcmVwb3NpdG9yeS5OZXdPYmplY3QoXCJNZXRlcnNcIiwgXCJNZXRlclwiLCAxMDAsIGNlbnRpbWV0ZXIsIE1ldHJpYyk7XHJcbiAgICAgICAgICAgIHZhciBraWxvTWV0ZXIgPSByZXBvc2l0b3J5Lk5ld09iamVjdChcIktpbG9tZXRlcnNcIiwgXCJLaWxvbWV0ZXJcIiwgMTAwMCwgbWV0ZXIsIE1ldHJpYyk7XHJcblxyXG4gICAgICAgICAgICB2YXIgbmFub01ldGVyID0gcmVwb3NpdG9yeS5OZXdPYmplY3QoXCJOYW5vbWV0ZXJzXCIsIFwiTmFub21ldGVyXCIsIDAuMDAwMDAwMSwgY2VudGltZXRlciwgTWV0cmljKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBlYXJ0aCA9IHJlcG9zaXRvcnkuTmV3T2JqZWN0KFwiRWFydGhzXCIsIFwiRWFydGhcIiwgMjUwMDAsIG1pbGUsIFNwYWNlKTtcclxuICAgICAgICAgICAgdmFyIHN1biA9IHJlcG9zaXRvcnkuTmV3T2JqZWN0KFwiU3Vuc1wiLCBcIlN1blwiLCAxMDMsIGVhcnRoLCBTcGFjZSk7XHJcbiAgICAgICAgICAgIHZhciBkaXN0ID0gcmVwb3NpdG9yeS5OZXdPYmplY3QoXCJEaXN0YW5jZSBmcm9tIEVhcnRoIHRvIFN1blwiLCBcIkRpc3RhbmNlIGZyb20gRWFydGggdG8gU3VuXCIsIDkyOTU1ODA3LCBtaWxlLCBTcGFjZSk7XHJcbiAgICAgICAgICAgIHZhciBsaWdodHllYXIgPSByZXBvc2l0b3J5Lk5ld09iamVjdChcIkxpZ2h0eWVhcnNcIiwgXCJMaWdodHllYXJcIiwgNTg3ODYyNTAwMDAwMCwgbWlsZSwgU3BhY2UpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGFscGhhID0gcmVwb3NpdG9yeS5OZXdPYmplY3QoXCJEaXN0YW5jZSBmcm9tIEVhcnRoIHRvIEFscGhhIENlbnRhdXJpXCIsIFwiRGlzdGFuY2UgZnJvbSBFYXJ0aCB0byBBbHBoYSBDZW50YXVyaVwiLCA0LjQsIGxpZ2h0eWVhciwgU3BhY2UpO1xyXG5cclxuICAgICAgICAgICAgcmVwb3NpdG9yeS5TaG91bGRTYXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdmFyIHBpY28gPSByZXBvc2l0b3J5Lk5ld09iamVjdChcIlBpY29tZXRlcnNcIiwgXCJQaWNvbWV0ZXJcIiwgMC4wMDEsIG5hbm9NZXRlciwgTWV0cmljKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgT2JqZWN0TWVhc3VyZW1lbnQgTmV3T2JqZWN0QWN0aW9uKHN0cmluZyBwbHVyYWxOYW1lLCBzdHJpbmcgc2luZ2xlTmFtZSwgZG91YmxlIHZhbHVlLCBzdHJpbmcgbWVhc3VyZW1lbnRTdHIsIHN0cmluZyBwYWNrLCBJT2JqZWN0UmVwb3NpdG9yeSByZXBvc2l0b3J5KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKG1lYXN1cmVtZW50U3RyICE9IG51bGwgJiYgU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5BbGw8T2JqZWN0TWVhc3VyZW1lbnQ+KHJlcG9zaXRvcnkuR2V0T2JqZWN0TWVhc3VyZW1lbnRzKCksKFN5c3RlbS5GdW5jPE9iamVjdE1lYXN1cmVtZW50LGJvb2w+KShwID0+IHAuU2luZ2xlTmFtZSAhPSBzaW5nbGVOYW1lKSkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciBtZWFzdXJlID0gcmVwb3NpdG9yeS5HZXRPYmplY3RNZWFzdXJlbWVudChtZWFzdXJlbWVudFN0cik7XHJcbiAgICAgICAgICAgICAgICBpZiAobWVhc3VyZSAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBuZXdPYmplY3QgPSBuZXcgT2JqZWN0TWVhc3VyZW1lbnQoc2luZ2xlTmFtZSwgcGx1cmFsTmFtZSkgeyBWYWx1ZSA9IHZhbHVlLCBPYmplY3RQYWNrTmFtZSA9IHBhY2sgfTtcclxuICAgICAgICAgICAgICAgICAgICBtZWFzdXJlLkFkZChuZXdPYmplY3QpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlcG9zaXRvcnkuQWRkT2JqZWN0KG5ld09iamVjdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9yZXBvc2l0b3J5LlVwZGF0ZVBhY2socGFjaywgbmV3T2JqZWN0KTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3T2JqZWN0O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgSUxpc3Q8T2JqZWN0TWVhc3VyZW1lbnQ+IFNldHVwVHJlZShJTGlzdDxPYmplY3RNZWFzdXJlbWVudD4gZGF0YSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciBvYmplY3RNZWFzdXJlbWVudCBpbiBkYXRhKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAob2JqZWN0TWVhc3VyZW1lbnQuUGFyZW50TWVhc3VyZW1lbnRTaW5nbGVOYW1lICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgb2JqZWN0TWVhc3VyZW1lbnQuTWVhc3VyZW1lbnQgPVxyXG5TeXN0ZW0uTGlucS5FbnVtZXJhYmxlLkZpcnN0PE9iamVjdE1lYXN1cmVtZW50PiggICAgICAgICAgICAgICAgICAgICAgICBkYXRhLChTeXN0ZW0uRnVuYzxPYmplY3RNZWFzdXJlbWVudCxib29sPikocCA9PiBwLlNpbmdsZU5hbWUgPT0gb2JqZWN0TWVhc3VyZW1lbnQuUGFyZW50TWVhc3VyZW1lbnRTaW5nbGVOYW1lKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHQgPSBTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLldoZXJlPE9iamVjdE1lYXN1cmVtZW50PihkYXRhLChTeXN0ZW0uRnVuYzxPYmplY3RNZWFzdXJlbWVudCxib29sPikocCA9PiBwLlBhcmVudE1lYXN1cmVtZW50U2luZ2xlTmFtZSA9PSBvYmplY3RNZWFzdXJlbWVudC5TaW5nbGVOYW1lKSk7XHJcbiAgICAgICAgICAgICAgICBvYmplY3RNZWFzdXJlbWVudC5PYmplY3RNZWFzdXJlbWVudHMgPSB0LlRvTGlzdCgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZGF0YTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uVGhyZWFkaW5nLlRhc2tzO1xyXG51c2luZyBCcmlkZ2U7XHJcbnVzaW5nIEJyaWRnZS5IdG1sNTtcclxudXNpbmcgSG93RmFyLkJyaWRnZTtcclxuXHJcbm5hbWVzcGFjZSBIb3dGYXIuQ29yZS5Nb2RlbHNcclxue1xyXG4gICAgcHVibGljIGNsYXNzIEFwcE1vZGVsIDogSUFwcFxyXG4gICAge1xyXG4gICAgICAgIEhUTUxTZWxlY3RFbGVtZW50IGZyb21TZWxlY3QgPSBEb2N1bWVudC5HZXRFbGVtZW50QnlJZDxIVE1MU2VsZWN0RWxlbWVudD4oXCJmcm9tXCIpO1xyXG4gICAgICAgIEhUTUxTZWxlY3RFbGVtZW50IHRvU2VsZWN0ID0gRG9jdW1lbnQuR2V0RWxlbWVudEJ5SWQ8SFRNTFNlbGVjdEVsZW1lbnQ+KFwidG9cIik7XHJcbiAgICAgICAgSFRNTElucHV0RWxlbWVudCBudW0gPSBEb2N1bWVudC5HZXRFbGVtZW50QnlJZDxIVE1MSW5wdXRFbGVtZW50PihcIm51bVwiKTtcclxuICAgICAgICBIVE1MRWxlbWVudCBhbnN3ZXIgPSBEb2N1bWVudC5HZXRFbGVtZW50QnlJZChcImFuc3dlclwiKTtcclxuICAgICAgICBwcml2YXRlIEhUTUxFbGVtZW50IHJldmVyc2VidG4gPSBEb2N1bWVudC5HZXRFbGVtZW50QnlJZChcInJldmVyc2VcIik7XHJcbiAgICAgICAgTWVhc3VyZUNvbnZlcnRlcnMgY29udmVydGVyO1xyXG4gICAgICAgIHByaXZhdGUgSFRNTEVsZW1lbnQgcmFuZG9tYnRuID0gRG9jdW1lbnQuR2V0RWxlbWVudEJ5SWQoXCJyYW5kb21cIik7XHJcbiAgICAgICAgUmFuZG9tIHJhbmRvbSA9IG5ldyBSYW5kb20oKTtcclxuICAgICAgICBwdWJsaWMgQXBwTW9kZWwoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY29udmVydGVyID0gbmV3IE1lYXN1cmVDb252ZXJ0ZXJzKG5ldyBPYmplY3RSZXBvc2l0b3J5Q2FjaGUodGhpcykpO1xyXG4gICAgICAgICAgICBjb252ZXJ0ZXIuT2JqZWN0TWVhc3VyZW1lbnRzLkZvckVhY2goKEFjdGlvbjxPYmplY3RNZWFzdXJlbWVudD4pKHAgPT5cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZnJvbVNlbGVjdC5BcHBlbmRDaGlsZChuZXcgSFRNTE9wdGlvbkVsZW1lbnQoKSB7IFRleHQgPSBwLlBsdXJhbE5hbWUgfSk7XHJcbiAgICAgICAgICAgICAgICB0b1NlbGVjdC5BcHBlbmRDaGlsZChuZXcgSFRNTE9wdGlvbkVsZW1lbnQoKSB7IFRleHQgPSBwLlBsdXJhbE5hbWUgfSk7XHJcbiAgICAgICAgICAgIH0pKTtcclxuXHJcbiAgICAgICAgICAgIGZyb21TZWxlY3QuT25DaGFuZ2UgPSBlID0+IENvbnZlcnQoKTtcclxuICAgICAgICAgICAgdG9TZWxlY3QuT25DaGFuZ2UgPSBlID0+IENvbnZlcnQoKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChyYW5kb21idG4gIT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHJhbmRvbWJ0bi5PbkNsaWNrID0gZSA9PiBSYW5kb20oKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChyZXZlcnNlYnRuICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICByZXZlcnNlYnRuLk9uQ2xpY2sgPSBlID0+XHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGYgPSBmcm9tU2VsZWN0LlNlbGVjdGVkSW5kZXg7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRvID0gdG9TZWxlY3QuU2VsZWN0ZWRJbmRleDtcclxuICAgICAgICAgICAgICAgICAgICBmcm9tU2VsZWN0LlNlbGVjdGVkSW5kZXggPSB0bztcclxuICAgICAgICAgICAgICAgICAgICB0b1NlbGVjdC5TZWxlY3RlZEluZGV4ID0gZjtcclxuICAgICAgICAgICAgICAgICAgICBTY3JpcHQuQ2FsbChcInVwZGF0ZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICBDb252ZXJ0KCk7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgbnVtLk9uS2V5RG93biA9IGUgPT4gQ29udmVydCgpO1xyXG4gICAgICAgICAgICBudW0uT25Nb3VzZVVwID0gZSA9PiBDb252ZXJ0KCk7XHJcbiAgICAgICAgICAgIFNjcmlwdC5DYWxsKFwiY2hvb3NlXCIpO1xyXG4gICAgICAgICAgICBSYW5kb20oKTtcclxuICAgICAgICAgICAgdmFyIGFkZCA9IG5ldyBBZGRNb2RlbChjb252ZXJ0ZXIsIHAgPT5cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyIGYgPSBuZXcgSFRNTE9wdGlvbkVsZW1lbnQoKSB7IFRleHQgPSBwLlBsdXJhbE5hbWUgfTtcclxuICAgICAgICAgICAgICAgIGZyb21TZWxlY3QuQXBwZW5kQ2hpbGQoZik7XHJcbiAgICAgICAgICAgICAgICB0b1NlbGVjdC5BcHBlbmRDaGlsZChuZXcgSFRNTE9wdGlvbkVsZW1lbnQoKSB7IFRleHQgPSBwLlBsdXJhbE5hbWUgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgZnJvbVNlbGVjdC5TZWxlY3RlZEluZGV4ID0gZi5JbmRleDtcclxuICAgICAgICAgICAgICAgIFNjcmlwdC5DYWxsKFwidXBkYXRlXCIpO1xyXG4gICAgICAgICAgICAgICAgQ29udmVydCgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBSYW5kb20oKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIGNvdW50ID0gZnJvbVNlbGVjdC5PcHRpb25zLkxlbmd0aDtcclxuXHJcbiAgICAgICAgICAgIGZyb21TZWxlY3QuU2VsZWN0ZWRJbmRleCA9IHJhbmRvbS5OZXh0KDAsIGNvdW50IC0gMSk7XHJcbiAgICAgICAgICAgIHRvU2VsZWN0LlNlbGVjdGVkSW5kZXggPSByYW5kb20uTmV4dCgwLCBjb3VudCAtIDEpO1xyXG4gICAgICAgICAgICBTY3JpcHQuQ2FsbChcInVwZGF0ZVwiKTtcclxuICAgICAgICAgICAgQ29udmVydCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdm9pZCBDb252ZXJ0KClcclxuICAgICAgICB7XHJcbmRvdWJsZSBuO1xuICAgICAgICAgICAgaWYgKGRvdWJsZS5UcnlQYXJzZShudW0uVmFsdWUsIG91dCBuKSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IGNvbnZlcnRlci5Db252ZXJ0KGZyb21TZWxlY3QuVmFsdWUsIHRvU2VsZWN0LlZhbHVlLCBuKTtcclxuXHJcbiAgICAgICAgICAgICAgICBhbnN3ZXIuVGV4dENvbnRlbnQgPSBzdHJpbmcuRm9ybWF0KFwiMSB7MH0gPSB7MX0gezJ9XCIsZnJvbVNlbGVjdC5WYWx1ZSxBcHAuTnVtYmVyRm9ybWF0KHJlc3VsdCksdG9TZWxlY3QuVmFsdWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgSVByb3BlcnRpZXMgUHJvcGVydGllcyB7IGdldDsgcHJpdmF0ZSBzZXQ7IH1cclxuICAgICAgICBwdWJsaWMgYXN5bmMgVGFzayBTYXZlUHJvcGVydGllc0FzeW5jKClcclxuICAgICAgICB7XHJcblxyXG4gICAgICAgIH1cclxuXG5cclxuXHJcblxyXG5cclxuICAgIFxucHJpdmF0ZSBJUHJvcGVydGllcyBfX1Byb3BlcnR5X19Jbml0aWFsaXplcl9fUHJvcGVydGllcz1uZXcgUHJvcGVydGllcygpO31cclxufSIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5PYmplY3RNb2RlbDtcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcblxyXG5uYW1lc3BhY2UgSG93RmFyLkNvcmUuTW9kZWxzXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBNZWFzdXJlQ29udmVydGVycyA6IElNZWFzdXJlQ29udmVydGVyc1xyXG4gICAge1xyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgSU9iamVjdFJlcG9zaXRvcnkgX3JlcG9zaXRvcnk7XHJcbnB1YmxpYyBPYmplY3RNZWFzdXJlbWVudCBDZW50aW1ldGVyXHJcbntcclxuICAgIGdldFxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBGaW5kKFwiQ2VudGltZXRlclwiKTtcclxuICAgIH1cclxufSAgICAgICAgcHVibGljIE1lYXN1cmVDb252ZXJ0ZXJzKElPYmplY3RSZXBvc2l0b3J5IHJlcG9zaXRvcnkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBfcmVwb3NpdG9yeSA9IHJlcG9zaXRvcnk7XHJcbiAgICAgICAgICAgIFVwZGF0ZUxpc3QoKTtcclxuICAgICAgICB9XHJcblxyXG5cclxuXHJcbiNpZiBCUklER0VcclxuICAgICAgICBwcml2YXRlIHZvaWQgVXBkYXRlTGlzdCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBPYmplY3RNZWFzdXJlbWVudHMgPSBuZXcgTGlzdDxPYmplY3RNZWFzdXJlbWVudD4oU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5PcmRlckJ5PE9iamVjdE1lYXN1cmVtZW50LE9iamVjdE1lYXN1cmVtZW50PihHZXRBbGwoKSwoRnVuYzxPYmplY3RNZWFzdXJlbWVudCxPYmplY3RNZWFzdXJlbWVudD4pKHAgPT4gcCksIG5ldyBNZWFzdXJlbWVudENvbXBhcmUodGhpcykpKTtcclxuICAgICAgICAgICAgT2JqZWN0UGFja3MgPSBuZXcgTGlzdDxPYmplY3RQYWNrPihfcmVwb3NpdG9yeS5HZXRPYmplY3RQYWNrcygpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIExpc3Q8T2JqZWN0UGFjaz4gT2JqZWN0UGFja3MgeyBnZXQ7IHNldDsgfVxyXG4gICAgICAgIHB1YmxpYyBMaXN0PE9iamVjdE1lYXN1cmVtZW50PiBPYmplY3RNZWFzdXJlbWVudHMgeyBnZXQ7IHNldDsgfVxyXG5cclxuI2Vsc2VcclxuICAgICAgICBwcml2YXRlIHZvaWQgVXBkYXRlTGlzdCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBPYmplY3RNZWFzdXJlbWVudHMgPSBuZXcgT2JzZXJ2YWJsZUNvbGxlY3Rpb248T2JqZWN0TWVhc3VyZW1lbnQ+KEdldEFsbCgpLk9yZGVyQnkocCA9PiBwLCBuZXcgTWVhc3VyZW1lbnRDb21wYXJlKHRoaXMpKSk7XHJcbiAgICAgICAgICAgIE9iamVjdFBhY2tzID0gbmV3IE9ic2VydmFibGVDb2xsZWN0aW9uPE9iamVjdFBhY2s+KF9yZXBvc2l0b3J5LkdldE9iamVjdFBhY2tzKCkpO1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIE9ic2VydmFibGVDb2xsZWN0aW9uPE9iamVjdFBhY2s+IE9iamVjdFBhY2tzIHsgZ2V0OyBzZXQ7IH1cclxuICAgICAgICBwdWJsaWMgT2JzZXJ2YWJsZUNvbGxlY3Rpb248T2JqZWN0TWVhc3VyZW1lbnQ+IE9iamVjdE1lYXN1cmVtZW50cyB7IGdldDsgc2V0OyB9XHJcblxyXG4jZW5kaWZcclxuXHJcblxyXG4gICAgICAgIHB1YmxpYyBkb3VibGUgQ29udmVydChPYmplY3RNZWFzdXJlbWVudCBmcm9tTWVhc3VyZW1lbnQsIE9iamVjdE1lYXN1cmVtZW50IHRvLCBkb3VibGUgdmFsdWVGcm9tID0gMSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKGZyb21NZWFzdXJlbWVudCA9PSBudWxsKSB0aHJvdyBuZXcgQXJndW1lbnROdWxsRXhjZXB0aW9uKFwiJ2Zyb20nIGNhbm5vdCBiZSBudWxsXCIpO1xyXG4gICAgICAgICAgICBpZiAodG8gPT0gbnVsbCkgdGhyb3cgbmV3IEFyZ3VtZW50TnVsbEV4Y2VwdGlvbihcIid0bycgY2Fubm90IGJlIG51bGxcIik7XHJcbiAgICAgICAgICAgIHJldHVybiBDb252ZXJ0KGZyb21NZWFzdXJlbWVudC5QbHVyYWxOYW1lLCB0by5QbHVyYWxOYW1lLCB2YWx1ZUZyb20pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGRvdWJsZSBDb252ZXJ0KHN0cmluZyBuYW1lRnJvbSwgc3RyaW5nIG5hbWVUbywgZG91YmxlIHZhbHVlRnJvbSA9IDEpXHJcbiAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgdmFyIGZyb21NZWFzdXJlbWVudCA9IEZpbmQobmFtZUZyb20pO1xyXG4gICAgICAgICAgICB2YXIgdG8gPSBGaW5kKG5hbWVUbyk7XHJcbiAgICAgICAgICAgIGlmICh0byA9PSBmcm9tTWVhc3VyZW1lbnQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZUZyb207XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlRnJvbSAqIENhbGN1bGF0ZShmcm9tTWVhc3VyZW1lbnQsIHRvKSA/PyAwO1xyXG4gICAgICAgIH1cclxuICAgICAgIFxyXG4gICAgICAgIHByaXZhdGUgZG91YmxlPyBDYWxjdWxhdGUoT2JqZWN0TWVhc3VyZW1lbnQgZnJvbU1lYXN1cmVtZW50LCBPYmplY3RNZWFzdXJlbWVudCB0bywgZG91YmxlIHZhbHVlID0gMSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChmcm9tTWVhc3VyZW1lbnQuUGFyZW50TWVhc3VyZW1lbnRTaW5nbGVOYW1lICE9IG51bGwpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChmcm9tTWVhc3VyZW1lbnQuUGFyZW50TWVhc3VyZW1lbnRTaW5nbGVOYW1lID09IHRvLlNpbmdsZU5hbWUpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZyb21NZWFzdXJlbWVudC5WYWx1ZSAqIHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB1cCA9IENhbGN1bGF0ZShmcm9tTWVhc3VyZW1lbnQuTWVhc3VyZW1lbnQsIHRvLCBmcm9tTWVhc3VyZW1lbnQuVmFsdWUgKiB2YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHVwICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdXA7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIEdvRG93bihmcm9tTWVhc3VyZW1lbnQsIHRvLCB2YWx1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGRvdWJsZT8gR29Eb3duKE9iamVjdE1lYXN1cmVtZW50IGZyb21NZWFzdXJlbWVudCwgT2JqZWN0TWVhc3VyZW1lbnQgdG8sIGRvdWJsZSB2YWx1ZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBjaGlsZHJlbiA9IGZyb21NZWFzdXJlbWVudC5PYmplY3RNZWFzdXJlbWVudHM7XHJcbiAgICAgICAgICAgIC8vaWYgKGNoaWxkcmVuLkFueSgpICE9IHRydWUpXHJcbiAgICAgICAgICAgIC8ve1xyXG4gICAgICAgICAgICAvLyAgICBjaGlsZHJlbiA9IEZpbmQoZnJvbS5TaW5nbGVOYW1lKS5PYmplY3RNZWFzdXJlbWVudHM7XHJcbiAgICAgICAgICAgIC8vfVxyXG4gICAgICAgICAgICBmb3JlYWNoICh2YXIgb2JqZWN0TWVhc3VyZW1lbnQgaW4gY2hpbGRyZW4pXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChvYmplY3RNZWFzdXJlbWVudCA9PSB0bylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWUgLyB0by5WYWx1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZG93biA9IEdvRG93bihvYmplY3RNZWFzdXJlbWVudCwgdG8sIHZhbHVlIC8gb2JqZWN0TWVhc3VyZW1lbnQuVmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkb3duICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZG93bjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHByaXZhdGUgTGlzdDxPYmplY3RNZWFzdXJlbWVudD4gR2V0QWxsKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLlRvTGlzdDxPYmplY3RNZWFzdXJlbWVudD4oX3JlcG9zaXRvcnkuR2V0T2JqZWN0TWVhc3VyZW1lbnRzKCkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIE9iamVjdE1lYXN1cmVtZW50IEZpbmQoc3RyaW5nIG5hbWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gX3JlcG9zaXRvcnkuR2V0T2JqZWN0TWVhc3VyZW1lbnQobmFtZSk7XHJcbiAgICAgICAgICAgIC8vcmV0dXJuIEZpbmQoQ2VudGltZXRlciwgbmFtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG5cclxuICAgICAgICBwdWJsaWMgT2JqZWN0TWVhc3VyZW1lbnQgTmV3T2JqZWN0KHN0cmluZyBwbHVyYWxOYW1lLCBzdHJpbmcgc2luZ2xlTmFtZSwgZG91YmxlIHZhbHVlLCBzdHJpbmcgbWVhc3VyZW1lbnQsIHN0cmluZyBwYWNrID0gXCJDdXN0b21cIilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBtZWFzdXJlID0gRmluZChtZWFzdXJlbWVudCk7XHJcbiAgICAgICAgICAgIGlmIChtZWFzdXJlICE9IG51bGwpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciBuZXdPYmplY3QgPSBuZXcgT2JqZWN0TWVhc3VyZW1lbnQoc2luZ2xlTmFtZSwgcGx1cmFsTmFtZSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBWYWx1ZSA9IHZhbHVlLFxyXG4gICAgICAgICAgICAgICAgICAgIE9iamVjdFBhY2tOYW1lID0gcGFjayxcclxuICAgICAgICAgICAgICAgICAgICBQYXJlbnRNZWFzdXJlbWVudFNpbmdsZU5hbWUgPSBtZWFzdXJlLlNpbmdsZU5hbWVcclxuXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgX3JlcG9zaXRvcnkuQWRkT2JqZWN0KG5ld09iamVjdCk7XHJcbiAgICAgICAgICAgICAgICBVcGRhdGVMaXN0KCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3T2JqZWN0O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIERlbGV0ZVBhY2soT2JqZWN0UGFjayBwYWNrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgX3JlcG9zaXRvcnkuUmVtb3ZlUGFjayhwYWNrKTtcclxuICAgICAgICAgICAgVXBkYXRlTGlzdCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgRGVsZXRlT2JqZWN0KE9iamVjdE1lYXN1cmVtZW50IHNlbGVjdGVkT2JqZWN0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgX3JlcG9zaXRvcnkuUmVtb3ZlT2JqZWN0KHNlbGVjdGVkT2JqZWN0KTtcclxuICAgICAgICAgICAgdGhpcy5VcGRhdGVMaXN0KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBVcGRhdGVPYmplY3QoT2JqZWN0TWVhc3VyZW1lbnQgc2VsZWN0ZWRPYmplY3QpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBfcmVwb3NpdG9yeS5VcGRhdGVPYmplY3Qoc2VsZWN0ZWRPYmplY3QpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIFVwZGF0ZVBhY2soc3RyaW5nIHBhY2ssIE9iamVjdE1lYXN1cmVtZW50IG5ld09iamVjdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBwYWNrcyA9IFN5c3RlbS5MaW5xLkVudW1lcmFibGUuRmlyc3RPckRlZmF1bHQ8T2JqZWN0UGFjaz4oT2JqZWN0UGFja3MsKEZ1bmM8T2JqZWN0UGFjayxib29sPikocCA9PiBwLlBhY2tOYW1lID09IHBhY2spKTtcclxuICAgICAgICAgICAgaWYgKHBhY2tzICE9IG51bGwpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHBhY2tzLk9iamVjdE1lYXN1cmVtZW50cy5BZGQobmV3T2JqZWN0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBJbnZhbGlkT3BlcmF0aW9uRXhjZXB0aW9uKHN0cmluZy5Gb3JtYXQoXCJwYWNrYWdlICd7MH0nIG11c3QgZXhpc3QgZmlyc3RcIixwYWNrKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBjb25zdCBzdHJpbmcgUHJvcGVydHlLZXkgPSBcIkNvbnZlcnNpb25zXCI7XHJcblxyXG5cclxuICAgICAgICBwdWJsaWMgT2JqZWN0TWVhc3VyZW1lbnQgTmV3T2JqZWN0KHN0cmluZyBwbHVyYWxOYW1lLCBzdHJpbmcgc2luZ2xlTmFtZSxcclxuICAgICAgICAgICAgZG91YmxlIHZhbHVlLCBPYmplY3RNZWFzdXJlbWVudCBtZWFzdXJlbWVudCwgc3RyaW5nIHBhY2sgPSBcIkN1c3RvbVwiKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIE5ld09iamVjdChwbHVyYWxOYW1lLCBzaW5nbGVOYW1lLCB2YWx1ZSwgbWVhc3VyZW1lbnQuUGx1cmFsTmFtZSwgcGFjayk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBOZXdQYWNrKE9iamVjdFBhY2sgcGFjaylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuX3JlcG9zaXRvcnkuQWRkUGFjayhwYWNrKTtcclxuICAgICAgICAgICAgdGhpcy5VcGRhdGVMaXN0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwidXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5Db21wb25lbnRNb2RlbC5EYXRhQW5ub3RhdGlvbnM7XHJcbnVzaW5nIFN5c3RlbS5Db21wb25lbnRNb2RlbC5EYXRhQW5ub3RhdGlvbnMuU2NoZW1hO1xyXG51c2luZyBOZXd0b25zb2Z0Lkpzb247XHJcblxyXG5uYW1lc3BhY2UgSG93RmFyLkNvcmUuTW9kZWxzXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBPYmplY3RNZWFzdXJlbWVudCA6IEJpbmRhYmxlQmFzZSwgSU9iamVjdE1lYXN1cmVtZW50XHJcbiAgICB7XHJcbiAgICAgICAgcHJpdmF0ZSBkb3VibGUgX3ZhbHVlO1xyXG4gICAgICAgIHByaXZhdGUgc3RyaW5nIF9pbWFnZTtcclxuICAgICAgICBwcml2YXRlIHN0cmluZyBfcGx1cmFsTmFtZTtcclxuICAgICAgICBwcml2YXRlIExpc3Q8T2JqZWN0TWVhc3VyZW1lbnQ+IF9vYmplY3RNZWFzdXJlbWVudHM7XHJcbiAgICAgICAgcHJpdmF0ZSBzdHJpbmcgX3NpbmdsZU5hbWU7XHJcbiAgICAgICAgcHJpdmF0ZSBPYmplY3RQYWNrIF9vYmplY3RQYWNrO1xyXG4gICAgICAgIHByaXZhdGUgc3RyaW5nIF9vYmplY3RQYWNrTmFtZTtcclxuICAgICAgICBwcml2YXRlIE9iamVjdE1lYXN1cmVtZW50IF9tZWFzdXJlbWVudDtcclxuICAgICAgICBwcml2YXRlIHN0cmluZyBfcGFyZW50TWVhc3VyZW1lbnRTaW5nbGVOYW1lO1xyXG5cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgc3RyaW5nIFRvU3RyaW5nKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBNZWFzdXJlbWVudCAhPSBudWxsID8gc3RyaW5nLkZvcm1hdChcInswfTogezF9IHsyfVwiLFNpbmdsZU5hbWUsVmFsdWUsTWVhc3VyZW1lbnQuUGx1cmFsTmFtZSk6IHN0cmluZy5Gb3JtYXQoXCJ7MH0gezF9XCIsVmFsdWUsUGx1cmFsTmFtZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBbRm9yZWlnbktleShcIk1lYXN1cmVtZW50XCIpXVxyXG4gICAgICAgIHB1YmxpYyBzdHJpbmcgUGFyZW50TWVhc3VyZW1lbnRTaW5nbGVOYW1lXHJcbntcclxuICAgIGdldFxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBfcGFyZW50TWVhc3VyZW1lbnRTaW5nbGVOYW1lO1xyXG4gICAgfVxyXG5cclxuICAgIFxyXG4gICAgc2V0XHJcbiAgICB7XHJcbiAgICAgICAgU2V0UHJvcGVydHk8c3RyaW5nPihyZWYgX3BhcmVudE1lYXN1cmVtZW50U2luZ2xlTmFtZSwgdmFsdWUpO1xyXG4gICAgfVxyXG4gICAgXHJcbn0gICAgICAgIFtKc29uSWdub3JlXVxyXG4gICAgICAgIHB1YmxpYyB2aXJ0dWFsIE9iamVjdE1lYXN1cmVtZW50IE1lYXN1cmVtZW50XHJcbntcclxuICAgIGdldFxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBfbWVhc3VyZW1lbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgXHJcbiAgICBzZXRcclxuICAgIHtcclxuICAgICAgICBTZXRQcm9wZXJ0eTxPYmplY3RNZWFzdXJlbWVudD4ocmVmIF9tZWFzdXJlbWVudCwgdmFsdWUpO1xyXG4gICAgfVxyXG4gICAgXHJcbn1cclxuICAgICAgICBwdWJsaWMgZG91YmxlIFZhbHVlXHJcbntcclxuICAgIGdldFxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBfdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgXHJcbiAgICBzZXRcclxuICAgIHtcclxuICAgICAgICBTZXRQcm9wZXJ0eTxkb3VibGU+KHJlZiBfdmFsdWUsIHZhbHVlKTtcclxuICAgIH1cclxuICAgIFxyXG59XHJcbiAgICAgICAgcHVibGljIHN0cmluZyBJbWFnZVxyXG57XHJcbiAgICBnZXRcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gX2ltYWdlO1xyXG4gICAgfVxyXG5cclxuICAgIFxyXG4gICAgc2V0XHJcbiAgICB7XHJcbiAgICAgICAgU2V0UHJvcGVydHk8c3RyaW5nPihyZWYgX2ltYWdlLCB2YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBcclxufVxyXG4gICAgICAgIHB1YmxpYyBzdHJpbmcgUGx1cmFsTmFtZVxyXG57XHJcbiAgICBnZXRcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gX3BsdXJhbE5hbWU7XHJcbiAgICB9XHJcblxyXG4gICAgXHJcbiAgICBzZXRcclxuICAgIHtcclxuICAgICAgICBTZXRQcm9wZXJ0eTxzdHJpbmc+KHJlZiBfcGx1cmFsTmFtZSwgdmFsdWUpO1xyXG4gICAgfVxyXG4gICAgXHJcbn1cclxuICAgICAgICBwdWJsaWMgT2JqZWN0TWVhc3VyZW1lbnQoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgT2JqZWN0TWVhc3VyZW1lbnRzID0gbmV3IExpc3Q8T2JqZWN0TWVhc3VyZW1lbnQ+KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBPYmplY3RNZWFzdXJlbWVudChzdHJpbmcgc2luZ2xlTmFtZSwgc3RyaW5nIHBsdXJhbE5hbWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBTaW5nbGVOYW1lID0gc2luZ2xlTmFtZTtcclxuICAgICAgICAgICAgUGx1cmFsTmFtZSA9IHBsdXJhbE5hbWU7XHJcbiAgICAgICAgICAgIE9iamVjdE1lYXN1cmVtZW50cyA9IG5ldyBMaXN0PE9iamVjdE1lYXN1cmVtZW50PigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9wdWJsaWMgSUVudW1lcmFibGU8T2JqZWN0TWVhc3VyZW1lbnQ+IEdldENoaWxkcmVuKClcclxuICAgICAgICAvL3tcclxuICAgICAgICAvLyAgICByZXR1cm4gT2JqZWN0TWVhc3VyZW1lbnRzO1xyXG4gICAgICAgIC8vfVxyXG4gICAgICAgIHB1YmxpYyB2b2lkIEFkZChPYmplY3RNZWFzdXJlbWVudCBvYmopXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBvYmouTWVhc3VyZW1lbnQgPSB0aGlzO1xyXG4gICAgICAgICAgICBPYmplY3RNZWFzdXJlbWVudHMuQWRkKG9iaik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFtKc29uSWdub3JlXVxyXG4gICAgICAgIHB1YmxpYyB2aXJ0dWFsIExpc3Q8T2JqZWN0TWVhc3VyZW1lbnQ+IE9iamVjdE1lYXN1cmVtZW50c1xyXG57XHJcbiAgICBnZXRcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gX29iamVjdE1lYXN1cmVtZW50cztcclxuICAgIH1cclxuXHJcbiAgICBcclxuICAgIHNldFxyXG4gICAge1xyXG4gICAgICAgIFNldFByb3BlcnR5PExpc3Q8T2JqZWN0TWVhc3VyZW1lbnQ+PihyZWYgX29iamVjdE1lYXN1cmVtZW50cywgdmFsdWUpO1xyXG4gICAgfVxyXG4gICAgXHJcbn1cclxuICAgICAgICBwdWJsaWMgc3RyaW5nIFNpbmdsZU5hbWVcclxue1xyXG4gICAgZ2V0XHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIF9zaW5nbGVOYW1lO1xyXG4gICAgfVxyXG5cclxuICAgIFxyXG4gICAgc2V0XHJcbiAgICB7XHJcbiAgICAgICAgU2V0UHJvcGVydHk8c3RyaW5nPihyZWYgX3NpbmdsZU5hbWUsIHZhbHVlKTtcclxuICAgIH1cclxuICAgIFxyXG59ICAgICAgICBbSnNvbklnbm9yZV1cclxuICAgICAgICBwdWJsaWMgT2JqZWN0UGFjayBPYmplY3RQYWNrXHJcbntcclxuICAgIGdldFxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBfb2JqZWN0UGFjaztcclxuICAgIH1cclxuXHJcbiAgICBcclxuICAgIHNldFxyXG4gICAge1xyXG4gICAgICAgIFNldFByb3BlcnR5PE9iamVjdFBhY2s+KHJlZiBfb2JqZWN0UGFjaywgdmFsdWUpO1xyXG4gICAgfVxyXG4gICAgXHJcbn1cclxuICAgICAgICBwdWJsaWMgc3RyaW5nIE9iamVjdFBhY2tOYW1lXHJcbntcclxuICAgIGdldFxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBfb2JqZWN0UGFja05hbWU7XHJcbiAgICB9XHJcblxyXG4gICAgXHJcbiAgICBzZXRcclxuICAgIHtcclxuICAgICAgICBTZXRQcm9wZXJ0eTxzdHJpbmc+KHJlZiBfb2JqZWN0UGFja05hbWUsIHZhbHVlKTtcclxuICAgIH1cclxuICAgIFxyXG59ICAgIH1cclxufSIsInVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuT2JqZWN0TW9kZWw7XHJcblxyXG5uYW1lc3BhY2UgSG93RmFyLkNvcmUuTW9kZWxzXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBPYmplY3RQYWNrIDogQmluZGFibGVCYXNlXHJcbiAgICB7XHJcbiAgICAgICAgcHJpdmF0ZSBzdHJpbmcgX3BhY2tOYW1lO1xyXG4gICAgICAgIHByaXZhdGUgc3RyaW5nIF9kZXNjcmlwdGlvbjtcclxuICAgICAgICBwcml2YXRlIHN0cmluZyBfcGFja0ltYWdlO1xyXG5cclxuI2lmIEJSSURHRVxyXG4gICAgICAgIHB1YmxpYyB2aXJ0dWFsIExpc3Q8T2JqZWN0TWVhc3VyZW1lbnQ+IE9iamVjdE1lYXN1cmVtZW50cyB7IGdldDsgc2V0OyB9XHJcbiNlbHNlXHJcbiAgICAgICAgcHVibGljIHZpcnR1YWwgT2JzZXJ2YWJsZUNvbGxlY3Rpb248T2JqZWN0TWVhc3VyZW1lbnQ+IE9iamVjdE1lYXN1cmVtZW50cyB7IGdldDsgc2V0OyB9ID0gbmV3IE9ic2VydmFibGVDb2xsZWN0aW9uPE9iamVjdE1lYXN1cmVtZW50PigpO1xyXG5cclxuI2VuZGlmXHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIHN0cmluZyBUb1N0cmluZygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gUGFja05hbWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RyaW5nIFBhY2tOYW1lXHJcbntcclxuICAgIGdldFxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBfcGFja05hbWU7XHJcbiAgICB9XHJcblxyXG4gICAgXHJcbiAgICBzZXRcclxuICAgIHtcclxuICAgICAgICBTZXRQcm9wZXJ0eTxzdHJpbmc+KHJlZiBfcGFja05hbWUsIHZhbHVlKTtcclxuICAgIH1cclxuICAgIFxyXG59cHVibGljIHN0cmluZyBOYW1lXHJcbntcclxuICAgIGdldFxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBQYWNrTmFtZTtcclxuICAgIH1cclxufXB1YmxpYyBzdHJpbmcgSW1hZ2VVUkxcclxue1xyXG4gICAgZ2V0XHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIFBhY2tJbWFnZTtcclxuICAgIH1cclxufVxyXG4gICAgICAgIHB1YmxpYyBzdHJpbmcgRGVzY3JpcHRpb25cclxue1xyXG4gICAgZ2V0XHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIF9kZXNjcmlwdGlvbjtcclxuICAgIH1cclxuXHJcbiAgICBcclxuICAgIHNldFxyXG4gICAge1xyXG4gICAgICAgIFNldFByb3BlcnR5PHN0cmluZz4ocmVmIF9kZXNjcmlwdGlvbiwgdmFsdWUpO1xyXG4gICAgfVxyXG4gICAgXHJcbn1cclxuICAgICAgICBwdWJsaWMgc3RyaW5nIFBhY2tJbWFnZVxyXG57XHJcbiAgICBnZXRcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gX3BhY2tJbWFnZTtcclxuICAgIH1cclxuXHJcbiAgICBcclxuICAgIHNldFxyXG4gICAge1xyXG4gICAgICAgIFNldFByb3BlcnR5PHN0cmluZz4ocmVmIF9wYWNrSW1hZ2UsIHZhbHVlKTtcclxuICAgIH1cclxuICAgIFxyXG59XHJcbiAgICAgICAgcHVibGljIE9iamVjdFBhY2soKVxyXG4gICAgICAgIHtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBPYmplY3RQYWNrKHN0cmluZyBuYW1lLHN0cmluZyBkZXNjcmlwdGlvbilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFBhY2tOYW1lID0gbmFtZTtcclxuICAgICAgICAgICAgRGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbjtcclxuICAgICAgICAgICAgUGFja0ltYWdlID0gXCJodHRwczovL3ZpYS5wbGFjZWhvbGRlci5jb20vMTUwXCI7XHJcbiAgICAgICAgfVxyXG5cbiAgICBcbnByaXZhdGUgTGlzdDxPYmplY3RNZWFzdXJlbWVudD4gX19Qcm9wZXJ0eV9fSW5pdGlhbGl6ZXJfX09iamVjdE1lYXN1cmVtZW50cz1uZXcgTGlzdDxPYmplY3RNZWFzdXJlbWVudD4oKTt9XHJcbn0iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxuXHJcbm5hbWVzcGFjZSBIb3dGYXIuQ29yZS5Nb2RlbHNcclxue1xyXG4gICAgcHVibGljIGNsYXNzIE9iamVjdFJlcG9zaXRvcnlDYWNoZSA6IElPYmplY3RSZXBvc2l0b3J5XHJcbiAgICB7XHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBJQXBwIF9hcHA7XHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBMaXN0PE9iamVjdE1lYXN1cmVtZW50PiBtZWFzdXJlbWVudHM7XHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBMaXN0PE9iamVjdFBhY2s+IHBhY2tzO1xyXG5cclxuICAgICAgICBUIEdldEtleTxUPihzdHJpbmcga2V5KSB3aGVyZSBUIDogY2xhc3NcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChfYXBwLlByb3BlcnRpZXMuQ29udGFpbnNLZXkoa2V5KSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIF9hcHAuUHJvcGVydGllcy5HZXQ8VD4oa2V5KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gZGVmYXVsdChUKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBPYmplY3RSZXBvc2l0b3J5Q2FjaGUoSUFwcCBhcHApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBfYXBwID0gYXBwO1xyXG4gICAgICAgICAgICBtZWFzdXJlbWVudHMgPSBHZXRLZXk8TGlzdDxPYmplY3RNZWFzdXJlbWVudD4+KE9iamVjdEtleSkgPz8gbmV3IExpc3Q8T2JqZWN0TWVhc3VyZW1lbnQ+KCk7XHJcbiAgICAgICAgICAgIHBhY2tzID0gR2V0S2V5PExpc3Q8T2JqZWN0UGFjaz4+KFBhY2tLZXkpID8/IG5ldyBMaXN0PE9iamVjdFBhY2s+KCk7XHJcbiAgICAgICAgICAgIGlmICghU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5Bbnk8T2JqZWN0TWVhc3VyZW1lbnQ+KG1lYXN1cmVtZW50cykpXHJcbiAgICAgICAgICAgICAgICBPYmplY3RSZXBvc2l0b3J5U2VlZGVyLlN0YXJ0dXAodGhpcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyB2b2lkIERpc3Bvc2UoKVxyXG4gICAgICAgIHtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZvaWQgSW5zZXJ0S2V5KHN0cmluZyBrZXksIG9iamVjdCBkYXRhKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKF9hcHAuUHJvcGVydGllcy5Db250YWluc0tleShrZXkpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBfYXBwLlByb3BlcnRpZXMuU2V0KGtleSxkYXRhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIF9hcHAuUHJvcGVydGllcy5BZGQoa2V5LCBkYXRhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBhc3luYyB2b2lkIFNhdmVDaGFuZ2VzKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKCFTaG91bGRTYXZlKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgSW5zZXJ0S2V5KE9iamVjdEtleSwgbWVhc3VyZW1lbnRzKTtcclxuICAgICAgICAgICAgSW5zZXJ0S2V5KFBhY2tLZXksIHBhY2tzKTtcclxuICAgICAgICAgICAgYXdhaXQgX2FwcC5TYXZlUHJvcGVydGllc0FzeW5jKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgYm9vbCBTaG91bGRTYXZlIHsgZ2V0OyBzZXQ7IH1cclxuXHJcbiAgICAgICAgcHVibGljIE9iamVjdE1lYXN1cmVtZW50IEdldE9iamVjdE1lYXN1cmVtZW50KHN0cmluZyBuYW1lKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIGRhdGEgPSBHZXRPYmplY3RNZWFzdXJlbWVudHMoKTtcclxuICAgICAgICAgICAgcmV0dXJuIFN5c3RlbS5MaW5xLkVudW1lcmFibGUuRmlyc3RPckRlZmF1bHQ8T2JqZWN0TWVhc3VyZW1lbnQ+KGRhdGEsKEZ1bmM8T2JqZWN0TWVhc3VyZW1lbnQsYm9vbD4pKHAgPT4gcC5TaW5nbGVOYW1lLlRvTG93ZXIoKSA9PSBuYW1lLlRvTG93ZXIoKSB8fCBwLlBsdXJhbE5hbWUuVG9Mb3dlcigpID09IG5hbWUuVG9Mb3dlcigpKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgY29uc3Qgc3RyaW5nIE9iamVjdEtleSA9IFwiT2JqZWN0TWVhc3VyZW1lbnRzXCI7XHJcbiAgICAgICAgcHVibGljIGNvbnN0IHN0cmluZyBQYWNrS2V5ID0gXCJPYmplY3RQYWNrc1wiO1xyXG4gICAgICAgIHB1YmxpYyBJRW51bWVyYWJsZTxPYmplY3RNZWFzdXJlbWVudD4gR2V0T2JqZWN0TWVhc3VyZW1lbnRzKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBPYmplY3RSZXBvc2l0b3J5U2VlZGVyLlNldHVwVHJlZShtZWFzdXJlbWVudHMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgdm9pZCBBZGRPYmplY3QoT2JqZWN0TWVhc3VyZW1lbnQgbWVhc3VyZW1lbnQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAobWVhc3VyZW1lbnQuT2JqZWN0UGFja05hbWUgPT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBJbnZhbGlkT3BlcmF0aW9uRXhjZXB0aW9uKFwibXVzdCBoYXZlIGEgcGFjayBuYW1lXCIpO1xyXG5cclxuICAgICAgICAgICAgaWYgKG1lYXN1cmVtZW50LlBhcmVudE1lYXN1cmVtZW50U2luZ2xlTmFtZSA9PSBudWxsICYmIG1lYXN1cmVtZW50Lk1lYXN1cmVtZW50ICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICBtZWFzdXJlbWVudC5QYXJlbnRNZWFzdXJlbWVudFNpbmdsZU5hbWUgPSBtZWFzdXJlbWVudC5NZWFzdXJlbWVudC5TaW5nbGVOYW1lO1xyXG4gICAgICAgICAgICBlbHNlIGlmIChtZWFzdXJlbWVudC5QYXJlbnRNZWFzdXJlbWVudFNpbmdsZU5hbWUgIT0gbnVsbCAmJiBtZWFzdXJlbWVudC5NZWFzdXJlbWVudCA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgbWVhc3VyZW1lbnQuTWVhc3VyZW1lbnQgPVxyXG5TeXN0ZW0uTGlucS5FbnVtZXJhYmxlLkZpcnN0T3JEZWZhdWx0PE9iamVjdE1lYXN1cmVtZW50PiggICAgICAgICAgICAgICAgICAgIG1lYXN1cmVtZW50cywoRnVuYzxPYmplY3RNZWFzdXJlbWVudCxib29sPikocCA9PiBwLlNpbmdsZU5hbWUgPT0gbWVhc3VyZW1lbnQuUGFyZW50TWVhc3VyZW1lbnRTaW5nbGVOYW1lKSk7XHJcbiAgICAgICAgICAgIGlmIChtZWFzdXJlbWVudC5PYmplY3RQYWNrTmFtZSA9PSBudWxsICYmIG1lYXN1cmVtZW50Lk9iamVjdFBhY2sgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgIG1lYXN1cmVtZW50Lk9iamVjdFBhY2tOYW1lID0gbWVhc3VyZW1lbnQuT2JqZWN0UGFjay5QYWNrTmFtZTtcclxuICAgICAgICAgICAgZWxzZSBpZiAobWVhc3VyZW1lbnQuT2JqZWN0UGFja05hbWUgIT0gbnVsbCAmJiBtZWFzdXJlbWVudC5PYmplY3RQYWNrID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICBtZWFzdXJlbWVudC5PYmplY3RQYWNrID0gU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5GaXJzdE9yRGVmYXVsdDxPYmplY3RQYWNrPihwYWNrcywoRnVuYzxPYmplY3RQYWNrLGJvb2w+KShwID0+IHAuUGFja05hbWUgPT0gbWVhc3VyZW1lbnQuT2JqZWN0UGFja05hbWUpKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBwYWNrID0gU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5GaXJzdDxPYmplY3RQYWNrPihwYWNrcywoRnVuYzxPYmplY3RQYWNrLGJvb2w+KShwID0+IHAuUGFja05hbWUgPT0gbWVhc3VyZW1lbnQuT2JqZWN0UGFja05hbWUpKTtcclxuICAgICAgICAgICAgaWYgKFN5c3RlbS5MaW5xLkVudW1lcmFibGUuQW55PE9iamVjdE1lYXN1cmVtZW50PihwYWNrLk9iamVjdE1lYXN1cmVtZW50cywoRnVuYzxPYmplY3RNZWFzdXJlbWVudCxib29sPikocCA9PiBwLlNpbmdsZU5hbWUgPT0gbWVhc3VyZW1lbnQuU2luZ2xlTmFtZSkpICE9IHRydWUpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHBhY2suT2JqZWN0TWVhc3VyZW1lbnRzLkFkZChtZWFzdXJlbWVudCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIG1lYXN1cmVtZW50cy5BZGQobWVhc3VyZW1lbnQpO1xyXG4gICAgICAgICAgICBTYXZlQ2hhbmdlcygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgUmVtb3ZlT2JqZWN0KE9iamVjdE1lYXN1cmVtZW50IG1lYXN1cmVtZW50KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbWVhc3VyZW1lbnRzLlJlbW92ZShtZWFzdXJlbWVudCk7XHJcbiAgICAgICAgICAgIFNhdmVDaGFuZ2VzKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgSUVudW1lcmFibGU8T2JqZWN0UGFjaz4gR2V0T2JqZWN0UGFja3MoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIHBhY2tzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgQWRkUGFjayhPYmplY3RQYWNrIHBhY2spXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBwYWNrcy5BZGQocGFjayk7XHJcbiAgICAgICAgICAgIFNhdmVDaGFuZ2VzKCk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgUmVtb3ZlUGFjayhPYmplY3RQYWNrIHBhY2spXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBwYWNrcy5SZW1vdmUocGFjayk7XHJcbiAgICAgICAgICAgIFNhdmVDaGFuZ2VzKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBVcGRhdGVPYmplY3QoT2JqZWN0TWVhc3VyZW1lbnQgc2VsZWN0ZWRPYmplY3QpXHJcbiAgICAgICAge1xyXG5cclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBwdWJsaWMgT2JqZWN0TWVhc3VyZW1lbnQgTmV3T2JqZWN0KHN0cmluZyBwbHVyYWwsIHN0cmluZyBzaW5nbGUsIGRvdWJsZSB2YWx1ZSwgT2JqZWN0TWVhc3VyZW1lbnQgcGFyZW50LCBzdHJpbmcgcGFjaylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBPYmplY3RSZXBvc2l0b3J5U2VlZGVyLk5ld09iamVjdEFjdGlvbihwbHVyYWwsIHNpbmdsZSwgdmFsdWUsIHBhcmVudC5TaW5nbGVOYW1lLCBwYWNrLCB0aGlzKTtcclxuICAgICAgICB9XHJcblxuICAgIFxucHJpdmF0ZSBib29sIF9fUHJvcGVydHlfX0luaXRpYWxpemVyX19TaG91bGRTYXZlPXRydWU7fVxyXG59IiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBCcmlkZ2UuSHRtbDU7XHJcbnVzaW5nIE5ld3RvbnNvZnQuSnNvbjtcclxuXHJcbm5hbWVzcGFjZSBIb3dGYXIuQ29yZS5Nb2RlbHNcclxue1xyXG4gICAgcHVibGljIGNsYXNzIFByb3BlcnRpZXMgOiBJUHJvcGVydGllc1xyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBQcm9wZXJ0aWVzKClcclxuICAgICAgICB7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgQWRkKHN0cmluZyBrZXksIG9iamVjdCBvYmopXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoV2luZG93LkxvY2FsU3RvcmFnZSA9PSBudWxsKSByZXR1cm47XHJcblxyXG4gICAgICAgICAgICB2YXIgc3RyID0gSnNvbkNvbnZlcnQuU2VyaWFsaXplT2JqZWN0KG9iaik7XHJcbiAgICAgICAgICAgIC8vQ29uc29sZS5Xcml0ZUxpbmUoJFwiY2FjaGVkIHVwZGF0ZWQge2tleX1cIik7XHJcbiAgICAgICAgICAgIFdpbmRvdy5Mb2NhbFN0b3JhZ2UuU2V0SXRlbShrZXksIHN0cik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgYm9vbCBDb250YWluc0tleShzdHJpbmcga2V5KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKFdpbmRvdy5Mb2NhbFN0b3JhZ2UgPT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgcmV0dXJuIFdpbmRvdy5Mb2NhbFN0b3JhZ2UuR2V0SXRlbShrZXkpICE9IG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgVCBHZXQ8VD4oc3RyaW5nIGtleSkgd2hlcmUgVCA6IGNsYXNzXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoV2luZG93LkxvY2FsU3RvcmFnZSA9PSBudWxsKSBcclxuICAgICAgICAgICAgICAgIHJldHVybiBkZWZhdWx0KFQpO1xyXG5cclxuICAgICAgICAgICAgdmFyIHZhbHVlID0gV2luZG93LkxvY2FsU3RvcmFnZS5HZXRJdGVtKGtleSk7XHJcbiAgICAgICAgICAgIGlmICh2YWx1ZSA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRlZmF1bHQoVCk7XHJcbiAgICAgICAgICAgIHJldHVybiBKc29uQ29udmVydC5EZXNlcmlhbGl6ZU9iamVjdDxUPih2YWx1ZS5Ub1N0cmluZygpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFNldChzdHJpbmcga2V5LCBvYmplY3Qgb2JqKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQWRkKGtleSwgb2JqKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJ1c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxuXHJcbm5hbWVzcGFjZSBIb3dGYXIuQ29yZS5Nb2RlbHNcclxue1xyXG4gICAgaW50ZXJuYWwgY2xhc3MgTWVhc3VyZW1lbnRDb21wYXJlIDogSUNvbXBhcmVyPE9iamVjdE1lYXN1cmVtZW50PlxyXG4gICAge1xyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgSU1lYXN1cmVDb252ZXJ0ZXJzIF9jb252ZXJ0ZXJzO1xyXG5cclxuICAgICAgICBwdWJsaWMgTWVhc3VyZW1lbnRDb21wYXJlKElNZWFzdXJlQ29udmVydGVycyBjb252ZXJ0ZXJzKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgX2NvbnZlcnRlcnMgPSBjb252ZXJ0ZXJzO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgaW50IENvbXBhcmUoT2JqZWN0TWVhc3VyZW1lbnQgeCwgT2JqZWN0TWVhc3VyZW1lbnQgeSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciB4dG95ID0gX2NvbnZlcnRlcnMuQ29udmVydCh4LCB5KTtcclxuICAgICAgICAgICAgaWYgKHh0b3kgPiAxKSByZXR1cm4gMTtcclxuICAgICAgICAgICAgcmV0dXJuIC0xO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdCn0K

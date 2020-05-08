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
                return Bridge.getDefaultValue(T);
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
                    return Bridge.getDefaultValue(T);
                }

                var value = window.localStorage.getItem(key);
                if (value == null) {
                    return Bridge.getDefaultValue(T);
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

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICJIb3dGYXIuQnJpZGdlLmpzIiwKICAic291cmNlUm9vdCI6ICIiLAogICJzb3VyY2VzIjogWyJBcHAuY3MiLCIuLi9Ib3dGYXIuQ29yZS9CaW5kYWJsZUJhc2UuY3MiLCJBZGRNb2RlbC5jcyIsIi4uL0hvd0Zhci5Db3JlL01vZGVscy9PYmplY3RSZXBvc2l0b3J5U2VlZGVyLmNzIiwiQXBwTW9kZWwuY3MiLCIuLi9Ib3dGYXIuQ29yZS9Nb2RlbHMvTWVhc3VyZUNvbnZlcnRlcnMuY3MiLCIuLi9Ib3dGYXIuQ29yZS9Nb2RlbHMvT2JqZWN0TWVhc3VyZW1lbnQuY3MiLCIuLi9Ib3dGYXIuQ29yZS9Nb2RlbHMvT2JqZWN0UGFjay5jcyIsIi4uL0hvd0Zhci5Db3JlL01vZGVscy9PYmplY3RSZXBvc2l0b3J5Q2FjaGUuY3MiLCJQcm9wZXJ0aWVzLmNzIiwiLi4vSG93RmFyLkNvcmUvTW9kZWxzL01lYXN1cmVtZW50Q29tcGFyZS5jcyJdLAogICJuYW1lcyI6IFsiIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7WUF5QllBLElBQUlBOzs7Ozt3Q0FUMEJBO29CQUU5QkEsT0FBT0EsaUJBQXdDQTs7Ozs7Ozs7Ozs7Ozs7bUNDUjNCQSxHQUFHQSxVQUFnQkEsT0FBU0EsUUFBc0JBOzs7Z0JBRXRFQSxJQUFJQSxxQkFBQ0EsY0FBVUEsT0FBS0EsMEJBQWdCQSxTQUFPQSxBQUFPQTtvQkFFOUNBLGFBQVdBO29CQUNYQSx1QkFBa0JBO29CQUNsQkEsNkJBQVFBLFFBQUtBLEFBQXFDQSxXQUFpQkE7Ozs7eUNBT2xDQTs7Z0JBRXJDQSwyQ0FBaUJBLFFBQUtBLEFBQXFDQSxxQkFBdUJBLE1BQU1BLElBQUlBLCtDQUF5QkEsaUJBQWdCQTs7Ozs7Ozs7Ozs7Ozs0QkNiekhBLFlBQStCQTs7Z0JBRTNDQSxZQUFPQTtnQkFDUEEsZ0JBQVdBO2dCQUNYQSxZQUFPQTtnQkFDUEEsV0FBTUE7O2dCQUVOQSw0RUFBc0NBLEFBQTRCQTs7b0JBQUtBLHNCQUFpQkEsa0RB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R0FBR0E7Z0JBQ2xDQSxJQUFJQTtvQkFBVUE7O2dCQUNkQSxPQUFPQSIsCiAgInNvdXJjZXNDb250ZW50IjogWyJ1c2luZyBCcmlkZ2U7XHJcbnVzaW5nIE5ld3RvbnNvZnQuSnNvbjtcclxudXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcclxudXNpbmcgQnJpZGdlLkh0bWw1O1xyXG51c2luZyBIb3dGYXIuQ29yZS5Nb2RlbHM7XHJcblxyXG5uYW1lc3BhY2UgSG93RmFyLkJyaWRnZVxyXG57XHJcblxyXG4gXHJcblxyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBBcHAgXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBzdHJpbmcgTnVtYmVyRm9ybWF0KGRvdWJsZSB4KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIFNjcmlwdC5DYWxsPHN0cmluZz4oXCJudW1iZXJXaXRoQ29tbWFzXCIsIHgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIE1haW4oKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy9XaW5kb3cuT25Mb2FkID0gZSA9PiB7IG5ldyBBcHBNb2RlbCgpOyB9O1xyXG5cclxuICAgICAgICAgICAgbmV3IEFwcE1vZGVsKCk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgXHJcbiAgICAgIFxyXG4gICAgfVxyXG59IiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29tcG9uZW50TW9kZWw7XHJcbnVzaW5nIFN5c3RlbS5SdW50aW1lLkNvbXBpbGVyU2VydmljZXM7XHJcblxyXG5uYW1lc3BhY2UgSG93RmFyLkNvcmVcclxue1xyXG4gICAgcHVibGljIGNsYXNzIEJpbmRhYmxlQmFzZSA6IElOb3RpZnlQcm9wZXJ0eUNoYW5nZWRcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgZXZlbnQgUHJvcGVydHlDaGFuZ2VkRXZlbnRIYW5kbGVyIFByb3BlcnR5Q2hhbmdlZDtcclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgU2V0UHJvcGVydHk8VD4ocmVmIFQgcHJvcGVydHksIFQgdmFsdWUsIEFjdGlvbiBhY3Rpb24gPSBudWxsLCBbQ2FsbGVyTWVtYmVyTmFtZV0gc3RyaW5nIG5hbWUgPSBudWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKChwcm9wZXJ0eSE9bnVsbD9wcm9wZXJ0eS5FcXVhbHModmFsdWUpOihib29sPyludWxsKSAhPSB0cnVlKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBwcm9wZXJ0eSA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgT25Qcm9wZXJ0eUNoYW5nZWQobmFtZSk7XHJcbiAgICAgICAgICAgICAgICBhY3Rpb24hPW51bGw/Z2xvYmFsOjpCcmlkZ2UuU2NyaXB0LkZyb21MYW1iZGEoKCk9PmFjdGlvbi5JbnZva2UoKSk6bnVsbDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcbiNpZiAhQlJJREdFXHJcbiAgICAgICAgW0hvd0Zhci5Db3JlLkFubm90YXRpb25zLk5vdGlmeVByb3BlcnR5Q2hhbmdlZEludm9jYXRvcl1cclxuI2VuZGlmXHJcbiAgICAgICAgcHJvdGVjdGVkIHZpcnR1YWwgdm9pZCBPblByb3BlcnR5Q2hhbmdlZChbQ2FsbGVyTWVtYmVyTmFtZV0gc3RyaW5nIHByb3BlcnR5TmFtZSA9IG51bGwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBQcm9wZXJ0eUNoYW5nZWQhPW51bGw/Z2xvYmFsOjpCcmlkZ2UuU2NyaXB0LkZyb21MYW1iZGEoKCk9PlByb3BlcnR5Q2hhbmdlZC5JbnZva2UodGhpcywgbmV3IFByb3BlcnR5Q2hhbmdlZEV2ZW50QXJncyhwcm9wZXJ0eU5hbWUpKSk6bnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIEJyaWRnZTtcclxudXNpbmcgQnJpZGdlLkh0bWw1O1xyXG5cclxubmFtZXNwYWNlIEhvd0Zhci5Db3JlLk1vZGVsc1xyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgQWRkTW9kZWxcclxuICAgIHtcclxuICAgICAgICBwcml2YXRlIEhUTUxJbnB1dEVsZW1lbnQgbmFtZTtcclxuICAgICAgICBwcml2YXRlIEhUTUxJbnB1dEVsZW1lbnQgcXVhbnRpdHk7XHJcbiAgICAgICAgcHJpdmF0ZSBIVE1MU2VsZWN0RWxlbWVudCB1bml0O1xyXG4gICAgICAgIHByaXZhdGUgSFRNTEVsZW1lbnQgYnRuO1xyXG4gICAgICAgIHB1YmxpYyBBZGRNb2RlbChJTWVhc3VyZUNvbnZlcnRlcnMgY29udmVydGVycywgQWN0aW9uPE9iamVjdE1lYXN1cmVtZW50PiBvbkFkZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG5hbWUgPSBEb2N1bWVudC5HZXRFbGVtZW50QnlJZDxIVE1MSW5wdXRFbGVtZW50PihcImFkZF9uYW1lXCIpO1xyXG4gICAgICAgICAgICBxdWFudGl0eSA9IERvY3VtZW50LkdldEVsZW1lbnRCeUlkPEhUTUxJbnB1dEVsZW1lbnQ+KFwiYWRkX251bVwiKTtcclxuICAgICAgICAgICAgdW5pdCA9IERvY3VtZW50LkdldEVsZW1lbnRCeUlkPEhUTUxTZWxlY3RFbGVtZW50PihcImFkZF91bml0XCIpO1xyXG4gICAgICAgICAgICBidG4gPSBEb2N1bWVudC5HZXRFbGVtZW50QnlJZChcImFkZF9idG5cIik7XHJcblxyXG4gICAgICAgICAgICBjb252ZXJ0ZXJzLk9iamVjdE1lYXN1cmVtZW50cy5Gb3JFYWNoKChBY3Rpb248T2JqZWN0TWVhc3VyZW1lbnQ+KShwID0+IHVuaXQuQXBwZW5kQ2hpbGQobmV3IEhUTUxPcHRpb25FbGVtZW50KCkgeyBUZXh0ID0gcC5QbHVyYWxOYW1lIH0pKSk7XHJcbiAgICAgICAgICAgIFNjcmlwdC5DYWxsKFwidXBkYXRlXCIpO1xyXG4gICAgICAgICAgICBidG4uT25DbGljayA9IGUgPT5cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IGNvbnZlcnRlcnMuTmV3T2JqZWN0KG5hbWUuVmFsdWUsIG5hbWUuVmFsdWUsIHF1YW50aXR5LlZhbHVlQXNOdW1iZXIsIHVuaXQuVmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgbmFtZS5WYWx1ZSA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICBxdWFudGl0eS5WYWx1ZSA9IFwiXCI7XHJcblxyXG4gICAgICAgICAgICAgICAgb25BZGQocmVzdWx0KTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJ1c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLk9iamVjdE1vZGVsO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxuXHJcbm5hbWVzcGFjZSBIb3dGYXIuQ29yZS5Nb2RlbHNcclxue1xyXG4gICAgcHVibGljIHN0YXRpYyBjbGFzcyBPYmplY3RSZXBvc2l0b3J5U2VlZGVyXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIGNvbnN0IHN0cmluZyBNZXRyaWMgPSBcIk1ldHJpY1wiO1xyXG4gICAgICAgIHB1YmxpYyBjb25zdCBzdHJpbmcgSW1wZXJpYWwgPSBcIkltcGVyaWFsXCI7XHJcbiAgICAgICAgcHVibGljIGNvbnN0IHN0cmluZyBTcGFjZSA9IFwiU3BhY2VcIjtcclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIFN0YXJ0dXAoSU9iamVjdFJlcG9zaXRvcnkgcmVwb3NpdG9yeSlcclxuICAgICAgICB7XHJcbiNpZiBCUklER0VcclxuICAgICAgICAgICAgdmFyIG9iamVjdFBhY2tzID0gbmV3IExpc3Q8T2JqZWN0UGFjaz4oKTtcclxuI2Vsc2VcclxuICAgICAgICAgICAgICAgIHZhciBvYmplY3RQYWNrcyA9IG5ldyBPYnNlcnZhYmxlQ29sbGVjdGlvbjxPYmplY3RQYWNrPigpO1xyXG4jZW5kaWZcclxuICAgICAgICAgICAgdmFyIGNlbnRpbWV0ZXIgPSBuZXcgT2JqZWN0TWVhc3VyZW1lbnQoXCJDZW50aW1ldGVyXCIsIFwiQ2VudGltZXRlcnNcIikgeyBWYWx1ZSA9IDEgfTtcclxuICAgICAgICAgICAgY2VudGltZXRlci5PYmplY3RQYWNrTmFtZSA9IE1ldHJpYztcclxuICAgICAgICAgICAgb2JqZWN0UGFja3MuQWRkKG5ldyBPYmplY3RQYWNrKFwiQ3VzdG9tXCIsIFwiT2JqZWN0cyB0aGF0IGFyZSBtYWRlIGluIHRoZSBhcHAgYXJlIHBsYWNlZCBoZXJlLlwiKSB7IFBhY2tJbWFnZSA9IFwiQXNzZXRzL2Jsb2NrLnBuZ1wiIH0pO1xyXG4gICAgICAgICAgICBvYmplY3RQYWNrcy5BZGQobmV3IE9iamVjdFBhY2soSW1wZXJpYWwsIFwiQSBkZWZhdWx0IHBhY2thZ2UgZm9yIHRoZSBVUyBtZWFzdXJlbWVudCBzeXN0ZW1cIikgeyBQYWNrSW1hZ2UgPSBcImh0dHBzOi8vbG9nb2Vwcy5jb20vd3AtY29udGVudC91cGxvYWRzLzIwMTMvMDYvZmxhZy1vZi11c2EtdmVjdG9yLWxvZ28ucG5nXCIgfSk7XHJcbiAgICAgICAgICAgIG9iamVjdFBhY2tzLkFkZChuZXcgT2JqZWN0UGFjayhNZXRyaWMsIFwiVGhlIG1ldHJpYyBzeXN0ZW0uICBVc2VkIGJ5IGV2ZXJ5b25lIGV4Y2VwdCB0aGUgVVNcIikgeyBQYWNrSW1hZ2UgPSBcImh0dHA6Ly93d3cua25pZ2h0c3RlbXBsYXJvcmRlci5vcmcvd3AtY29udGVudC91cGxvYWRzLzIwMTYvMDYvVU4tU0VBTC1TdHlsaXplZC01MDAtQnJvd24ucG5nXCIgfSk7XHJcbiAgICAgICAgICAgIG9iamVjdFBhY2tzLkFkZChuZXcgT2JqZWN0UGFjayhTcGFjZSwgXCJPYmplY3RzIGFuZCBNZWFzdXJlbWVudHMgaW4gc3BhY2VcIikgeyBQYWNrSW1hZ2UgPSBcImh0dHBzOi8vc2VwLnlpbWcuY29tL2F5L3NreWltYWdlL25hc2Etc3BhY2UtbWlzc2lvbnMtOS5qcGdcIiB9KTtcclxuICAgICAgICAgICAgdmFyIHBhY2tzID0gU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5Ub0xpc3Q8T2JqZWN0UGFjaz4ocmVwb3NpdG9yeS5HZXRPYmplY3RQYWNrcygpKTtcclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIG9iamVjdFBhY2sgaW4gb2JqZWN0UGFja3MpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmICghU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5TZWxlY3Q8T2JqZWN0UGFjayxzdHJpbmc+KHBhY2tzLChTeXN0ZW0uRnVuYzxPYmplY3RQYWNrLHN0cmluZz4pKHAgPT4gcC5QYWNrTmFtZSkpLkNvbnRhaW5zKG9iamVjdFBhY2suUGFja05hbWUpKVxyXG4gICAgICAgICAgICAgICAgICAgIHJlcG9zaXRvcnkuQWRkUGFjayhvYmplY3RQYWNrKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy9kYi5TYXZlQ2hhbmdlcygpO1xyXG4gICAgICAgICAgICBpZiAoU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5BbGw8T2JqZWN0TWVhc3VyZW1lbnQ+KHJlcG9zaXRvcnkuR2V0T2JqZWN0TWVhc3VyZW1lbnRzKCksKFN5c3RlbS5GdW5jPE9iamVjdE1lYXN1cmVtZW50LGJvb2w+KShwID0+IHAuU2luZ2xlTmFtZSAhPSBjZW50aW1ldGVyLlNpbmdsZU5hbWUpKSlcclxuICAgICAgICAgICAgICAgIHJlcG9zaXRvcnkuQWRkT2JqZWN0KGNlbnRpbWV0ZXIpO1xyXG4gICAgICAgICAgICAvL3JlcG9zaXRvcnkuVXBkYXRlUGFjayhJbXBlcmlhbCwgY2VudGltZXRlcik7XHJcbiAgICAgICAgICAgIHZhciBpbmNoZXMgPSByZXBvc2l0b3J5Lk5ld09iamVjdChcIkluY2hlc1wiLCBcIkluY2hcIiwgMi41NCwgY2VudGltZXRlciwgSW1wZXJpYWwpO1xyXG4gICAgICAgICAgICB2YXIgZmVldCA9IHJlcG9zaXRvcnkuTmV3T2JqZWN0KFwiRmVldFwiLCBcIkZvb3RcIiwgMTIsIGluY2hlcywgSW1wZXJpYWwpO1xyXG4gICAgICAgICAgICB2YXIgbWlsZSA9IHJlcG9zaXRvcnkuTmV3T2JqZWN0KFwiTWlsZXNcIiwgXCJNaWxlXCIsIDUyODAsIGZlZXQsIEltcGVyaWFsKTtcclxuICAgICAgICAgICAgdmFyIG1ldGVyID0gcmVwb3NpdG9yeS5OZXdPYmplY3QoXCJNZXRlcnNcIiwgXCJNZXRlclwiLCAxMDAsIGNlbnRpbWV0ZXIsIE1ldHJpYyk7XHJcbiAgICAgICAgICAgIHZhciBraWxvTWV0ZXIgPSByZXBvc2l0b3J5Lk5ld09iamVjdChcIktpbG9tZXRlcnNcIiwgXCJLaWxvbWV0ZXJcIiwgMTAwMCwgbWV0ZXIsIE1ldHJpYyk7XHJcblxyXG4gICAgICAgICAgICB2YXIgbmFub01ldGVyID0gcmVwb3NpdG9yeS5OZXdPYmplY3QoXCJOYW5vbWV0ZXJzXCIsIFwiTmFub21ldGVyXCIsIDAuMDAwMDAwMSwgY2VudGltZXRlciwgTWV0cmljKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBlYXJ0aCA9IHJlcG9zaXRvcnkuTmV3T2JqZWN0KFwiRWFydGhzXCIsIFwiRWFydGhcIiwgMjUwMDAsIG1pbGUsIFNwYWNlKTtcclxuICAgICAgICAgICAgdmFyIHN1biA9IHJlcG9zaXRvcnkuTmV3T2JqZWN0KFwiU3Vuc1wiLCBcIlN1blwiLCAxMDMsIGVhcnRoLCBTcGFjZSk7XHJcbiAgICAgICAgICAgIHZhciBkaXN0ID0gcmVwb3NpdG9yeS5OZXdPYmplY3QoXCJEaXN0YW5jZSBmcm9tIEVhcnRoIHRvIFN1blwiLCBcIkRpc3RhbmNlIGZyb20gRWFydGggdG8gU3VuXCIsIDkyOTU1ODA3LCBtaWxlLCBTcGFjZSk7XHJcbiAgICAgICAgICAgIHZhciBsaWdodHllYXIgPSByZXBvc2l0b3J5Lk5ld09iamVjdChcIkxpZ2h0eWVhcnNcIiwgXCJMaWdodHllYXJcIiwgNTg3ODYyNTAwMDAwMCwgbWlsZSwgU3BhY2UpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGFscGhhID0gcmVwb3NpdG9yeS5OZXdPYmplY3QoXCJEaXN0YW5jZSBmcm9tIEVhcnRoIHRvIEFscGhhIENlbnRhdXJpXCIsIFwiRGlzdGFuY2UgZnJvbSBFYXJ0aCB0byBBbHBoYSBDZW50YXVyaVwiLCA0LjQsIGxpZ2h0eWVhciwgU3BhY2UpO1xyXG4gICAgICAgICAgICB2YXIgcGljbyA9IHJlcG9zaXRvcnkuTmV3T2JqZWN0KFwiUGljb21ldGVyc1wiLCBcIlBpY29tZXRlclwiLCAwLjAwMSwgbmFub01ldGVyLCBNZXRyaWMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBPYmplY3RNZWFzdXJlbWVudCBOZXdPYmplY3RBY3Rpb24oc3RyaW5nIHBsdXJhbE5hbWUsIHN0cmluZyBzaW5nbGVOYW1lLCBkb3VibGUgdmFsdWUsIHN0cmluZyBtZWFzdXJlbWVudFN0ciwgc3RyaW5nIHBhY2ssIElPYmplY3RSZXBvc2l0b3J5IHJlcG9zaXRvcnkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAobWVhc3VyZW1lbnRTdHIgIT0gbnVsbCAmJiBTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLkFsbDxPYmplY3RNZWFzdXJlbWVudD4ocmVwb3NpdG9yeS5HZXRPYmplY3RNZWFzdXJlbWVudHMoKSwoU3lzdGVtLkZ1bmM8T2JqZWN0TWVhc3VyZW1lbnQsYm9vbD4pKHAgPT4gcC5TaW5nbGVOYW1lICE9IHNpbmdsZU5hbWUpKSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyIG1lYXN1cmUgPSByZXBvc2l0b3J5LkdldE9iamVjdE1lYXN1cmVtZW50KG1lYXN1cmVtZW50U3RyKTtcclxuICAgICAgICAgICAgICAgIGlmIChtZWFzdXJlICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG5ld09iamVjdCA9IG5ldyBPYmplY3RNZWFzdXJlbWVudChzaW5nbGVOYW1lLCBwbHVyYWxOYW1lKSB7IFZhbHVlID0gdmFsdWUsIE9iamVjdFBhY2tOYW1lID0gcGFjayB9O1xyXG4gICAgICAgICAgICAgICAgICAgIG1lYXN1cmUuQWRkKG5ld09iamVjdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVwb3NpdG9yeS5BZGRPYmplY3QobmV3T2JqZWN0KTtcclxuICAgICAgICAgICAgICAgICAgICAvL3JlcG9zaXRvcnkuVXBkYXRlUGFjayhwYWNrLCBuZXdPYmplY3QpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXdPYmplY3Q7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBJTGlzdDxPYmplY3RNZWFzdXJlbWVudD4gU2V0dXBUcmVlKElMaXN0PE9iamVjdE1lYXN1cmVtZW50PiBkYXRhKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIG9iamVjdE1lYXN1cmVtZW50IGluIGRhdGEpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChvYmplY3RNZWFzdXJlbWVudC5QYXJlbnRNZWFzdXJlbWVudFNpbmdsZU5hbWUgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBvYmplY3RNZWFzdXJlbWVudC5NZWFzdXJlbWVudCA9XHJcblN5c3RlbS5MaW5xLkVudW1lcmFibGUuRmlyc3Q8T2JqZWN0TWVhc3VyZW1lbnQ+KCAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEsKFN5c3RlbS5GdW5jPE9iamVjdE1lYXN1cmVtZW50LGJvb2w+KShwID0+IHAuU2luZ2xlTmFtZSA9PSBvYmplY3RNZWFzdXJlbWVudC5QYXJlbnRNZWFzdXJlbWVudFNpbmdsZU5hbWUpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgdCA9IFN5c3RlbS5MaW5xLkVudW1lcmFibGUuV2hlcmU8T2JqZWN0TWVhc3VyZW1lbnQ+KGRhdGEsKFN5c3RlbS5GdW5jPE9iamVjdE1lYXN1cmVtZW50LGJvb2w+KShwID0+IHAuUGFyZW50TWVhc3VyZW1lbnRTaW5nbGVOYW1lID09IG9iamVjdE1lYXN1cmVtZW50LlNpbmdsZU5hbWUpKTtcclxuICAgICAgICAgICAgICAgIG9iamVjdE1lYXN1cmVtZW50Lk9iamVjdE1lYXN1cmVtZW50cyA9IHQuVG9MaXN0KCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBkYXRhO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5UaHJlYWRpbmcuVGFza3M7XHJcbnVzaW5nIEJyaWRnZTtcclxudXNpbmcgQnJpZGdlLkh0bWw1O1xyXG51c2luZyBIb3dGYXIuQnJpZGdlO1xyXG5cclxubmFtZXNwYWNlIEhvd0Zhci5Db3JlLk1vZGVsc1xyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgQXBwTW9kZWwgOiBJQXBwXHJcbiAgICB7XHJcbiAgICAgICAgSFRNTFNlbGVjdEVsZW1lbnQgZnJvbVNlbGVjdCA9IERvY3VtZW50LkdldEVsZW1lbnRCeUlkPEhUTUxTZWxlY3RFbGVtZW50PihcImZyb21cIik7XHJcbiAgICAgICAgSFRNTFNlbGVjdEVsZW1lbnQgdG9TZWxlY3QgPSBEb2N1bWVudC5HZXRFbGVtZW50QnlJZDxIVE1MU2VsZWN0RWxlbWVudD4oXCJ0b1wiKTtcclxuICAgICAgICBIVE1MSW5wdXRFbGVtZW50IG51bSA9IERvY3VtZW50LkdldEVsZW1lbnRCeUlkPEhUTUxJbnB1dEVsZW1lbnQ+KFwibnVtXCIpO1xyXG4gICAgICAgIEhUTUxFbGVtZW50IGFuc3dlciA9IERvY3VtZW50LkdldEVsZW1lbnRCeUlkKFwiYW5zd2VyXCIpO1xyXG4gICAgICAgIHByaXZhdGUgSFRNTEVsZW1lbnQgcmV2ZXJzZWJ0biA9IERvY3VtZW50LkdldEVsZW1lbnRCeUlkKFwicmV2ZXJzZVwiKTtcclxuICAgICAgICBNZWFzdXJlQ29udmVydGVycyBjb252ZXJ0ZXI7XHJcbiAgICAgICAgcHJpdmF0ZSBIVE1MRWxlbWVudCByYW5kb21idG4gPSBEb2N1bWVudC5HZXRFbGVtZW50QnlJZChcInJhbmRvbVwiKTtcclxuICAgICAgICBSYW5kb20gcmFuZG9tID0gbmV3IFJhbmRvbSgpO1xyXG4gICAgICAgIHB1YmxpYyBBcHBNb2RlbCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjb252ZXJ0ZXIgPSBuZXcgTWVhc3VyZUNvbnZlcnRlcnMobmV3IE9iamVjdFJlcG9zaXRvcnlDYWNoZSh0aGlzKSk7XHJcbiAgICAgICAgICAgIGNvbnZlcnRlci5PYmplY3RNZWFzdXJlbWVudHMuRm9yRWFjaCgoQWN0aW9uPE9iamVjdE1lYXN1cmVtZW50PikocCA9PlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBmcm9tU2VsZWN0LkFwcGVuZENoaWxkKG5ldyBIVE1MT3B0aW9uRWxlbWVudCgpIHsgVGV4dCA9IHAuUGx1cmFsTmFtZSB9KTtcclxuICAgICAgICAgICAgICAgIHRvU2VsZWN0LkFwcGVuZENoaWxkKG5ldyBIVE1MT3B0aW9uRWxlbWVudCgpIHsgVGV4dCA9IHAuUGx1cmFsTmFtZSB9KTtcclxuICAgICAgICAgICAgfSkpO1xyXG5cclxuICAgICAgICAgICAgZnJvbVNlbGVjdC5PbkNoYW5nZSA9IGUgPT4gQ29udmVydCgpO1xyXG4gICAgICAgICAgICB0b1NlbGVjdC5PbkNoYW5nZSA9IGUgPT4gQ29udmVydCgpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHJhbmRvbWJ0biAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgcmFuZG9tYnRuLk9uQ2xpY2sgPSBlID0+IFJhbmRvbSgpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHJldmVyc2VidG4gIT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHJldmVyc2VidG4uT25DbGljayA9IGUgPT5cclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZiA9IGZyb21TZWxlY3QuU2VsZWN0ZWRJbmRleDtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdG8gPSB0b1NlbGVjdC5TZWxlY3RlZEluZGV4O1xyXG4gICAgICAgICAgICAgICAgICAgIGZyb21TZWxlY3QuU2VsZWN0ZWRJbmRleCA9IHRvO1xyXG4gICAgICAgICAgICAgICAgICAgIHRvU2VsZWN0LlNlbGVjdGVkSW5kZXggPSBmO1xyXG4gICAgICAgICAgICAgICAgICAgIFNjcmlwdC5DYWxsKFwidXBkYXRlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIENvbnZlcnQoKTtcclxuICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBudW0uT25LZXlEb3duID0gZSA9PiBDb252ZXJ0KCk7XHJcbiAgICAgICAgICAgIG51bS5Pbk1vdXNlVXAgPSBlID0+IENvbnZlcnQoKTtcclxuICAgICAgICAgICAgU2NyaXB0LkNhbGwoXCJjaG9vc2VcIik7XHJcbiAgICAgICAgICAgIFJhbmRvbSgpO1xyXG4gICAgICAgICAgICB2YXIgYWRkID0gbmV3IEFkZE1vZGVsKGNvbnZlcnRlciwgcCA9PlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZiA9IG5ldyBIVE1MT3B0aW9uRWxlbWVudCgpIHsgVGV4dCA9IHAuUGx1cmFsTmFtZSB9O1xyXG4gICAgICAgICAgICAgICAgZnJvbVNlbGVjdC5BcHBlbmRDaGlsZChmKTtcclxuICAgICAgICAgICAgICAgIHRvU2VsZWN0LkFwcGVuZENoaWxkKG5ldyBIVE1MT3B0aW9uRWxlbWVudCgpIHsgVGV4dCA9IHAuUGx1cmFsTmFtZSB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBmcm9tU2VsZWN0LlNlbGVjdGVkSW5kZXggPSBmLkluZGV4O1xyXG4gICAgICAgICAgICAgICAgU2NyaXB0LkNhbGwoXCJ1cGRhdGVcIik7XHJcbiAgICAgICAgICAgICAgICBDb252ZXJ0KCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIFJhbmRvbSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgY291bnQgPSBmcm9tU2VsZWN0Lk9wdGlvbnMuTGVuZ3RoO1xyXG5cclxuICAgICAgICAgICAgZnJvbVNlbGVjdC5TZWxlY3RlZEluZGV4ID0gcmFuZG9tLk5leHQoMCwgY291bnQgLSAxKTtcclxuICAgICAgICAgICAgdG9TZWxlY3QuU2VsZWN0ZWRJbmRleCA9IHJhbmRvbS5OZXh0KDAsIGNvdW50IC0gMSk7XHJcbiAgICAgICAgICAgIFNjcmlwdC5DYWxsKFwidXBkYXRlXCIpO1xyXG4gICAgICAgICAgICBDb252ZXJ0KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2b2lkIENvbnZlcnQoKVxyXG4gICAgICAgIHtcclxuZG91YmxlIG47XG4gICAgICAgICAgICBpZiAoZG91YmxlLlRyeVBhcnNlKG51bS5WYWx1ZSwgb3V0IG4pKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gY29udmVydGVyLkNvbnZlcnQoZnJvbVNlbGVjdC5WYWx1ZSwgdG9TZWxlY3QuVmFsdWUsIG4pO1xyXG5cclxuICAgICAgICAgICAgICAgIGFuc3dlci5UZXh0Q29udGVudCA9IHN0cmluZy5Gb3JtYXQoXCIxIHswfSA9IHsxfSB7Mn1cIixmcm9tU2VsZWN0LlZhbHVlLEFwcC5OdW1iZXJGb3JtYXQocmVzdWx0KSx0b1NlbGVjdC5WYWx1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBJUHJvcGVydGllcyBQcm9wZXJ0aWVzIHsgZ2V0OyBwcml2YXRlIHNldDsgfVxyXG4gICAgICAgIHB1YmxpYyBhc3luYyBUYXNrIFNhdmVQcm9wZXJ0aWVzQXN5bmMoKVxyXG4gICAgICAgIHtcclxuXHJcbiAgICAgICAgfVxyXG5cblxyXG5cclxuXHJcblxyXG4gICAgXG5wcml2YXRlIElQcm9wZXJ0aWVzIF9fUHJvcGVydHlfX0luaXRpYWxpemVyX19Qcm9wZXJ0aWVzPW5ldyBQcm9wZXJ0aWVzKCk7fVxyXG59IiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLk9iamVjdE1vZGVsO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxuXHJcbm5hbWVzcGFjZSBIb3dGYXIuQ29yZS5Nb2RlbHNcclxue1xyXG4gICAgcHVibGljIGNsYXNzIE1lYXN1cmVDb252ZXJ0ZXJzIDogSU1lYXN1cmVDb252ZXJ0ZXJzXHJcbiAgICB7XHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBJT2JqZWN0UmVwb3NpdG9yeSBfcmVwb3NpdG9yeTtcclxucHVibGljIE9iamVjdE1lYXN1cmVtZW50IENlbnRpbWV0ZXJcclxue1xyXG4gICAgZ2V0XHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIEZpbmQoXCJDZW50aW1ldGVyXCIpO1xyXG4gICAgfVxyXG59ICAgICAgICBwdWJsaWMgTWVhc3VyZUNvbnZlcnRlcnMoSU9iamVjdFJlcG9zaXRvcnkgcmVwb3NpdG9yeSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIF9yZXBvc2l0b3J5ID0gcmVwb3NpdG9yeTtcclxuICAgICAgICAgICAgVXBkYXRlTGlzdCgpO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG5cclxuI2lmIEJSSURHRVxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBVcGRhdGVMaXN0KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIE9iamVjdE1lYXN1cmVtZW50cyA9IG5ldyBMaXN0PE9iamVjdE1lYXN1cmVtZW50PihTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLk9yZGVyQnk8T2JqZWN0TWVhc3VyZW1lbnQsT2JqZWN0TWVhc3VyZW1lbnQ+KEdldEFsbCgpLChGdW5jPE9iamVjdE1lYXN1cmVtZW50LE9iamVjdE1lYXN1cmVtZW50PikocCA9PiBwKSwgbmV3IE1lYXN1cmVtZW50Q29tcGFyZSh0aGlzKSkpO1xyXG4gICAgICAgICAgICBPYmplY3RQYWNrcyA9IG5ldyBMaXN0PE9iamVjdFBhY2s+KF9yZXBvc2l0b3J5LkdldE9iamVjdFBhY2tzKCkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgTGlzdDxPYmplY3RQYWNrPiBPYmplY3RQYWNrcyB7IGdldDsgc2V0OyB9XHJcbiAgICAgICAgcHVibGljIExpc3Q8T2JqZWN0TWVhc3VyZW1lbnQ+IE9iamVjdE1lYXN1cmVtZW50cyB7IGdldDsgc2V0OyB9XHJcblxyXG4jZWxzZVxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBVcGRhdGVMaXN0KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIE9iamVjdE1lYXN1cmVtZW50cyA9IG5ldyBPYnNlcnZhYmxlQ29sbGVjdGlvbjxPYmplY3RNZWFzdXJlbWVudD4oR2V0QWxsKCkuT3JkZXJCeShwID0+IHAsIG5ldyBNZWFzdXJlbWVudENvbXBhcmUodGhpcykpKTtcclxuICAgICAgICAgICAgT2JqZWN0UGFja3MgPSBuZXcgT2JzZXJ2YWJsZUNvbGxlY3Rpb248T2JqZWN0UGFjaz4oX3JlcG9zaXRvcnkuR2V0T2JqZWN0UGFja3MoKSk7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgT2JzZXJ2YWJsZUNvbGxlY3Rpb248T2JqZWN0UGFjaz4gT2JqZWN0UGFja3MgeyBnZXQ7IHNldDsgfVxyXG4gICAgICAgIHB1YmxpYyBPYnNlcnZhYmxlQ29sbGVjdGlvbjxPYmplY3RNZWFzdXJlbWVudD4gT2JqZWN0TWVhc3VyZW1lbnRzIHsgZ2V0OyBzZXQ7IH1cclxuXHJcbiNlbmRpZlxyXG5cclxuXHJcbiAgICAgICAgcHVibGljIGRvdWJsZSBDb252ZXJ0KE9iamVjdE1lYXN1cmVtZW50IGZyb21NZWFzdXJlbWVudCwgT2JqZWN0TWVhc3VyZW1lbnQgdG8sIGRvdWJsZSB2YWx1ZUZyb20gPSAxKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYoZnJvbU1lYXN1cmVtZW50ID09IG51bGwpIHRocm93IG5ldyBBcmd1bWVudE51bGxFeGNlcHRpb24oXCInZnJvbScgY2Fubm90IGJlIG51bGxcIik7XHJcbiAgICAgICAgICAgIGlmICh0byA9PSBudWxsKSB0aHJvdyBuZXcgQXJndW1lbnROdWxsRXhjZXB0aW9uKFwiJ3RvJyBjYW5ub3QgYmUgbnVsbFwiKTtcclxuICAgICAgICAgICAgcmV0dXJuIENvbnZlcnQoZnJvbU1lYXN1cmVtZW50LlBsdXJhbE5hbWUsIHRvLlBsdXJhbE5hbWUsIHZhbHVlRnJvbSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgZG91YmxlIENvbnZlcnQoc3RyaW5nIG5hbWVGcm9tLCBzdHJpbmcgbmFtZVRvLCBkb3VibGUgdmFsdWVGcm9tID0gMSlcclxuICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICB2YXIgZnJvbU1lYXN1cmVtZW50ID0gRmluZChuYW1lRnJvbSk7XHJcbiAgICAgICAgICAgIHZhciB0byA9IEZpbmQobmFtZVRvKTtcclxuICAgICAgICAgICAgaWYgKHRvID09IGZyb21NZWFzdXJlbWVudClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlRnJvbTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWVGcm9tICogQ2FsY3VsYXRlKGZyb21NZWFzdXJlbWVudCwgdG8pID8/IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgXHJcbiAgICAgICAgcHJpdmF0ZSBkb3VibGU/IENhbGN1bGF0ZShPYmplY3RNZWFzdXJlbWVudCBmcm9tTWVhc3VyZW1lbnQsIE9iamVjdE1lYXN1cmVtZW50IHRvLCBkb3VibGUgdmFsdWUgPSAxKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKGZyb21NZWFzdXJlbWVudC5QYXJlbnRNZWFzdXJlbWVudFNpbmdsZU5hbWUgIT0gbnVsbClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKGZyb21NZWFzdXJlbWVudC5QYXJlbnRNZWFzdXJlbWVudFNpbmdsZU5hbWUgPT0gdG8uU2luZ2xlTmFtZSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZnJvbU1lYXN1cmVtZW50LlZhbHVlICogdmFsdWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHVwID0gQ2FsY3VsYXRlKGZyb21NZWFzdXJlbWVudC5NZWFzdXJlbWVudCwgdG8sIGZyb21NZWFzdXJlbWVudC5WYWx1ZSAqIHZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodXAgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB1cDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gR29Eb3duKGZyb21NZWFzdXJlbWVudCwgdG8sIHZhbHVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgZG91YmxlPyBHb0Rvd24oT2JqZWN0TWVhc3VyZW1lbnQgZnJvbU1lYXN1cmVtZW50LCBPYmplY3RNZWFzdXJlbWVudCB0bywgZG91YmxlIHZhbHVlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIGNoaWxkcmVuID0gZnJvbU1lYXN1cmVtZW50Lk9iamVjdE1lYXN1cmVtZW50cztcclxuICAgICAgICAgICAgLy9pZiAoY2hpbGRyZW4uQW55KCkgIT0gdHJ1ZSlcclxuICAgICAgICAgICAgLy97XHJcbiAgICAgICAgICAgIC8vICAgIGNoaWxkcmVuID0gRmluZChmcm9tLlNpbmdsZU5hbWUpLk9iamVjdE1lYXN1cmVtZW50cztcclxuICAgICAgICAgICAgLy99XHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciBvYmplY3RNZWFzdXJlbWVudCBpbiBjaGlsZHJlbilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKG9iamVjdE1lYXN1cmVtZW50ID09IHRvKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZSAvIHRvLlZhbHVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBkb3duID0gR29Eb3duKG9iamVjdE1lYXN1cmVtZW50LCB0bywgdmFsdWUgLyBvYmplY3RNZWFzdXJlbWVudC5WYWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRvd24gIT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkb3duO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBMaXN0PE9iamVjdE1lYXN1cmVtZW50PiBHZXRBbGwoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIFN5c3RlbS5MaW5xLkVudW1lcmFibGUuVG9MaXN0PE9iamVjdE1lYXN1cmVtZW50PihfcmVwb3NpdG9yeS5HZXRPYmplY3RNZWFzdXJlbWVudHMoKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgT2JqZWN0TWVhc3VyZW1lbnQgRmluZChzdHJpbmcgbmFtZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBfcmVwb3NpdG9yeS5HZXRPYmplY3RNZWFzdXJlbWVudChuYW1lKTtcclxuICAgICAgICAgICAgLy9yZXR1cm4gRmluZChDZW50aW1ldGVyLCBuYW1lKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcblxyXG4gICAgICAgIHB1YmxpYyBPYmplY3RNZWFzdXJlbWVudCBOZXdPYmplY3Qoc3RyaW5nIHBsdXJhbE5hbWUsIHN0cmluZyBzaW5nbGVOYW1lLCBkb3VibGUgdmFsdWUsIHN0cmluZyBtZWFzdXJlbWVudCwgc3RyaW5nIHBhY2sgPSBcIkN1c3RvbVwiKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIG1lYXN1cmUgPSBGaW5kKG1lYXN1cmVtZW50KTtcclxuICAgICAgICAgICAgaWYgKG1lYXN1cmUgIT0gbnVsbClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyIG5ld09iamVjdCA9IG5ldyBPYmplY3RNZWFzdXJlbWVudChzaW5nbGVOYW1lLCBwbHVyYWxOYW1lKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFZhbHVlID0gdmFsdWUsXHJcbiAgICAgICAgICAgICAgICAgICAgT2JqZWN0UGFja05hbWUgPSBwYWNrLFxyXG4gICAgICAgICAgICAgICAgICAgIFBhcmVudE1lYXN1cmVtZW50U2luZ2xlTmFtZSA9IG1lYXN1cmUuU2luZ2xlTmFtZVxyXG5cclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICBfcmVwb3NpdG9yeS5BZGRPYmplY3QobmV3T2JqZWN0KTtcclxuICAgICAgICAgICAgICAgIFVwZGF0ZUxpc3QoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXdPYmplY3Q7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgRGVsZXRlUGFjayhPYmplY3RQYWNrIHBhY2spXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBfcmVwb3NpdG9yeS5SZW1vdmVQYWNrKHBhY2spO1xyXG4gICAgICAgICAgICBVcGRhdGVMaXN0KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBEZWxldGVPYmplY3QoT2JqZWN0TWVhc3VyZW1lbnQgc2VsZWN0ZWRPYmplY3QpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBfcmVwb3NpdG9yeS5SZW1vdmVPYmplY3Qoc2VsZWN0ZWRPYmplY3QpO1xyXG4gICAgICAgICAgICB0aGlzLlVwZGF0ZUxpc3QoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFVwZGF0ZU9iamVjdChPYmplY3RNZWFzdXJlbWVudCBzZWxlY3RlZE9iamVjdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIF9yZXBvc2l0b3J5LlVwZGF0ZU9iamVjdChzZWxlY3RlZE9iamVjdCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHZvaWQgVXBkYXRlUGFjayhzdHJpbmcgcGFjaywgT2JqZWN0TWVhc3VyZW1lbnQgbmV3T2JqZWN0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIHBhY2tzID0gU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5GaXJzdE9yRGVmYXVsdDxPYmplY3RQYWNrPihPYmplY3RQYWNrcywoRnVuYzxPYmplY3RQYWNrLGJvb2w+KShwID0+IHAuUGFja05hbWUgPT0gcGFjaykpO1xyXG4gICAgICAgICAgICBpZiAocGFja3MgIT0gbnVsbClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcGFja3MuT2JqZWN0TWVhc3VyZW1lbnRzLkFkZChuZXdPYmplY3QpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEludmFsaWRPcGVyYXRpb25FeGNlcHRpb24oc3RyaW5nLkZvcm1hdChcInBhY2thZ2UgJ3swfScgbXVzdCBleGlzdCBmaXJzdFwiLHBhY2spKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGNvbnN0IHN0cmluZyBQcm9wZXJ0eUtleSA9IFwiQ29udmVyc2lvbnNcIjtcclxuXHJcblxyXG4gICAgICAgIHB1YmxpYyBPYmplY3RNZWFzdXJlbWVudCBOZXdPYmplY3Qoc3RyaW5nIHBsdXJhbE5hbWUsIHN0cmluZyBzaW5nbGVOYW1lLFxyXG4gICAgICAgICAgICBkb3VibGUgdmFsdWUsIE9iamVjdE1lYXN1cmVtZW50IG1lYXN1cmVtZW50LCBzdHJpbmcgcGFjayA9IFwiQ3VzdG9tXCIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gTmV3T2JqZWN0KHBsdXJhbE5hbWUsIHNpbmdsZU5hbWUsIHZhbHVlLCBtZWFzdXJlbWVudC5QbHVyYWxOYW1lLCBwYWNrKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIE5ld1BhY2soT2JqZWN0UGFjayBwYWNrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5fcmVwb3NpdG9yeS5BZGRQYWNrKHBhY2spO1xyXG4gICAgICAgICAgICB0aGlzLlVwZGF0ZUxpc3QoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJ1c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLkNvbXBvbmVudE1vZGVsLkRhdGFBbm5vdGF0aW9ucztcclxudXNpbmcgU3lzdGVtLkNvbXBvbmVudE1vZGVsLkRhdGFBbm5vdGF0aW9ucy5TY2hlbWE7XHJcblxyXG5uYW1lc3BhY2UgSG93RmFyLkNvcmUuTW9kZWxzXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBPYmplY3RNZWFzdXJlbWVudCA6IEJpbmRhYmxlQmFzZSwgSU9iamVjdE1lYXN1cmVtZW50XHJcbiAgICB7XHJcbiAgICAgICAgcHJpdmF0ZSBkb3VibGUgX3ZhbHVlO1xyXG4gICAgICAgIHByaXZhdGUgc3RyaW5nIF9pbWFnZTtcclxuICAgICAgICBwcml2YXRlIHN0cmluZyBfcGx1cmFsTmFtZTtcclxuICAgICAgICBwcml2YXRlIExpc3Q8T2JqZWN0TWVhc3VyZW1lbnQ+IF9vYmplY3RNZWFzdXJlbWVudHM7XHJcbiAgICAgICAgcHJpdmF0ZSBzdHJpbmcgX3NpbmdsZU5hbWU7XHJcbiAgICAgICAgcHJpdmF0ZSBPYmplY3RQYWNrIF9vYmplY3RQYWNrO1xyXG4gICAgICAgIHByaXZhdGUgc3RyaW5nIF9vYmplY3RQYWNrTmFtZTtcclxuICAgICAgICBwcml2YXRlIE9iamVjdE1lYXN1cmVtZW50IF9tZWFzdXJlbWVudDtcclxuICAgICAgICBwcml2YXRlIHN0cmluZyBfcGFyZW50TWVhc3VyZW1lbnRTaW5nbGVOYW1lO1xyXG5cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgc3RyaW5nIFRvU3RyaW5nKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBNZWFzdXJlbWVudCAhPSBudWxsID8gc3RyaW5nLkZvcm1hdChcInswfTogezF9IHsyfVwiLFNpbmdsZU5hbWUsVmFsdWUsTWVhc3VyZW1lbnQuUGx1cmFsTmFtZSk6IHN0cmluZy5Gb3JtYXQoXCJ7MH0gezF9XCIsVmFsdWUsUGx1cmFsTmFtZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBbRm9yZWlnbktleShcIk1lYXN1cmVtZW50XCIpXVxyXG4gICAgICAgIHB1YmxpYyBzdHJpbmcgUGFyZW50TWVhc3VyZW1lbnRTaW5nbGVOYW1lXHJcbntcclxuICAgIGdldFxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBfcGFyZW50TWVhc3VyZW1lbnRTaW5nbGVOYW1lO1xyXG4gICAgfVxyXG5cclxuICAgIFxyXG4gICAgc2V0XHJcbiAgICB7XHJcbiAgICAgICAgU2V0UHJvcGVydHk8c3RyaW5nPihyZWYgX3BhcmVudE1lYXN1cmVtZW50U2luZ2xlTmFtZSwgdmFsdWUpO1xyXG4gICAgfVxyXG4gICAgXHJcbn1cclxuICAgICAgICBwdWJsaWMgdmlydHVhbCBPYmplY3RNZWFzdXJlbWVudCBNZWFzdXJlbWVudFxyXG57XHJcbiAgICBnZXRcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gX21lYXN1cmVtZW50O1xyXG4gICAgfVxyXG5cclxuICAgIFxyXG4gICAgc2V0XHJcbiAgICB7XHJcbiAgICAgICAgU2V0UHJvcGVydHk8T2JqZWN0TWVhc3VyZW1lbnQ+KHJlZiBfbWVhc3VyZW1lbnQsIHZhbHVlKTtcclxuICAgIH1cclxuICAgIFxyXG59XHJcbiAgICAgICAgcHVibGljIGRvdWJsZSBWYWx1ZVxyXG57XHJcbiAgICBnZXRcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gX3ZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIFxyXG4gICAgc2V0XHJcbiAgICB7XHJcbiAgICAgICAgU2V0UHJvcGVydHk8ZG91YmxlPihyZWYgX3ZhbHVlLCB2YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBcclxufVxyXG4gICAgICAgIHB1YmxpYyBzdHJpbmcgSW1hZ2Vcclxue1xyXG4gICAgZ2V0XHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIF9pbWFnZTtcclxuICAgIH1cclxuXHJcbiAgICBcclxuICAgIHNldFxyXG4gICAge1xyXG4gICAgICAgIFNldFByb3BlcnR5PHN0cmluZz4ocmVmIF9pbWFnZSwgdmFsdWUpO1xyXG4gICAgfVxyXG4gICAgXHJcbn1cclxuICAgICAgICBwdWJsaWMgc3RyaW5nIFBsdXJhbE5hbWVcclxue1xyXG4gICAgZ2V0XHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIF9wbHVyYWxOYW1lO1xyXG4gICAgfVxyXG5cclxuICAgIFxyXG4gICAgc2V0XHJcbiAgICB7XHJcbiAgICAgICAgU2V0UHJvcGVydHk8c3RyaW5nPihyZWYgX3BsdXJhbE5hbWUsIHZhbHVlKTtcclxuICAgIH1cclxuICAgIFxyXG59XHJcbiAgICAgICAgcHVibGljIE9iamVjdE1lYXN1cmVtZW50KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIE9iamVjdE1lYXN1cmVtZW50cyA9IG5ldyBMaXN0PE9iamVjdE1lYXN1cmVtZW50PigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgT2JqZWN0TWVhc3VyZW1lbnQoc3RyaW5nIHNpbmdsZU5hbWUsIHN0cmluZyBwbHVyYWxOYW1lKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgU2luZ2xlTmFtZSA9IHNpbmdsZU5hbWU7XHJcbiAgICAgICAgICAgIFBsdXJhbE5hbWUgPSBwbHVyYWxOYW1lO1xyXG4gICAgICAgICAgICBPYmplY3RNZWFzdXJlbWVudHMgPSBuZXcgTGlzdDxPYmplY3RNZWFzdXJlbWVudD4oKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vcHVibGljIElFbnVtZXJhYmxlPE9iamVjdE1lYXN1cmVtZW50PiBHZXRDaGlsZHJlbigpXHJcbiAgICAgICAgLy97XHJcbiAgICAgICAgLy8gICAgcmV0dXJuIE9iamVjdE1lYXN1cmVtZW50cztcclxuICAgICAgICAvL31cclxuICAgICAgICBwdWJsaWMgdm9pZCBBZGQoT2JqZWN0TWVhc3VyZW1lbnQgb2JqKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgb2JqLk1lYXN1cmVtZW50ID0gdGhpcztcclxuICAgICAgICAgICAgT2JqZWN0TWVhc3VyZW1lbnRzLkFkZChvYmopO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZpcnR1YWwgTGlzdDxPYmplY3RNZWFzdXJlbWVudD4gT2JqZWN0TWVhc3VyZW1lbnRzXHJcbntcclxuICAgIGdldFxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBfb2JqZWN0TWVhc3VyZW1lbnRzO1xyXG4gICAgfVxyXG5cclxuICAgIFxyXG4gICAgc2V0XHJcbiAgICB7XHJcbiAgICAgICAgU2V0UHJvcGVydHk8TGlzdDxPYmplY3RNZWFzdXJlbWVudD4+KHJlZiBfb2JqZWN0TWVhc3VyZW1lbnRzLCB2YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBcclxufVxyXG4gICAgICAgIHB1YmxpYyBzdHJpbmcgU2luZ2xlTmFtZVxyXG57XHJcbiAgICBnZXRcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gX3NpbmdsZU5hbWU7XHJcbiAgICB9XHJcblxyXG4gICAgXHJcbiAgICBzZXRcclxuICAgIHtcclxuICAgICAgICBTZXRQcm9wZXJ0eTxzdHJpbmc+KHJlZiBfc2luZ2xlTmFtZSwgdmFsdWUpO1xyXG4gICAgfVxyXG4gICAgXHJcbn1cclxuICAgICAgICBwdWJsaWMgT2JqZWN0UGFjayBPYmplY3RQYWNrXHJcbntcclxuICAgIGdldFxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBfb2JqZWN0UGFjaztcclxuICAgIH1cclxuXHJcbiAgICBcclxuICAgIHNldFxyXG4gICAge1xyXG4gICAgICAgIFNldFByb3BlcnR5PE9iamVjdFBhY2s+KHJlZiBfb2JqZWN0UGFjaywgdmFsdWUpO1xyXG4gICAgfVxyXG4gICAgXHJcbn1cclxuICAgICAgICBwdWJsaWMgc3RyaW5nIE9iamVjdFBhY2tOYW1lXHJcbntcclxuICAgIGdldFxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBfb2JqZWN0UGFja05hbWU7XHJcbiAgICB9XHJcblxyXG4gICAgXHJcbiAgICBzZXRcclxuICAgIHtcclxuICAgICAgICBTZXRQcm9wZXJ0eTxzdHJpbmc+KHJlZiBfb2JqZWN0UGFja05hbWUsIHZhbHVlKTtcclxuICAgIH1cclxuICAgIFxyXG59ICAgIH1cclxufSIsInVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuT2JqZWN0TW9kZWw7XHJcblxyXG5uYW1lc3BhY2UgSG93RmFyLkNvcmUuTW9kZWxzXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBPYmplY3RQYWNrIDogQmluZGFibGVCYXNlXHJcbiAgICB7XHJcbiAgICAgICAgcHJpdmF0ZSBzdHJpbmcgX3BhY2tOYW1lO1xyXG4gICAgICAgIHByaXZhdGUgc3RyaW5nIF9kZXNjcmlwdGlvbjtcclxuICAgICAgICBwcml2YXRlIHN0cmluZyBfcGFja0ltYWdlO1xyXG5cclxuI2lmIEJSSURHRVxyXG4gICAgICAgIHB1YmxpYyB2aXJ0dWFsIExpc3Q8T2JqZWN0TWVhc3VyZW1lbnQ+IE9iamVjdE1lYXN1cmVtZW50cyB7IGdldDsgc2V0OyB9XHJcbiNlbHNlXHJcbiAgICAgICAgcHVibGljIHZpcnR1YWwgT2JzZXJ2YWJsZUNvbGxlY3Rpb248T2JqZWN0TWVhc3VyZW1lbnQ+IE9iamVjdE1lYXN1cmVtZW50cyB7IGdldDsgc2V0OyB9ID0gbmV3IE9ic2VydmFibGVDb2xsZWN0aW9uPE9iamVjdE1lYXN1cmVtZW50PigpO1xyXG5cclxuI2VuZGlmXHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIHN0cmluZyBUb1N0cmluZygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gUGFja05hbWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RyaW5nIFBhY2tOYW1lXHJcbntcclxuICAgIGdldFxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBfcGFja05hbWU7XHJcbiAgICB9XHJcblxyXG4gICAgXHJcbiAgICBzZXRcclxuICAgIHtcclxuICAgICAgICBTZXRQcm9wZXJ0eTxzdHJpbmc+KHJlZiBfcGFja05hbWUsIHZhbHVlKTtcclxuICAgIH1cclxuICAgIFxyXG59cHVibGljIHN0cmluZyBOYW1lXHJcbntcclxuICAgIGdldFxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBQYWNrTmFtZTtcclxuICAgIH1cclxufXB1YmxpYyBzdHJpbmcgSW1hZ2VVUkxcclxue1xyXG4gICAgZ2V0XHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIFBhY2tJbWFnZTtcclxuICAgIH1cclxufVxyXG4gICAgICAgIHB1YmxpYyBzdHJpbmcgRGVzY3JpcHRpb25cclxue1xyXG4gICAgZ2V0XHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIF9kZXNjcmlwdGlvbjtcclxuICAgIH1cclxuXHJcbiAgICBcclxuICAgIHNldFxyXG4gICAge1xyXG4gICAgICAgIFNldFByb3BlcnR5PHN0cmluZz4ocmVmIF9kZXNjcmlwdGlvbiwgdmFsdWUpO1xyXG4gICAgfVxyXG4gICAgXHJcbn1cclxuICAgICAgICBwdWJsaWMgc3RyaW5nIFBhY2tJbWFnZVxyXG57XHJcbiAgICBnZXRcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gX3BhY2tJbWFnZTtcclxuICAgIH1cclxuXHJcbiAgICBcclxuICAgIHNldFxyXG4gICAge1xyXG4gICAgICAgIFNldFByb3BlcnR5PHN0cmluZz4ocmVmIF9wYWNrSW1hZ2UsIHZhbHVlKTtcclxuICAgIH1cclxuICAgIFxyXG59XHJcbiAgICAgICAgcHVibGljIE9iamVjdFBhY2soKVxyXG4gICAgICAgIHtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBPYmplY3RQYWNrKHN0cmluZyBuYW1lLHN0cmluZyBkZXNjcmlwdGlvbilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFBhY2tOYW1lID0gbmFtZTtcclxuICAgICAgICAgICAgRGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbjtcclxuICAgICAgICAgICAgUGFja0ltYWdlID0gXCJodHRwczovL3ZpYS5wbGFjZWhvbGRlci5jb20vMTUwXCI7XHJcbiAgICAgICAgfVxyXG5cbiAgICBcbnByaXZhdGUgTGlzdDxPYmplY3RNZWFzdXJlbWVudD4gX19Qcm9wZXJ0eV9fSW5pdGlhbGl6ZXJfX09iamVjdE1lYXN1cmVtZW50cz1uZXcgTGlzdDxPYmplY3RNZWFzdXJlbWVudD4oKTt9XHJcbn0iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxuXHJcbm5hbWVzcGFjZSBIb3dGYXIuQ29yZS5Nb2RlbHNcclxue1xyXG4gICAgcHVibGljIGNsYXNzIE9iamVjdFJlcG9zaXRvcnlDYWNoZSA6IElPYmplY3RSZXBvc2l0b3J5XHJcbiAgICB7XHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBJQXBwIF9hcHA7XHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBMaXN0PE9iamVjdE1lYXN1cmVtZW50PiBtZWFzdXJlbWVudHM7XHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBMaXN0PE9iamVjdFBhY2s+IHBhY2tzO1xyXG5cclxuICAgICAgICBUIEdldEtleTxUPihzdHJpbmcga2V5KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKF9hcHAuUHJvcGVydGllcy5Db250YWluc0tleShrZXkpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gX2FwcC5Qcm9wZXJ0aWVzLkdldDxUPihrZXkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBkZWZhdWx0KFQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIE9iamVjdFJlcG9zaXRvcnlDYWNoZShJQXBwIGFwcClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIF9hcHAgPSBhcHA7XHJcbiAgICAgICAgICAgIG1lYXN1cmVtZW50cyA9IEdldEtleTxMaXN0PE9iamVjdE1lYXN1cmVtZW50Pj4oT2JqZWN0S2V5KSA/PyBuZXcgTGlzdDxPYmplY3RNZWFzdXJlbWVudD4oKTtcclxuICAgICAgICAgICAgcGFja3MgPSBHZXRLZXk8TGlzdDxPYmplY3RQYWNrPj4oUGFja0tleSkgPz8gbmV3IExpc3Q8T2JqZWN0UGFjaz4oKTtcclxuICAgICAgICAgICAgaWYgKCFTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLkFueTxPYmplY3RNZWFzdXJlbWVudD4obWVhc3VyZW1lbnRzKSlcclxuICAgICAgICAgICAgICAgIE9iamVjdFJlcG9zaXRvcnlTZWVkZXIuU3RhcnR1cCh0aGlzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIHZvaWQgRGlzcG9zZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdm9pZCBJbnNlcnRLZXkoc3RyaW5nIGtleSwgb2JqZWN0IGRhdGEpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoX2FwcC5Qcm9wZXJ0aWVzLkNvbnRhaW5zS2V5KGtleSkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIF9hcHAuUHJvcGVydGllcy5TZXQoa2V5LGRhdGEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgX2FwcC5Qcm9wZXJ0aWVzLkFkZChrZXksIGRhdGEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGFzeW5jIHZvaWQgU2F2ZUNoYW5nZXMoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgSW5zZXJ0S2V5KE9iamVjdEtleSwgbWVhc3VyZW1lbnRzKTtcclxuICAgICAgICAgICAgSW5zZXJ0S2V5KFBhY2tLZXksIHBhY2tzKTtcclxuICAgICAgICAgICAgYXdhaXQgX2FwcC5TYXZlUHJvcGVydGllc0FzeW5jKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgT2JqZWN0TWVhc3VyZW1lbnQgR2V0T2JqZWN0TWVhc3VyZW1lbnQoc3RyaW5nIG5hbWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgZGF0YSA9IEdldE9iamVjdE1lYXN1cmVtZW50cygpO1xyXG4gICAgICAgICAgICByZXR1cm4gU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5GaXJzdE9yRGVmYXVsdDxPYmplY3RNZWFzdXJlbWVudD4oZGF0YSwoRnVuYzxPYmplY3RNZWFzdXJlbWVudCxib29sPikocCA9PiBwLlNpbmdsZU5hbWUuVG9Mb3dlcigpID09IG5hbWUuVG9Mb3dlcigpIHx8IHAuUGx1cmFsTmFtZS5Ub0xvd2VyKCkgPT0gbmFtZS5Ub0xvd2VyKCkpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBjb25zdCBzdHJpbmcgT2JqZWN0S2V5ID0gXCJPYmplY3RNZWFzdXJlbWVudHNcIjtcclxuICAgICAgICBwdWJsaWMgY29uc3Qgc3RyaW5nIFBhY2tLZXkgPSBcIk9iamVjdFBhY2tzXCI7XHJcbiAgICAgICAgcHVibGljIElFbnVtZXJhYmxlPE9iamVjdE1lYXN1cmVtZW50PiBHZXRPYmplY3RNZWFzdXJlbWVudHMoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdFJlcG9zaXRvcnlTZWVkZXIuU2V0dXBUcmVlKG1lYXN1cmVtZW50cyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyB2b2lkIEFkZE9iamVjdChPYmplY3RNZWFzdXJlbWVudCBtZWFzdXJlbWVudClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChtZWFzdXJlbWVudC5PYmplY3RQYWNrTmFtZSA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEludmFsaWRPcGVyYXRpb25FeGNlcHRpb24oXCJtdXN0IGhhdmUgYSBwYWNrIG5hbWVcIik7XHJcblxyXG4gICAgICAgICAgICBpZiAobWVhc3VyZW1lbnQuUGFyZW50TWVhc3VyZW1lbnRTaW5nbGVOYW1lID09IG51bGwgJiYgbWVhc3VyZW1lbnQuTWVhc3VyZW1lbnQgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgIG1lYXN1cmVtZW50LlBhcmVudE1lYXN1cmVtZW50U2luZ2xlTmFtZSA9IG1lYXN1cmVtZW50Lk1lYXN1cmVtZW50LlNpbmdsZU5hbWU7XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKG1lYXN1cmVtZW50LlBhcmVudE1lYXN1cmVtZW50U2luZ2xlTmFtZSAhPSBudWxsICYmIG1lYXN1cmVtZW50Lk1lYXN1cmVtZW50ID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICBtZWFzdXJlbWVudC5NZWFzdXJlbWVudCA9XHJcblN5c3RlbS5MaW5xLkVudW1lcmFibGUuRmlyc3RPckRlZmF1bHQ8T2JqZWN0TWVhc3VyZW1lbnQ+KCAgICAgICAgICAgICAgICAgICAgbWVhc3VyZW1lbnRzLChGdW5jPE9iamVjdE1lYXN1cmVtZW50LGJvb2w+KShwID0+IHAuU2luZ2xlTmFtZSA9PSBtZWFzdXJlbWVudC5QYXJlbnRNZWFzdXJlbWVudFNpbmdsZU5hbWUpKTtcclxuICAgICAgICAgICAgaWYgKG1lYXN1cmVtZW50Lk9iamVjdFBhY2tOYW1lID09IG51bGwgJiYgbWVhc3VyZW1lbnQuT2JqZWN0UGFjayAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgbWVhc3VyZW1lbnQuT2JqZWN0UGFja05hbWUgPSBtZWFzdXJlbWVudC5PYmplY3RQYWNrLlBhY2tOYW1lO1xyXG4gICAgICAgICAgICBlbHNlIGlmIChtZWFzdXJlbWVudC5PYmplY3RQYWNrTmFtZSAhPSBudWxsICYmIG1lYXN1cmVtZW50Lk9iamVjdFBhY2sgPT0gbnVsbClcclxuICAgICAgICAgICAgICAgIG1lYXN1cmVtZW50Lk9iamVjdFBhY2sgPSBTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLkZpcnN0T3JEZWZhdWx0PE9iamVjdFBhY2s+KHBhY2tzLChGdW5jPE9iamVjdFBhY2ssYm9vbD4pKHAgPT4gcC5QYWNrTmFtZSA9PSBtZWFzdXJlbWVudC5PYmplY3RQYWNrTmFtZSkpO1xyXG5cclxuICAgICAgICAgICAgdmFyIHBhY2sgPSBTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLkZpcnN0PE9iamVjdFBhY2s+KHBhY2tzLChGdW5jPE9iamVjdFBhY2ssYm9vbD4pKHAgPT4gcC5QYWNrTmFtZSA9PSBtZWFzdXJlbWVudC5PYmplY3RQYWNrTmFtZSkpO1xyXG4gICAgICAgICAgICBpZiAoU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5Bbnk8T2JqZWN0TWVhc3VyZW1lbnQ+KHBhY2suT2JqZWN0TWVhc3VyZW1lbnRzLChGdW5jPE9iamVjdE1lYXN1cmVtZW50LGJvb2w+KShwID0+IHAuU2luZ2xlTmFtZSA9PSBtZWFzdXJlbWVudC5TaW5nbGVOYW1lKSkgIT0gdHJ1ZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcGFjay5PYmplY3RNZWFzdXJlbWVudHMuQWRkKG1lYXN1cmVtZW50KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbWVhc3VyZW1lbnRzLkFkZChtZWFzdXJlbWVudCk7XHJcbiAgICAgICAgICAgIFNhdmVDaGFuZ2VzKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBSZW1vdmVPYmplY3QoT2JqZWN0TWVhc3VyZW1lbnQgbWVhc3VyZW1lbnQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBtZWFzdXJlbWVudHMuUmVtb3ZlKG1lYXN1cmVtZW50KTtcclxuICAgICAgICAgICAgU2F2ZUNoYW5nZXMoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBJRW51bWVyYWJsZTxPYmplY3RQYWNrPiBHZXRPYmplY3RQYWNrcygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gcGFja3M7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBBZGRQYWNrKE9iamVjdFBhY2sgcGFjaylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHBhY2tzLkFkZChwYWNrKTtcclxuICAgICAgICAgICAgU2F2ZUNoYW5nZXMoKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBSZW1vdmVQYWNrKE9iamVjdFBhY2sgcGFjaylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHBhY2tzLlJlbW92ZShwYWNrKTtcclxuICAgICAgICAgICAgU2F2ZUNoYW5nZXMoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFVwZGF0ZU9iamVjdChPYmplY3RNZWFzdXJlbWVudCBzZWxlY3RlZE9iamVjdClcclxuICAgICAgICB7XHJcblxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHB1YmxpYyBPYmplY3RNZWFzdXJlbWVudCBOZXdPYmplY3Qoc3RyaW5nIHBsdXJhbCwgc3RyaW5nIHNpbmdsZSwgZG91YmxlIHZhbHVlLCBPYmplY3RNZWFzdXJlbWVudCBwYXJlbnQsIHN0cmluZyBwYWNrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdFJlcG9zaXRvcnlTZWVkZXIuTmV3T2JqZWN0QWN0aW9uKHBsdXJhbCwgc2luZ2xlLCB2YWx1ZSwgcGFyZW50LlNpbmdsZU5hbWUsIHBhY2ssIHRoaXMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsInVzaW5nIEJyaWRnZS5IdG1sNTtcclxudXNpbmcgTmV3dG9uc29mdC5Kc29uO1xyXG5cclxubmFtZXNwYWNlIEhvd0Zhci5Db3JlLk1vZGVsc1xyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgUHJvcGVydGllcyA6IElQcm9wZXJ0aWVzXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIFByb3BlcnRpZXMoKVxyXG4gICAgICAgIHtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBBZGQoc3RyaW5nIGtleSwgb2JqZWN0IG9iailcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChXaW5kb3cuTG9jYWxTdG9yYWdlID09IG51bGwpIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgIHZhciBzdHIgPSBKc29uQ29udmVydC5TZXJpYWxpemVPYmplY3Qob2JqKTtcclxuXHJcbiAgICAgICAgICAgIFdpbmRvdy5Mb2NhbFN0b3JhZ2UuU2V0SXRlbShrZXksIHN0cik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgYm9vbCBDb250YWluc0tleShzdHJpbmcga2V5KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKFdpbmRvdy5Mb2NhbFN0b3JhZ2UgPT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgcmV0dXJuIFdpbmRvdy5Mb2NhbFN0b3JhZ2UuR2V0SXRlbShrZXkpICE9IG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgVCBHZXQ8VD4oc3RyaW5nIGtleSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChXaW5kb3cuTG9jYWxTdG9yYWdlID09IG51bGwpIFxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRlZmF1bHQoVCk7XHJcblxyXG4gICAgICAgICAgICB2YXIgdmFsdWUgPSBXaW5kb3cuTG9jYWxTdG9yYWdlLkdldEl0ZW0oa2V5KTtcclxuICAgICAgICAgICAgaWYgKHZhbHVlID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZGVmYXVsdChUKTtcclxuICAgICAgICAgICAgcmV0dXJuIEpzb25Db252ZXJ0LkRlc2VyaWFsaXplT2JqZWN0PFQ+KHZhbHVlLlRvU3RyaW5nKCkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgU2V0KHN0cmluZyBrZXksIG9iamVjdCBvYmopXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBBZGQoa2V5LCBvYmopO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsInVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG5cclxubmFtZXNwYWNlIEhvd0Zhci5Db3JlLk1vZGVsc1xyXG57XHJcbiAgICBpbnRlcm5hbCBjbGFzcyBNZWFzdXJlbWVudENvbXBhcmUgOiBJQ29tcGFyZXI8T2JqZWN0TWVhc3VyZW1lbnQ+XHJcbiAgICB7XHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBJTWVhc3VyZUNvbnZlcnRlcnMgX2NvbnZlcnRlcnM7XHJcblxyXG4gICAgICAgIHB1YmxpYyBNZWFzdXJlbWVudENvbXBhcmUoSU1lYXN1cmVDb252ZXJ0ZXJzIGNvbnZlcnRlcnMpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBfY29udmVydGVycyA9IGNvbnZlcnRlcnM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBpbnQgQ29tcGFyZShPYmplY3RNZWFzdXJlbWVudCB4LCBPYmplY3RNZWFzdXJlbWVudCB5KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIHh0b3kgPSBfY29udmVydGVycy5Db252ZXJ0KHgsIHkpO1xyXG4gICAgICAgICAgICBpZiAoeHRveSA+IDEpIHJldHVybiAxO1xyXG4gICAgICAgICAgICByZXR1cm4gLTE7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59Il0KfQo=

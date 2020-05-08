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

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICJIb3dGYXIuQnJpZGdlLmpzIiwKICAic291cmNlUm9vdCI6ICIiLAogICJzb3VyY2VzIjogWyJBcHAuY3MiLCIuLi9Ib3dGYXIuQ29yZS9CaW5kYWJsZUJhc2UuY3MiLCJBcHBNb2RlbC5jcyIsIi4uL0hvd0Zhci5Db3JlL01vZGVscy9PYmplY3RSZXBvc2l0b3J5U2VlZGVyLmNzIiwiLi4vSG93RmFyLkNvcmUvTW9kZWxzL01lYXN1cmVDb252ZXJ0ZXJzLmNzIiwiLi4vSG93RmFyLkNvcmUvTW9kZWxzL09iamVjdE1lYXN1cmVtZW50LmNzIiwiLi4vSG93RmFyLkNvcmUvTW9kZWxzL09iamVjdFBhY2suY3MiLCIuLi9Ib3dGYXIuQ29yZS9Nb2RlbHMvT2JqZWN0UmVwb3NpdG9yeUNhY2hlLmNzIiwiLi4vSG93RmFyLkNvcmUvTW9kZWxzL01lYXN1cmVtZW50Q29tcGFyZS5jcyJdLAogICJuYW1lcyI6IFsiIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7WUFzQllBLElBQUlBOzs7Ozs7Ozs7Ozs7O21DQ1pnQkEsR0FBR0EsVUFBZ0JBLE9BQVNBLFFBQXNCQTs7O2dCQUV0RUEsSUFBSUEscUJBQUNBLGNBQVVBLE9BQUtBLDBCQUFnQkEsU0FBT0EsQUFBT0E7b0JBRTlDQSxhQUFXQTtvQkFDWEEsdUJBQWtCQTtvQkFDbEJBLDZCQUFRQSxRQUFLQSxBQUFxQ0EsV0FBaUJBOzs7O3lDQU9sQ0E7O2dCQUVyQ0EsMkNBQWlCQSxRQUFLQSxBQUFxQ0EscUJBQXVCQSxNQUFNQSxJQUFJQSwrQ0FBeUJBLGlCQUFnQkE7Ozs7Ozs7Ozs7Ozs7NEJDWHpIQSxZQUErQkE7O2dCQUUzQ0EsWUFBT0E7Z0JBQ1BBLGdCQUFXQTtnQkFDWEEsWUFBT0E7Z0JBQ1BBLFdBQU1BOztnQkFFTkEsNEVBQXNDQSxBQUE0QkE7O29CQUFLQSxzQkFBaUJBLGtEQUFpQ0E7O2dCQUN6SEE7Z0JBQ0FBLG1CQUFjQTtvQkFFVkEsYUFBYUEsNkRBQXFCQSxpQkFBWUEsaUJBQVlBLDZCQUF3QkE7b0JBQ2xGQTtvQkFDQUE7O29CQUVBQSxNQUFNQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7bUNDakJhQTs7b0JBR3ZCQSxrQkFBa0JBLEtBQUlBO29CQUl0QkEsaUJBQWlCQSxVQUFJQTtvQkFDckJBLDRCQUE0QkE7b0JBQzVCQSxnQkFBZ0JBLFVBQUlBO29CQUNwQkEsZ0JBQWdCQSxVQUFJQSxxQ0FBV0E7b0JBQy9CQSxnQkFBZ0JBLFVBQUlBLHFDQUFXQTtvQkFDL0JBLGdCQUFnQkEsVUFBSUEscUNBQVdBO29CQUMvQkEsWUFBWUEsTUFBOEJBLDJEQUFZQTtvQkFDdERBLDJCQUEyQkE7Ozs7NEJBRXZCQSxJQUFJQSxDQUFDQSw0QkFBaURBLE9BQW5CQSxzQ0FBeUJBLEFBQWlDQTsyQ0FBS0E7NENBQXNCQTtnQ0FDcEhBLHdEQUFtQkE7Ozs7Ozs7OztvQkFJM0JBLElBQUlBLDRCQUE4Q0EseUVBQW5CQSwwQ0FBc0RBLEFBQXNDQTttQ0FBS0Esc0NBQWdCQTs7d0JBQzVJQSwwREFBcUJBOztvQkFFekJBLGFBQWFBLGtGQUE2Q0EsWUFBWUE7b0JBQ3RFQSxXQUFXQSw4RUFBeUNBLFFBQVFBO29CQUM1REEsV0FBV0EsaUZBQTRDQSxNQUFNQTtvQkFDN0RBLFlBQVlBLGtGQUE2Q0EsWUFBWUE7b0JBQ3JFQSxnQkFBZ0JBLDJGQUFzREEsT0FBT0E7O29CQUU3RUEsZ0JBQWdCQSw0RkFBMkRBLFlBQVlBOztvQkFFdkZBLFlBQVlBLG9GQUErQ0EsTUFBTUE7b0JBQ2pFQSxVQUFVQSw4RUFBeUNBLE9BQU9BO29CQUMxREEsV0FBV0EsZ0lBQTJGQSxNQUFNQTtvQkFDNUdBLGdCQUFnQkEsdUhBQStEQSxNQUFNQTs7b0JBRXJGQSxZQUFZQSxpSkFBNEdBLFdBQVdBO29CQUNuSUEsV0FBV0EsNEZBQXVEQSxXQUFXQTs7MkNBR2pDQSxZQUFtQkEsWUFBbUJBLE9BQWNBLGdCQUF1QkEsTUFBYUE7O29CQUVwSUEsSUFBSUEsa0JBQWtCQSxRQUFRQSw0QkFBOENBLHlFQUFuQkEsMENBQXNEQSxBQUFzQ0E7bUNBQUtBLHNDQUFnQkE7O3dCQUV0S0EsY0FBY0EscUVBQWdDQTt3QkFDOUNBLElBQUlBLFdBQVdBOzRCQUVYQSxnQkFBZ0JBLFVBQUlBLDRDQUFrQkEsWUFBWUEsd0JBQXNCQSwyQkFBd0JBOzRCQUNoR0EsWUFBWUE7NEJBQ1pBLDBEQUFxQkE7NEJBRXJCQSxPQUFPQTs7OztvQkFJZkEsT0FBT0E7O3FDQUdzQ0E7O29CQUU3Q0EsS0FBa0NBOzs7OzRCQUU5QkEsSUFBSUEsbURBQWlEQTtnQ0FFakRBLGtDQUNwQkEsNEJBQXdFQSxNQUEzQ0EsNENBQWdEQSxBQUFzQ0E7O21EQUFLQSxxQ0FBZ0JBOzs7Ozs0QkFHeEhBLFFBQVFBLDRCQUFnREEsTUFBbkJBLDRDQUF3QkEsQUFBc0NBOzsrQ0FBS0Esc0RBQWlDQTs7OzRCQUN6SUEseUNBQXVDQTs7Ozs7Ozs7b0JBRzNDQSxPQUFPQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7a0NEWG9CQTtnQ0FDRkE7MkJBQ05BOzhCQUVGQTtrQ0FFWUE7a0NBeUIrQkEsS0FBSUE7Ozs7Z0JBbkVoRUEsaUJBQVlBLElBQUlBLHFDQUFrQkEsSUFBSUEseUNBQXNCQTtnQkFDNURBLDBDQUFxQ0EsQUFBNEJBOztvQkFFN0RBLDRCQUF1QkEsa0RBQWlDQTtvQkFDeERBLDBCQUFxQkEsa0RBQWlDQTs7O2dCQUcxREEsMkJBQXNCQTtvQkFBS0E7O2dCQUMzQkEseUJBQW9CQTtvQkFBS0E7OztnQkFFekJBLElBQUlBLG1CQUFjQTtvQkFDZEEsMEJBQXFCQTt3QkFFakJBLFFBQVFBO3dCQUNSQSxTQUFTQTt3QkFDVEEsZ0NBQTJCQTt3QkFDM0JBLDhCQUF5QkE7d0JBQ3pCQTt3QkFDQUE7Ozs7Z0JBR1JBLHFCQUFnQkE7b0JBQUtBOztnQkFDckJBLHFCQUFnQkE7b0JBQUtBOztnQkFDckJBO2dCQUNBQTtnQkFDQUEsVUFBVUEsSUFBSUEsNEJBQVNBLGdCQUFXQTs7b0JBRTlCQSxRQUFRQSxrREFBZ0NBO29CQUN4Q0EsNEJBQXVCQTtvQkFDdkJBLDBCQUFxQkEsa0RBQWlDQTs7b0JBRXREQSxnQ0FBMkJBO29CQUMzQkE7b0JBQ0FBOzs7Ozs7Z0JBY2hCQTtnQkFDWUEsSUFBSUEsdUJBQWdCQSxzQkFBZUE7b0JBRS9CQSxhQUFhQSx5QkFBa0JBLHVCQUFrQkEscUJBQWdCQTs7b0JBRWpFQSwwQkFBcUJBLHdDQUFnQ0EsdUJBQWlCQSxvRkFBT0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O29CRTVFckZBLE9BQU9BOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OzRCQUVtQkE7O2dCQUV0QkEsbUJBQWNBO2dCQUNkQTs7Ozs7Z0JBUUFBLDBCQUFxQkEsS0FBSUEsZ0ZBQXdCQSw0QkFBb0VBLGVBQXJDQSw4Q0FBOENBLEFBQTRDQTsrQkFBS0E7dUJBQUlBLElBQUlBLHNDQUFtQkE7Z0JBQzFNQSxtQkFBY0EsS0FBSUEseUVBQWlCQTs7K0JBa0JqQkEsaUJBQW1DQSxJQUFzQkE7O2dCQUUzRUEsSUFBR0EsbUJBQW1CQTtvQkFBTUEsTUFBTUEsSUFBSUE7O2dCQUN0Q0EsSUFBSUEsTUFBTUE7b0JBQU1BLE1BQU1BLElBQUlBOztnQkFDMUJBLE9BQU9BLGVBQVFBLDRCQUE0QkEsZUFBZUE7O2lDQUd4Q0EsVUFBaUJBLFFBQWVBOzs7O2dCQUdsREEsc0JBQXNCQSxVQUFLQTtnQkFDM0JBLFNBQVNBLFVBQUtBO2dCQUNkQSxJQUFJQSwyQkFBTUE7b0JBRU5BLE9BQU9BOztnQkFFWEEsT0FBT0EscUNBQVlBLGVBQVVBLGlCQUFpQkEsbUJBQXZDQTs7aUNBR2VBLGlCQUFtQ0EsSUFBc0JBOztnQkFFL0VBLElBQUlBLCtDQUErQ0E7b0JBRS9DQSxJQUFJQSxvRUFBK0NBO3dCQUUvQ0EsT0FBT0Esd0JBQXdCQTs7d0JBSS9CQSxTQUFTQSxlQUFVQSw2QkFBNkJBLElBQUlBLHdCQUF3QkE7d0JBQzVFQSxJQUFJQSxNQUFNQTs0QkFFTkEsT0FBT0E7Ozs7b0JBTWZBLE9BQU9BLFlBQU9BLGlCQUFpQkEsSUFBSUE7O2dCQUV2Q0EsT0FBT0E7OzhCQUdZQSxpQkFBbUNBLElBQXNCQTs7Z0JBRTVFQSxlQUFlQTtnQkFLZkEsMEJBQWtDQTs7Ozt3QkFFOUJBLElBQUlBLDBDQUFxQkE7NEJBRXJCQSxPQUFPQSxRQUFRQTs7NEJBSWZBLFdBQVdBLFlBQU9BLG1CQUFtQkEsSUFBSUEsUUFBUUE7NEJBQ2pEQSxJQUFJQSxRQUFRQTtnQ0FFUkEsT0FBT0E7Ozs7Ozs7Ozs7Z0JBS25CQSxPQUFPQTs7OztnQkFNUEEsT0FBT0EsTUFBOEJBLGtFQUFtQkE7OzRCQUc5QkE7Z0JBRTFCQSxPQUFPQSwyRUFBaUNBOzttQ0FLVEEsWUFBbUJBLFlBQW1CQSxPQUFjQSxhQUFvQkE7OztnQkFFdkdBLGNBQWNBLFVBQUtBO2dCQUNuQkEsSUFBSUEsV0FBV0E7b0JBRVhBLGdCQUFnQkEsVUFBSUEsNENBQWtCQSxZQUFZQSx3QkFFdENBLDJCQUNTQSx1Q0FDYUE7b0JBR2xDQSxnRUFBc0JBO29CQUN0QkE7b0JBQ0FBLE9BQU9BOzs7Z0JBR1hBLE9BQU9BOztpQ0FvQ3dCQSxZQUFtQkEsWUFDbERBLE9BQWNBLGFBQStCQTs7Z0JBRTdDQSxPQUFPQSxpQkFBVUEsWUFBWUEsWUFBWUEsT0FBT0Esd0JBQXdCQTs7a0NBcENyREE7Z0JBRW5CQSxpRUFBdUJBO2dCQUN2QkE7O29DQUdxQkE7Z0JBRXJCQSxtRUFBeUJBO2dCQUN6QkE7O29DQUdxQkE7Z0JBRXJCQSxtRUFBeUJBOztrQ0FHTEEsTUFBYUE7Z0JBRWpDQSxZQUFZQSw0QkFBa0RBLGtCQUFaQSw4Q0FBd0JBLEFBQXdCQTsrQkFBS0EsbUNBQWNBOztnQkFDckhBLElBQUlBLFNBQVNBO29CQUVUQSw2QkFBNkJBOztvQkFJN0JBLE1BQU1BLElBQUlBLHdDQUEwQkEsd0RBQStDQTs7OytCQWF2RUE7Z0JBRWhCQSw4REFBeUJBO2dCQUN6QkE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztvQkNsS0pBLE9BQU9BOzs7b0JBTVBBLDJDQUF3QkEsdUNBQThCQTs7Ozs7b0JBUXREQSxPQUFPQTs7O29CQU1QQSxrRUFBbUNBLHVCQUFjQTs7Ozs7b0JBUWpEQSxPQUFPQTs7O29CQU1QQSwyQ0FBd0JBLGlCQUFRQTs7Ozs7b0JBUWhDQSxPQUFPQTs7O29CQU1QQSwyQ0FBd0JBLGlCQUFRQTs7Ozs7b0JBUWhDQSxPQUFPQTs7O29CQU1QQSwyQ0FBd0JBLHNCQUFhQTs7Ozs7b0JBNkJyQ0EsT0FBT0E7OztvQkFNUEEscUdBQXlDQSw4QkFBcUJBOzs7OztvQkFROURBLE9BQU9BOzs7b0JBTVBBLDJDQUF3QkEsc0JBQWFBOzs7OztvQkFRckNBLE9BQU9BOzs7b0JBTVBBLDJEQUE0QkEsc0JBQWFBOzs7OztvQkFRekNBLE9BQU9BOzs7b0JBTVBBLDJDQUF3QkEsMEJBQWlCQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Z0JBdkVyQ0EsMEJBQXFCQSxLQUFJQTs7OEJBRUpBLFlBQW1CQTs7O2dCQUV4Q0Esa0JBQWFBO2dCQUNiQSxrQkFBYUE7Z0JBQ2JBLDBCQUFxQkEsS0FBSUE7Ozs7O2dCQWxGekJBLE9BQU9BLG9CQUFlQSxPQUFPQSxxQ0FBNkJBLGlCQUFXQSx3RkFBTUEsK0JBQXlCQSxnQ0FBd0JBLHdGQUFNQTs7MkJBeUZ0SEE7Z0JBRVpBLGtCQUFrQkE7Z0JBQ2xCQSw0QkFBdUJBOzs7Ozs7Ozs7Ozs7Ozs7O29CQ3RGM0JBLE9BQU9BOzs7b0JBTVBBLDJDQUF3QkEsb0JBQVdBOzs7OztvQkFPbkNBLE9BQU9BOzs7OztvQkFNUEEsT0FBT0E7Ozs7O29CQU9QQSxPQUFPQTs7O29CQU1QQSwyQ0FBd0JBLHVCQUFjQTs7Ozs7b0JBUXRDQSxPQUFPQTs7O29CQU1QQSwyQ0FBd0JBLHFCQUFZQTs7Ozs7OzBDQWdCZ0NBLEtBQUlBOzs7Ozs7OzhCQVJ0REEsTUFBWUE7OztnQkFFMUJBLGdCQUFXQTtnQkFDWEEsbUJBQWNBO2dCQUNkQTs7Ozs7Z0JBakVBQSxPQUFPQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs0QkNFa0JBOztnQkFFekJBLFlBQU9BO2dCQUNQQSxvQkFBZUEscUZBQWdDQSx1REFBY0EsS0FBSUE7Z0JBQ2pFQSxhQUFRQSw4RUFBeUJBLHFEQUFZQSxLQUFJQTtnQkFDakRBLGtEQUErQkE7Ozs7OEJBZDFCQSxHQUFHQTtnQkFFcEJBO2dCQUFtQkEsSUFBSUEsOEhBQTRCQSxRQUFRQSxDQUFDQSxRQUFPQSxvSUFBZ0JBLGNBQWNBO29CQUVqRkEsT0FBT0E7O2dCQUVYQSxPQUFPQTs7O2lDQWNJQSxLQUFZQTtnQkFFdkJBLElBQUlBLDhIQUE0QkE7b0JBRTVCQSwwSEFBZ0JBLEtBQU9BOztvQkFJdkJBLHNIQUFvQkEsS0FBSUE7Ozs7Ozs7Ozs7OztvQ0FLNUJBLGVBQVVBLG9EQUFXQTtvQ0FDckJBLGVBQVVBLGtEQUFTQTtvQ0FDbkJBLFNBQU1BOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7NENBR29DQTtnQkFFMUNBLFdBQVdBO2dCQUNYQSxPQUFPQSw0QkFBeURBLE1BQW5CQSxxREFBd0JBLEFBQStCQTsrQkFBS0EsbURBQTBCQSx1QkFBa0JBLG1EQUEwQkE7Ozs7Z0JBTy9LQSxPQUFPQSxvREFBaUNBOztpQ0FFdEJBO2dCQUVsQkEsSUFBSUEsOEJBQTZCQTtvQkFDN0JBLE1BQU1BLElBQUlBOzs7Z0JBRWRBLElBQUlBLDJDQUEyQ0EsUUFBUUEsMkJBQTJCQTtvQkFDOUVBLDBDQUEwQ0E7O29CQUN6Q0EsSUFBSUEsMkNBQTJDQSxRQUFRQSwyQkFBMkJBO3dCQUNuRkEsMEJBQ2hCQSw0QkFBNkVBLG1CQUF2Q0EscURBQW9EQSxBQUErQkE7dUNBQUtBLHFDQUFnQkE7Ozs7Z0JBQ2xJQSxJQUFJQSw4QkFBOEJBLFFBQVFBLDBCQUEwQkE7b0JBQ2hFQSw2QkFBNkJBOztvQkFDNUJBLElBQUlBLDhCQUE4QkEsUUFBUUEsMEJBQTBCQTt3QkFDckVBLHlCQUF5QkEsNEJBQWtEQSxZQUFaQSw4Q0FBa0JBLEFBQXdCQTt1Q0FBS0EsbUNBQWNBOzs7OztnQkFFaElBLFdBQVdBLDRCQUF5Q0EsWUFBWkEscUNBQWtCQSxBQUF3QkE7K0JBQUtBLG1DQUFjQTs7Z0JBQ3JHQSxJQUFJQSw0QkFBOENBLHlCQUFuQkEsMENBQTJDQSxBQUErQkE7K0JBQUtBLHFDQUFnQkE7O29CQUUxSEEsNEJBQTRCQTs7O2dCQUdoQ0Esc0JBQWlCQTtnQkFDakJBOztvQ0FHcUJBO2dCQUVyQkEseUJBQW9CQTtnQkFDcEJBOzs7Z0JBS0FBLE9BQU9BOzsrQkFHU0E7Z0JBRWhCQSxlQUFVQTtnQkFDVkE7OztrQ0FJbUJBO2dCQUVuQkEsa0JBQWFBO2dCQUNiQTs7b0NBR3FCQTs7O2lDQU1VQSxRQUFlQSxRQUFlQSxPQUFjQSxRQUEwQkE7Z0JBRXJHQSxPQUFPQSwwREFBdUNBLFFBQVFBLFFBQVFBLE9BQU9BLG1CQUFtQkEsTUFBTUE7Ozs7Ozs7Ozs7Ozs0QkMvR3hFQTs7Z0JBRXRCQSxtQkFBY0E7Ozs7K0JBRUNBLEdBQXFCQTtnQkFFcENBLFdBQVdBLCtEQUFvQkEsR0FBR0E7Z0JBQ2xDQSxJQUFJQTtvQkFBVUE7O2dCQUNkQSxPQUFPQSIsCiAgInNvdXJjZXNDb250ZW50IjogWyJ1c2luZyBCcmlkZ2U7XHJcbnVzaW5nIE5ld3RvbnNvZnQuSnNvbjtcclxudXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcclxudXNpbmcgQnJpZGdlLkh0bWw1O1xyXG51c2luZyBIb3dGYXIuQ29yZS5Nb2RlbHM7XHJcblxyXG5uYW1lc3BhY2UgSG93RmFyLkJyaWRnZVxyXG57XHJcblxyXG4gXHJcblxyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBBcHAgXHJcbiAgICB7XHJcbiAgICAgIFxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgTWFpbigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvL1dpbmRvdy5PbkxvYWQgPSBlID0+IHsgbmV3IEFwcE1vZGVsKCk7IH07XHJcblxyXG4gICAgICAgICAgICBuZXcgQXBwTW9kZWwoKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBcclxuICAgICAgXHJcbiAgICB9XHJcbn0iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db21wb25lbnRNb2RlbDtcclxudXNpbmcgU3lzdGVtLlJ1bnRpbWUuQ29tcGlsZXJTZXJ2aWNlcztcclxuXHJcbm5hbWVzcGFjZSBIb3dGYXIuQ29yZVxyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgQmluZGFibGVCYXNlIDogSU5vdGlmeVByb3BlcnR5Q2hhbmdlZFxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBldmVudCBQcm9wZXJ0eUNoYW5nZWRFdmVudEhhbmRsZXIgUHJvcGVydHlDaGFuZ2VkO1xyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBTZXRQcm9wZXJ0eTxUPihyZWYgVCBwcm9wZXJ0eSwgVCB2YWx1ZSwgQWN0aW9uIGFjdGlvbiA9IG51bGwsIFtDYWxsZXJNZW1iZXJOYW1lXSBzdHJpbmcgbmFtZSA9IG51bGwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoKHByb3BlcnR5IT1udWxsP3Byb3BlcnR5LkVxdWFscyh2YWx1ZSk6KGJvb2w/KW51bGwpICE9IHRydWUpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHByb3BlcnR5ID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICBPblByb3BlcnR5Q2hhbmdlZChuYW1lKTtcclxuICAgICAgICAgICAgICAgIGFjdGlvbiE9bnVsbD9nbG9iYWw6OkJyaWRnZS5TY3JpcHQuRnJvbUxhbWJkYSgoKT0+YWN0aW9uLkludm9rZSgpKTpudWxsO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuI2lmICFCUklER0VcclxuICAgICAgICBbSG93RmFyLkNvcmUuQW5ub3RhdGlvbnMuTm90aWZ5UHJvcGVydHlDaGFuZ2VkSW52b2NhdG9yXVxyXG4jZW5kaWZcclxuICAgICAgICBwcm90ZWN0ZWQgdmlydHVhbCB2b2lkIE9uUHJvcGVydHlDaGFuZ2VkKFtDYWxsZXJNZW1iZXJOYW1lXSBzdHJpbmcgcHJvcGVydHlOYW1lID0gbnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFByb3BlcnR5Q2hhbmdlZCE9bnVsbD9nbG9iYWw6OkJyaWRnZS5TY3JpcHQuRnJvbUxhbWJkYSgoKT0+UHJvcGVydHlDaGFuZ2VkLkludm9rZSh0aGlzLCBuZXcgUHJvcGVydHlDaGFuZ2VkRXZlbnRBcmdzKHByb3BlcnR5TmFtZSkpKTpudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5UaHJlYWRpbmcuVGFza3M7XHJcbnVzaW5nIEJyaWRnZTtcclxudXNpbmcgQnJpZGdlLkh0bWw1O1xyXG5cclxubmFtZXNwYWNlIEhvd0Zhci5Db3JlLk1vZGVsc1xyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgQWRkTW9kZWxcclxuICAgIHtcclxuICAgICAgICBwcml2YXRlIEhUTUxJbnB1dEVsZW1lbnQgbmFtZTtcclxuICAgICAgICBwcml2YXRlIEhUTUxJbnB1dEVsZW1lbnQgcXVhbnRpdHk7XHJcbiAgICAgICAgcHJpdmF0ZSBIVE1MU2VsZWN0RWxlbWVudCB1bml0O1xyXG4gICAgICAgIHByaXZhdGUgSFRNTEVsZW1lbnQgYnRuO1xyXG4gICAgICAgIHB1YmxpYyBBZGRNb2RlbChJTWVhc3VyZUNvbnZlcnRlcnMgY29udmVydGVycywgQWN0aW9uPE9iamVjdE1lYXN1cmVtZW50PiBvbkFkZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG5hbWUgPSBEb2N1bWVudC5HZXRFbGVtZW50QnlJZDxIVE1MSW5wdXRFbGVtZW50PihcImFkZF9uYW1lXCIpO1xyXG4gICAgICAgICAgICBxdWFudGl0eSA9IERvY3VtZW50LkdldEVsZW1lbnRCeUlkPEhUTUxJbnB1dEVsZW1lbnQ+KFwiYWRkX251bVwiKTtcclxuICAgICAgICAgICAgdW5pdCA9IERvY3VtZW50LkdldEVsZW1lbnRCeUlkPEhUTUxTZWxlY3RFbGVtZW50PihcImFkZF91bml0XCIpO1xyXG4gICAgICAgICAgICBidG4gPSBEb2N1bWVudC5HZXRFbGVtZW50QnlJZChcImFkZF9idG5cIik7XHJcblxyXG4gICAgICAgICAgICBjb252ZXJ0ZXJzLk9iamVjdE1lYXN1cmVtZW50cy5Gb3JFYWNoKChBY3Rpb248T2JqZWN0TWVhc3VyZW1lbnQ+KShwID0+IHVuaXQuQXBwZW5kQ2hpbGQobmV3IEhUTUxPcHRpb25FbGVtZW50KCkgeyBUZXh0ID0gcC5QbHVyYWxOYW1lIH0pKSk7XHJcbiAgICAgICAgICAgIFNjcmlwdC5DYWxsKFwidXBkYXRlXCIpO1xyXG4gICAgICAgICAgICBidG4uT25DbGljayA9IGUgPT5cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IGNvbnZlcnRlcnMuTmV3T2JqZWN0KG5hbWUuVmFsdWUsIG5hbWUuVmFsdWUsIHF1YW50aXR5LlZhbHVlQXNOdW1iZXIsIHVuaXQuVmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgbmFtZS5WYWx1ZSA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICBxdWFudGl0eS5WYWx1ZSA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIG9uQWRkKHJlc3VsdCk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBBcHBNb2RlbCA6IElBcHBcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgQXBwTW9kZWwoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY29udmVydGVyID0gbmV3IE1lYXN1cmVDb252ZXJ0ZXJzKG5ldyBPYmplY3RSZXBvc2l0b3J5Q2FjaGUodGhpcykpO1xyXG4gICAgICAgICAgICBjb252ZXJ0ZXIuT2JqZWN0TWVhc3VyZW1lbnRzLkZvckVhY2goKEFjdGlvbjxPYmplY3RNZWFzdXJlbWVudD4pKHAgPT5cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZnJvbVNlbGVjdC5BcHBlbmRDaGlsZChuZXcgSFRNTE9wdGlvbkVsZW1lbnQoKSB7IFRleHQgPSBwLlBsdXJhbE5hbWUgfSk7XHJcbiAgICAgICAgICAgICAgICB0b1NlbGVjdC5BcHBlbmRDaGlsZChuZXcgSFRNTE9wdGlvbkVsZW1lbnQoKSB7IFRleHQgPSBwLlBsdXJhbE5hbWUgfSk7XHJcbiAgICAgICAgICAgIH0pKTtcclxuXHJcbiAgICAgICAgICAgIGZyb21TZWxlY3QuT25DaGFuZ2UgPSBlID0+IENvbnZlcnQoKTtcclxuICAgICAgICAgICAgdG9TZWxlY3QuT25DaGFuZ2UgPSBlID0+IENvbnZlcnQoKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChyZXZlcnNlYnRuICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICByZXZlcnNlYnRuLk9uQ2xpY2sgPSBlID0+XHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGYgPSBmcm9tU2VsZWN0LlNlbGVjdGVkSW5kZXg7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRvID0gdG9TZWxlY3QuU2VsZWN0ZWRJbmRleDtcclxuICAgICAgICAgICAgICAgICAgICBmcm9tU2VsZWN0LlNlbGVjdGVkSW5kZXggPSB0bztcclxuICAgICAgICAgICAgICAgICAgICB0b1NlbGVjdC5TZWxlY3RlZEluZGV4ID0gZjtcclxuICAgICAgICAgICAgICAgICAgICBTY3JpcHQuQ2FsbChcInVwZGF0ZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICBDb252ZXJ0KCk7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgbnVtLk9uS2V5RG93biA9IGUgPT4gQ29udmVydCgpO1xyXG4gICAgICAgICAgICBudW0uT25Nb3VzZVVwID0gZSA9PiBDb252ZXJ0KCk7XHJcbiAgICAgICAgICAgIFNjcmlwdC5DYWxsKFwiY2hvb3NlXCIpO1xyXG4gICAgICAgICAgICBDb252ZXJ0KCk7XHJcbiAgICAgICAgICAgIHZhciBhZGQgPSBuZXcgQWRkTW9kZWwoY29udmVydGVyLCBwID0+XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciBmID0gbmV3IEhUTUxPcHRpb25FbGVtZW50KCkge1RleHQgPSBwLlBsdXJhbE5hbWV9O1xyXG4gICAgICAgICAgICAgICAgZnJvbVNlbGVjdC5BcHBlbmRDaGlsZChmKTtcclxuICAgICAgICAgICAgICAgIHRvU2VsZWN0LkFwcGVuZENoaWxkKG5ldyBIVE1MT3B0aW9uRWxlbWVudCgpIHsgVGV4dCA9IHAuUGx1cmFsTmFtZSB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBmcm9tU2VsZWN0LlNlbGVjdGVkSW5kZXggPSBmLkluZGV4O1xyXG4gICAgICAgICAgICAgICAgU2NyaXB0LkNhbGwoXCJ1cGRhdGVcIik7XHJcbiAgICAgICAgICAgICAgICBDb252ZXJ0KCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBIVE1MU2VsZWN0RWxlbWVudCBmcm9tU2VsZWN0ID0gRG9jdW1lbnQuR2V0RWxlbWVudEJ5SWQ8SFRNTFNlbGVjdEVsZW1lbnQ+KFwiZnJvbVwiKTtcclxuICAgICAgICBIVE1MU2VsZWN0RWxlbWVudCB0b1NlbGVjdCA9IERvY3VtZW50LkdldEVsZW1lbnRCeUlkPEhUTUxTZWxlY3RFbGVtZW50PihcInRvXCIpO1xyXG4gICAgICAgIEhUTUxJbnB1dEVsZW1lbnQgbnVtID0gRG9jdW1lbnQuR2V0RWxlbWVudEJ5SWQ8SFRNTElucHV0RWxlbWVudD4oXCJudW1cIik7XHJcblxyXG4gICAgICAgIEhUTUxFbGVtZW50IGFuc3dlciA9IERvY3VtZW50LkdldEVsZW1lbnRCeUlkKFwiYW5zd2VyXCIpO1xyXG5cclxuICAgICAgICBwcml2YXRlIEhUTUxFbGVtZW50IHJldmVyc2VidG4gPSBEb2N1bWVudC5HZXRFbGVtZW50QnlJZChcInJldmVyc2VcIik7XHJcblxyXG4gICAgICAgIE1lYXN1cmVDb252ZXJ0ZXJzIGNvbnZlcnRlcjtcclxuICAgICAgICB2b2lkIENvbnZlcnQoKVxyXG4gICAgICAgIHtcclxuZG91YmxlIG47XG4gICAgICAgICAgICBpZiAoZG91YmxlLlRyeVBhcnNlKG51bS5WYWx1ZSwgb3V0IG4pKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gY29udmVydGVyLkNvbnZlcnQoZnJvbVNlbGVjdC5WYWx1ZSwgdG9TZWxlY3QuVmFsdWUsIG4pO1xyXG5cclxuICAgICAgICAgICAgICAgIGFuc3dlci5UZXh0Q29udGVudCA9IHN0cmluZy5Gb3JtYXQoXCIxIHswfSA9IHsxfSB7Mn1cIixmcm9tU2VsZWN0LlZhbHVlLHJlc3VsdCx0b1NlbGVjdC5WYWx1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBJRGljdGlvbmFyeTxzdHJpbmcsIG9iamVjdD4gUHJvcGVydGllcyB7IGdldDsgcHJpdmF0ZSBzZXQ7IH1cclxuICAgICAgICBwdWJsaWMgYXN5bmMgVGFzayBTYXZlUHJvcGVydGllc0FzeW5jKClcclxuICAgICAgICB7XHJcblxyXG4gICAgICAgIH1cclxuXG5cclxuXHJcblxyXG5cclxuICAgIFxucHJpdmF0ZSBJRGljdGlvbmFyeTxzdHJpbmcsIG9iamVjdD4gX19Qcm9wZXJ0eV9fSW5pdGlhbGl6ZXJfX1Byb3BlcnRpZXM9bmV3IERpY3Rpb25hcnk8c3RyaW5nLCBvYmplY3Q+KCk7fVxyXG59IiwidXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5PYmplY3RNb2RlbDtcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcblxyXG5uYW1lc3BhY2UgSG93RmFyLkNvcmUuTW9kZWxzXHJcbntcclxuICAgIHB1YmxpYyBzdGF0aWMgY2xhc3MgT2JqZWN0UmVwb3NpdG9yeVNlZWRlclxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBjb25zdCBzdHJpbmcgTWV0cmljID0gXCJNZXRyaWNcIjtcclxuICAgICAgICBwdWJsaWMgY29uc3Qgc3RyaW5nIEltcGVyaWFsID0gXCJJbXBlcmlhbFwiO1xyXG4gICAgICAgIHB1YmxpYyBjb25zdCBzdHJpbmcgU3BhY2UgPSBcIlNwYWNlXCI7XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBTdGFydHVwKElPYmplY3RSZXBvc2l0b3J5IHJlcG9zaXRvcnkpXHJcbiAgICAgICAge1xyXG4jaWYgQlJJREdFXHJcbiAgICAgICAgICAgIHZhciBvYmplY3RQYWNrcyA9IG5ldyBMaXN0PE9iamVjdFBhY2s+KCk7XHJcbiNlbHNlXHJcbiAgICAgICAgICAgICAgICB2YXIgb2JqZWN0UGFja3MgPSBuZXcgT2JzZXJ2YWJsZUNvbGxlY3Rpb248T2JqZWN0UGFjaz4oKTtcclxuI2VuZGlmXHJcbiAgICAgICAgICAgIHZhciBjZW50aW1ldGVyID0gbmV3IE9iamVjdE1lYXN1cmVtZW50KFwiQ2VudGltZXRlclwiLCBcIkNlbnRpbWV0ZXJzXCIpIHsgVmFsdWUgPSAxIH07XHJcbiAgICAgICAgICAgIGNlbnRpbWV0ZXIuT2JqZWN0UGFja05hbWUgPSBNZXRyaWM7XHJcbiAgICAgICAgICAgIG9iamVjdFBhY2tzLkFkZChuZXcgT2JqZWN0UGFjayhcIkN1c3RvbVwiLCBcIk9iamVjdHMgdGhhdCBhcmUgbWFkZSBpbiB0aGUgYXBwIGFyZSBwbGFjZWQgaGVyZS5cIikgeyBQYWNrSW1hZ2UgPSBcIkFzc2V0cy9ibG9jay5wbmdcIiB9KTtcclxuICAgICAgICAgICAgb2JqZWN0UGFja3MuQWRkKG5ldyBPYmplY3RQYWNrKEltcGVyaWFsLCBcIkEgZGVmYXVsdCBwYWNrYWdlIGZvciB0aGUgVVMgbWVhc3VyZW1lbnQgc3lzdGVtXCIpIHsgUGFja0ltYWdlID0gXCJodHRwczovL2xvZ29lcHMuY29tL3dwLWNvbnRlbnQvdXBsb2Fkcy8yMDEzLzA2L2ZsYWctb2YtdXNhLXZlY3Rvci1sb2dvLnBuZ1wiIH0pO1xyXG4gICAgICAgICAgICBvYmplY3RQYWNrcy5BZGQobmV3IE9iamVjdFBhY2soTWV0cmljLCBcIlRoZSBtZXRyaWMgc3lzdGVtLiAgVXNlZCBieSBldmVyeW9uZSBleGNlcHQgdGhlIFVTXCIpIHsgUGFja0ltYWdlID0gXCJodHRwOi8vd3d3LmtuaWdodHN0ZW1wbGFyb3JkZXIub3JnL3dwLWNvbnRlbnQvdXBsb2Fkcy8yMDE2LzA2L1VOLVNFQUwtU3R5bGl6ZWQtNTAwLUJyb3duLnBuZ1wiIH0pO1xyXG4gICAgICAgICAgICBvYmplY3RQYWNrcy5BZGQobmV3IE9iamVjdFBhY2soU3BhY2UsIFwiT2JqZWN0cyBhbmQgTWVhc3VyZW1lbnRzIGluIHNwYWNlXCIpIHsgUGFja0ltYWdlID0gXCJodHRwczovL3NlcC55aW1nLmNvbS9heS9za3lpbWFnZS9uYXNhLXNwYWNlLW1pc3Npb25zLTkuanBnXCIgfSk7XHJcbiAgICAgICAgICAgIHZhciBwYWNrcyA9IFN5c3RlbS5MaW5xLkVudW1lcmFibGUuVG9MaXN0PE9iamVjdFBhY2s+KHJlcG9zaXRvcnkuR2V0T2JqZWN0UGFja3MoKSk7XHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciBvYmplY3RQYWNrIGluIG9iamVjdFBhY2tzKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIVN5c3RlbS5MaW5xLkVudW1lcmFibGUuU2VsZWN0PE9iamVjdFBhY2ssc3RyaW5nPihwYWNrcywoU3lzdGVtLkZ1bmM8T2JqZWN0UGFjayxzdHJpbmc+KShwID0+IHAuUGFja05hbWUpKS5Db250YWlucyhvYmplY3RQYWNrLlBhY2tOYW1lKSlcclxuICAgICAgICAgICAgICAgICAgICByZXBvc2l0b3J5LkFkZFBhY2sob2JqZWN0UGFjayk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vZGIuU2F2ZUNoYW5nZXMoKTtcclxuICAgICAgICAgICAgaWYgKFN5c3RlbS5MaW5xLkVudW1lcmFibGUuQWxsPE9iamVjdE1lYXN1cmVtZW50PihyZXBvc2l0b3J5LkdldE9iamVjdE1lYXN1cmVtZW50cygpLChTeXN0ZW0uRnVuYzxPYmplY3RNZWFzdXJlbWVudCxib29sPikocCA9PiBwLlNpbmdsZU5hbWUgIT0gY2VudGltZXRlci5TaW5nbGVOYW1lKSkpXHJcbiAgICAgICAgICAgICAgICByZXBvc2l0b3J5LkFkZE9iamVjdChjZW50aW1ldGVyKTtcclxuICAgICAgICAgICAgLy9yZXBvc2l0b3J5LlVwZGF0ZVBhY2soSW1wZXJpYWwsIGNlbnRpbWV0ZXIpO1xyXG4gICAgICAgICAgICB2YXIgaW5jaGVzID0gcmVwb3NpdG9yeS5OZXdPYmplY3QoXCJJbmNoZXNcIiwgXCJJbmNoXCIsIDIuNTQsIGNlbnRpbWV0ZXIsIEltcGVyaWFsKTtcclxuICAgICAgICAgICAgdmFyIGZlZXQgPSByZXBvc2l0b3J5Lk5ld09iamVjdChcIkZlZXRcIiwgXCJGb290XCIsIDEyLCBpbmNoZXMsIEltcGVyaWFsKTtcclxuICAgICAgICAgICAgdmFyIG1pbGUgPSByZXBvc2l0b3J5Lk5ld09iamVjdChcIk1pbGVzXCIsIFwiTWlsZVwiLCA1MjgwLCBmZWV0LCBJbXBlcmlhbCk7XHJcbiAgICAgICAgICAgIHZhciBtZXRlciA9IHJlcG9zaXRvcnkuTmV3T2JqZWN0KFwiTWV0ZXJzXCIsIFwiTWV0ZXJcIiwgMTAwLCBjZW50aW1ldGVyLCBNZXRyaWMpO1xyXG4gICAgICAgICAgICB2YXIga2lsb01ldGVyID0gcmVwb3NpdG9yeS5OZXdPYmplY3QoXCJLaWxvbWV0ZXJzXCIsIFwiS2lsb21ldGVyXCIsIDEwMDAsIG1ldGVyLCBNZXRyaWMpO1xyXG5cclxuICAgICAgICAgICAgdmFyIG5hbm9NZXRlciA9IHJlcG9zaXRvcnkuTmV3T2JqZWN0KFwiTmFub21ldGVyc1wiLCBcIk5hbm9tZXRlclwiLCAwLjAwMDAwMDEsIGNlbnRpbWV0ZXIsIE1ldHJpYyk7XHJcblxyXG4gICAgICAgICAgICB2YXIgZWFydGggPSByZXBvc2l0b3J5Lk5ld09iamVjdChcIkVhcnRoc1wiLCBcIkVhcnRoXCIsIDI1MDAwLCBtaWxlLCBTcGFjZSk7XHJcbiAgICAgICAgICAgIHZhciBzdW4gPSByZXBvc2l0b3J5Lk5ld09iamVjdChcIlN1bnNcIiwgXCJTdW5cIiwgMTAzLCBlYXJ0aCwgU3BhY2UpO1xyXG4gICAgICAgICAgICB2YXIgZGlzdCA9IHJlcG9zaXRvcnkuTmV3T2JqZWN0KFwiRGlzdGFuY2UgZnJvbSBFYXJ0aCB0byBTdW5cIiwgXCJEaXN0YW5jZSBmcm9tIEVhcnRoIHRvIFN1blwiLCA5Mjk1NTgwNywgbWlsZSwgU3BhY2UpO1xyXG4gICAgICAgICAgICB2YXIgbGlnaHR5ZWFyID0gcmVwb3NpdG9yeS5OZXdPYmplY3QoXCJMaWdodHllYXJzXCIsIFwiTGlnaHR5ZWFyXCIsIDU4Nzg2MjUwMDAwMDAsIG1pbGUsIFNwYWNlKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBhbHBoYSA9IHJlcG9zaXRvcnkuTmV3T2JqZWN0KFwiRGlzdGFuY2UgZnJvbSBFYXJ0aCB0byBBbHBoYSBDZW50YXVyaVwiLCBcIkRpc3RhbmNlIGZyb20gRWFydGggdG8gQWxwaGEgQ2VudGF1cmlcIiwgNC40LCBsaWdodHllYXIsIFNwYWNlKTtcclxuICAgICAgICAgICAgdmFyIHBpY28gPSByZXBvc2l0b3J5Lk5ld09iamVjdChcIlBpY29tZXRlcnNcIiwgXCJQaWNvbWV0ZXJcIiwgMC4wMDEsIG5hbm9NZXRlciwgTWV0cmljKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgT2JqZWN0TWVhc3VyZW1lbnQgTmV3T2JqZWN0QWN0aW9uKHN0cmluZyBwbHVyYWxOYW1lLCBzdHJpbmcgc2luZ2xlTmFtZSwgZG91YmxlIHZhbHVlLCBzdHJpbmcgbWVhc3VyZW1lbnRTdHIsIHN0cmluZyBwYWNrLCBJT2JqZWN0UmVwb3NpdG9yeSByZXBvc2l0b3J5KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKG1lYXN1cmVtZW50U3RyICE9IG51bGwgJiYgU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5BbGw8T2JqZWN0TWVhc3VyZW1lbnQ+KHJlcG9zaXRvcnkuR2V0T2JqZWN0TWVhc3VyZW1lbnRzKCksKFN5c3RlbS5GdW5jPE9iamVjdE1lYXN1cmVtZW50LGJvb2w+KShwID0+IHAuU2luZ2xlTmFtZSAhPSBzaW5nbGVOYW1lKSkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciBtZWFzdXJlID0gcmVwb3NpdG9yeS5HZXRPYmplY3RNZWFzdXJlbWVudChtZWFzdXJlbWVudFN0cik7XHJcbiAgICAgICAgICAgICAgICBpZiAobWVhc3VyZSAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBuZXdPYmplY3QgPSBuZXcgT2JqZWN0TWVhc3VyZW1lbnQoc2luZ2xlTmFtZSwgcGx1cmFsTmFtZSkgeyBWYWx1ZSA9IHZhbHVlLCBPYmplY3RQYWNrTmFtZSA9IHBhY2sgfTtcclxuICAgICAgICAgICAgICAgICAgICBtZWFzdXJlLkFkZChuZXdPYmplY3QpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlcG9zaXRvcnkuQWRkT2JqZWN0KG5ld09iamVjdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9yZXBvc2l0b3J5LlVwZGF0ZVBhY2socGFjaywgbmV3T2JqZWN0KTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3T2JqZWN0O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgSUxpc3Q8T2JqZWN0TWVhc3VyZW1lbnQ+IFNldHVwVHJlZShJTGlzdDxPYmplY3RNZWFzdXJlbWVudD4gZGF0YSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciBvYmplY3RNZWFzdXJlbWVudCBpbiBkYXRhKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAob2JqZWN0TWVhc3VyZW1lbnQuUGFyZW50TWVhc3VyZW1lbnRTaW5nbGVOYW1lICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgb2JqZWN0TWVhc3VyZW1lbnQuTWVhc3VyZW1lbnQgPVxyXG5TeXN0ZW0uTGlucS5FbnVtZXJhYmxlLkZpcnN0PE9iamVjdE1lYXN1cmVtZW50PiggICAgICAgICAgICAgICAgICAgICAgICBkYXRhLChTeXN0ZW0uRnVuYzxPYmplY3RNZWFzdXJlbWVudCxib29sPikocCA9PiBwLlNpbmdsZU5hbWUgPT0gb2JqZWN0TWVhc3VyZW1lbnQuUGFyZW50TWVhc3VyZW1lbnRTaW5nbGVOYW1lKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHQgPSBTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLldoZXJlPE9iamVjdE1lYXN1cmVtZW50PihkYXRhLChTeXN0ZW0uRnVuYzxPYmplY3RNZWFzdXJlbWVudCxib29sPikocCA9PiBwLlBhcmVudE1lYXN1cmVtZW50U2luZ2xlTmFtZSA9PSBvYmplY3RNZWFzdXJlbWVudC5TaW5nbGVOYW1lKSk7XHJcbiAgICAgICAgICAgICAgICBvYmplY3RNZWFzdXJlbWVudC5PYmplY3RNZWFzdXJlbWVudHMgPSB0LlRvTGlzdCgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZGF0YTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuT2JqZWN0TW9kZWw7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG5cclxubmFtZXNwYWNlIEhvd0Zhci5Db3JlLk1vZGVsc1xyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgTWVhc3VyZUNvbnZlcnRlcnMgOiBJTWVhc3VyZUNvbnZlcnRlcnNcclxuICAgIHtcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IElPYmplY3RSZXBvc2l0b3J5IF9yZXBvc2l0b3J5O1xyXG5wdWJsaWMgT2JqZWN0TWVhc3VyZW1lbnQgQ2VudGltZXRlclxyXG57XHJcbiAgICBnZXRcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gRmluZChcIkNlbnRpbWV0ZXJcIik7XHJcbiAgICB9XHJcbn0gICAgICAgIHB1YmxpYyBNZWFzdXJlQ29udmVydGVycyhJT2JqZWN0UmVwb3NpdG9yeSByZXBvc2l0b3J5KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgX3JlcG9zaXRvcnkgPSByZXBvc2l0b3J5O1xyXG4gICAgICAgICAgICBVcGRhdGVMaXN0KCk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcblxyXG4jaWYgQlJJREdFXHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIFVwZGF0ZUxpc3QoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgT2JqZWN0TWVhc3VyZW1lbnRzID0gbmV3IExpc3Q8T2JqZWN0TWVhc3VyZW1lbnQ+KFN5c3RlbS5MaW5xLkVudW1lcmFibGUuT3JkZXJCeTxPYmplY3RNZWFzdXJlbWVudCxPYmplY3RNZWFzdXJlbWVudD4oR2V0QWxsKCksKEZ1bmM8T2JqZWN0TWVhc3VyZW1lbnQsT2JqZWN0TWVhc3VyZW1lbnQ+KShwID0+IHApLCBuZXcgTWVhc3VyZW1lbnRDb21wYXJlKHRoaXMpKSk7XHJcbiAgICAgICAgICAgIE9iamVjdFBhY2tzID0gbmV3IExpc3Q8T2JqZWN0UGFjaz4oX3JlcG9zaXRvcnkuR2V0T2JqZWN0UGFja3MoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBMaXN0PE9iamVjdFBhY2s+IE9iamVjdFBhY2tzIHsgZ2V0OyBzZXQ7IH1cclxuICAgICAgICBwdWJsaWMgTGlzdDxPYmplY3RNZWFzdXJlbWVudD4gT2JqZWN0TWVhc3VyZW1lbnRzIHsgZ2V0OyBzZXQ7IH1cclxuXHJcbiNlbHNlXHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIFVwZGF0ZUxpc3QoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgT2JqZWN0TWVhc3VyZW1lbnRzID0gbmV3IE9ic2VydmFibGVDb2xsZWN0aW9uPE9iamVjdE1lYXN1cmVtZW50PihHZXRBbGwoKS5PcmRlckJ5KHAgPT4gcCwgbmV3IE1lYXN1cmVtZW50Q29tcGFyZSh0aGlzKSkpO1xyXG4gICAgICAgICAgICBPYmplY3RQYWNrcyA9IG5ldyBPYnNlcnZhYmxlQ29sbGVjdGlvbjxPYmplY3RQYWNrPihfcmVwb3NpdG9yeS5HZXRPYmplY3RQYWNrcygpKTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBPYnNlcnZhYmxlQ29sbGVjdGlvbjxPYmplY3RQYWNrPiBPYmplY3RQYWNrcyB7IGdldDsgc2V0OyB9XHJcbiAgICAgICAgcHVibGljIE9ic2VydmFibGVDb2xsZWN0aW9uPE9iamVjdE1lYXN1cmVtZW50PiBPYmplY3RNZWFzdXJlbWVudHMgeyBnZXQ7IHNldDsgfVxyXG5cclxuI2VuZGlmXHJcblxyXG5cclxuICAgICAgICBwdWJsaWMgZG91YmxlIENvbnZlcnQoT2JqZWN0TWVhc3VyZW1lbnQgZnJvbU1lYXN1cmVtZW50LCBPYmplY3RNZWFzdXJlbWVudCB0bywgZG91YmxlIHZhbHVlRnJvbSA9IDEpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZihmcm9tTWVhc3VyZW1lbnQgPT0gbnVsbCkgdGhyb3cgbmV3IEFyZ3VtZW50TnVsbEV4Y2VwdGlvbihcIidmcm9tJyBjYW5ub3QgYmUgbnVsbFwiKTtcclxuICAgICAgICAgICAgaWYgKHRvID09IG51bGwpIHRocm93IG5ldyBBcmd1bWVudE51bGxFeGNlcHRpb24oXCIndG8nIGNhbm5vdCBiZSBudWxsXCIpO1xyXG4gICAgICAgICAgICByZXR1cm4gQ29udmVydChmcm9tTWVhc3VyZW1lbnQuUGx1cmFsTmFtZSwgdG8uUGx1cmFsTmFtZSwgdmFsdWVGcm9tKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBkb3VibGUgQ29udmVydChzdHJpbmcgbmFtZUZyb20sIHN0cmluZyBuYW1lVG8sIGRvdWJsZSB2YWx1ZUZyb20gPSAxKVxyXG4gICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgIHZhciBmcm9tTWVhc3VyZW1lbnQgPSBGaW5kKG5hbWVGcm9tKTtcclxuICAgICAgICAgICAgdmFyIHRvID0gRmluZChuYW1lVG8pO1xyXG4gICAgICAgICAgICBpZiAodG8gPT0gZnJvbU1lYXN1cmVtZW50KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWVGcm9tO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZUZyb20gKiBDYWxjdWxhdGUoZnJvbU1lYXN1cmVtZW50LCB0bykgPz8gMDtcclxuICAgICAgICB9XHJcbiAgICAgICBcclxuICAgICAgICBwcml2YXRlIGRvdWJsZT8gQ2FsY3VsYXRlKE9iamVjdE1lYXN1cmVtZW50IGZyb21NZWFzdXJlbWVudCwgT2JqZWN0TWVhc3VyZW1lbnQgdG8sIGRvdWJsZSB2YWx1ZSA9IDEpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoZnJvbU1lYXN1cmVtZW50LlBhcmVudE1lYXN1cmVtZW50U2luZ2xlTmFtZSAhPSBudWxsKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZnJvbU1lYXN1cmVtZW50LlBhcmVudE1lYXN1cmVtZW50U2luZ2xlTmFtZSA9PSB0by5TaW5nbGVOYW1lKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmcm9tTWVhc3VyZW1lbnQuVmFsdWUgKiB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdXAgPSBDYWxjdWxhdGUoZnJvbU1lYXN1cmVtZW50Lk1lYXN1cmVtZW50LCB0bywgZnJvbU1lYXN1cmVtZW50LlZhbHVlICogdmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh1cCAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHVwO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBHb0Rvd24oZnJvbU1lYXN1cmVtZW50LCB0bywgdmFsdWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBkb3VibGU/IEdvRG93bihPYmplY3RNZWFzdXJlbWVudCBmcm9tTWVhc3VyZW1lbnQsIE9iamVjdE1lYXN1cmVtZW50IHRvLCBkb3VibGUgdmFsdWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgY2hpbGRyZW4gPSBmcm9tTWVhc3VyZW1lbnQuT2JqZWN0TWVhc3VyZW1lbnRzO1xyXG4gICAgICAgICAgICAvL2lmIChjaGlsZHJlbi5BbnkoKSAhPSB0cnVlKVxyXG4gICAgICAgICAgICAvL3tcclxuICAgICAgICAgICAgLy8gICAgY2hpbGRyZW4gPSBGaW5kKGZyb20uU2luZ2xlTmFtZSkuT2JqZWN0TWVhc3VyZW1lbnRzO1xyXG4gICAgICAgICAgICAvL31cclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIG9iamVjdE1lYXN1cmVtZW50IGluIGNoaWxkcmVuKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAob2JqZWN0TWVhc3VyZW1lbnQgPT0gdG8pXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlIC8gdG8uVmFsdWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRvd24gPSBHb0Rvd24ob2JqZWN0TWVhc3VyZW1lbnQsIHRvLCB2YWx1ZSAvIG9iamVjdE1lYXN1cmVtZW50LlZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZG93biAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRvd247XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBwcml2YXRlIExpc3Q8T2JqZWN0TWVhc3VyZW1lbnQ+IEdldEFsbCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5Ub0xpc3Q8T2JqZWN0TWVhc3VyZW1lbnQ+KF9yZXBvc2l0b3J5LkdldE9iamVjdE1lYXN1cmVtZW50cygpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBPYmplY3RNZWFzdXJlbWVudCBGaW5kKHN0cmluZyBuYW1lKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIF9yZXBvc2l0b3J5LkdldE9iamVjdE1lYXN1cmVtZW50KG5hbWUpO1xyXG4gICAgICAgICAgICAvL3JldHVybiBGaW5kKENlbnRpbWV0ZXIsIG5hbWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuXHJcbiAgICAgICAgcHVibGljIE9iamVjdE1lYXN1cmVtZW50IE5ld09iamVjdChzdHJpbmcgcGx1cmFsTmFtZSwgc3RyaW5nIHNpbmdsZU5hbWUsIGRvdWJsZSB2YWx1ZSwgc3RyaW5nIG1lYXN1cmVtZW50LCBzdHJpbmcgcGFjayA9IFwiQ3VzdG9tXCIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgbWVhc3VyZSA9IEZpbmQobWVhc3VyZW1lbnQpO1xyXG4gICAgICAgICAgICBpZiAobWVhc3VyZSAhPSBudWxsKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbmV3T2JqZWN0ID0gbmV3IE9iamVjdE1lYXN1cmVtZW50KHNpbmdsZU5hbWUsIHBsdXJhbE5hbWUpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgVmFsdWUgPSB2YWx1ZSxcclxuICAgICAgICAgICAgICAgICAgICBPYmplY3RQYWNrTmFtZSA9IHBhY2ssXHJcbiAgICAgICAgICAgICAgICAgICAgUGFyZW50TWVhc3VyZW1lbnRTaW5nbGVOYW1lID0gbWVhc3VyZS5TaW5nbGVOYW1lXHJcblxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIF9yZXBvc2l0b3J5LkFkZE9iamVjdChuZXdPYmplY3QpO1xyXG4gICAgICAgICAgICAgICAgVXBkYXRlTGlzdCgpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ld09iamVjdDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBEZWxldGVQYWNrKE9iamVjdFBhY2sgcGFjaylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIF9yZXBvc2l0b3J5LlJlbW92ZVBhY2socGFjayk7XHJcbiAgICAgICAgICAgIFVwZGF0ZUxpc3QoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIERlbGV0ZU9iamVjdChPYmplY3RNZWFzdXJlbWVudCBzZWxlY3RlZE9iamVjdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIF9yZXBvc2l0b3J5LlJlbW92ZU9iamVjdChzZWxlY3RlZE9iamVjdCk7XHJcbiAgICAgICAgICAgIHRoaXMuVXBkYXRlTGlzdCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgVXBkYXRlT2JqZWN0KE9iamVjdE1lYXN1cmVtZW50IHNlbGVjdGVkT2JqZWN0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgX3JlcG9zaXRvcnkuVXBkYXRlT2JqZWN0KHNlbGVjdGVkT2JqZWN0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBVcGRhdGVQYWNrKHN0cmluZyBwYWNrLCBPYmplY3RNZWFzdXJlbWVudCBuZXdPYmplY3QpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgcGFja3MgPSBTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLkZpcnN0T3JEZWZhdWx0PE9iamVjdFBhY2s+KE9iamVjdFBhY2tzLChGdW5jPE9iamVjdFBhY2ssYm9vbD4pKHAgPT4gcC5QYWNrTmFtZSA9PSBwYWNrKSk7XHJcbiAgICAgICAgICAgIGlmIChwYWNrcyAhPSBudWxsKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBwYWNrcy5PYmplY3RNZWFzdXJlbWVudHMuQWRkKG5ld09iamVjdCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgSW52YWxpZE9wZXJhdGlvbkV4Y2VwdGlvbihzdHJpbmcuRm9ybWF0KFwicGFja2FnZSAnezB9JyBtdXN0IGV4aXN0IGZpcnN0XCIscGFjaykpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgY29uc3Qgc3RyaW5nIFByb3BlcnR5S2V5ID0gXCJDb252ZXJzaW9uc1wiO1xyXG5cclxuXHJcbiAgICAgICAgcHVibGljIE9iamVjdE1lYXN1cmVtZW50IE5ld09iamVjdChzdHJpbmcgcGx1cmFsTmFtZSwgc3RyaW5nIHNpbmdsZU5hbWUsXHJcbiAgICAgICAgICAgIGRvdWJsZSB2YWx1ZSwgT2JqZWN0TWVhc3VyZW1lbnQgbWVhc3VyZW1lbnQsIHN0cmluZyBwYWNrID0gXCJDdXN0b21cIilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBOZXdPYmplY3QocGx1cmFsTmFtZSwgc2luZ2xlTmFtZSwgdmFsdWUsIG1lYXN1cmVtZW50LlBsdXJhbE5hbWUsIHBhY2spO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgTmV3UGFjayhPYmplY3RQYWNrIHBhY2spXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLl9yZXBvc2l0b3J5LkFkZFBhY2socGFjayk7XHJcbiAgICAgICAgICAgIHRoaXMuVXBkYXRlTGlzdCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsInVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uQ29tcG9uZW50TW9kZWwuRGF0YUFubm90YXRpb25zO1xyXG51c2luZyBTeXN0ZW0uQ29tcG9uZW50TW9kZWwuRGF0YUFubm90YXRpb25zLlNjaGVtYTtcclxuXHJcbm5hbWVzcGFjZSBIb3dGYXIuQ29yZS5Nb2RlbHNcclxue1xyXG4gICAgcHVibGljIGNsYXNzIE9iamVjdE1lYXN1cmVtZW50IDogQmluZGFibGVCYXNlLCBJT2JqZWN0TWVhc3VyZW1lbnRcclxuICAgIHtcclxuICAgICAgICBwcml2YXRlIGRvdWJsZSBfdmFsdWU7XHJcbiAgICAgICAgcHJpdmF0ZSBzdHJpbmcgX2ltYWdlO1xyXG4gICAgICAgIHByaXZhdGUgc3RyaW5nIF9wbHVyYWxOYW1lO1xyXG4gICAgICAgIHByaXZhdGUgTGlzdDxPYmplY3RNZWFzdXJlbWVudD4gX29iamVjdE1lYXN1cmVtZW50cztcclxuICAgICAgICBwcml2YXRlIHN0cmluZyBfc2luZ2xlTmFtZTtcclxuICAgICAgICBwcml2YXRlIE9iamVjdFBhY2sgX29iamVjdFBhY2s7XHJcbiAgICAgICAgcHJpdmF0ZSBzdHJpbmcgX29iamVjdFBhY2tOYW1lO1xyXG4gICAgICAgIHByaXZhdGUgT2JqZWN0TWVhc3VyZW1lbnQgX21lYXN1cmVtZW50O1xyXG4gICAgICAgIHByaXZhdGUgc3RyaW5nIF9wYXJlbnRNZWFzdXJlbWVudFNpbmdsZU5hbWU7XHJcblxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSBzdHJpbmcgVG9TdHJpbmcoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIE1lYXN1cmVtZW50ICE9IG51bGwgPyBzdHJpbmcuRm9ybWF0KFwiezB9OiB7MX0gezJ9XCIsU2luZ2xlTmFtZSxWYWx1ZSxNZWFzdXJlbWVudC5QbHVyYWxOYW1lKTogc3RyaW5nLkZvcm1hdChcInswfSB7MX1cIixWYWx1ZSxQbHVyYWxOYW1lKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIFtGb3JlaWduS2V5KFwiTWVhc3VyZW1lbnRcIildXHJcbiAgICAgICAgcHVibGljIHN0cmluZyBQYXJlbnRNZWFzdXJlbWVudFNpbmdsZU5hbWVcclxue1xyXG4gICAgZ2V0XHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIF9wYXJlbnRNZWFzdXJlbWVudFNpbmdsZU5hbWU7XHJcbiAgICB9XHJcblxyXG4gICAgXHJcbiAgICBzZXRcclxuICAgIHtcclxuICAgICAgICBTZXRQcm9wZXJ0eTxzdHJpbmc+KHJlZiBfcGFyZW50TWVhc3VyZW1lbnRTaW5nbGVOYW1lLCB2YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBcclxufVxyXG4gICAgICAgIHB1YmxpYyB2aXJ0dWFsIE9iamVjdE1lYXN1cmVtZW50IE1lYXN1cmVtZW50XHJcbntcclxuICAgIGdldFxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBfbWVhc3VyZW1lbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgXHJcbiAgICBzZXRcclxuICAgIHtcclxuICAgICAgICBTZXRQcm9wZXJ0eTxPYmplY3RNZWFzdXJlbWVudD4ocmVmIF9tZWFzdXJlbWVudCwgdmFsdWUpO1xyXG4gICAgfVxyXG4gICAgXHJcbn1cclxuICAgICAgICBwdWJsaWMgZG91YmxlIFZhbHVlXHJcbntcclxuICAgIGdldFxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBfdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgXHJcbiAgICBzZXRcclxuICAgIHtcclxuICAgICAgICBTZXRQcm9wZXJ0eTxkb3VibGU+KHJlZiBfdmFsdWUsIHZhbHVlKTtcclxuICAgIH1cclxuICAgIFxyXG59XHJcbiAgICAgICAgcHVibGljIHN0cmluZyBJbWFnZVxyXG57XHJcbiAgICBnZXRcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gX2ltYWdlO1xyXG4gICAgfVxyXG5cclxuICAgIFxyXG4gICAgc2V0XHJcbiAgICB7XHJcbiAgICAgICAgU2V0UHJvcGVydHk8c3RyaW5nPihyZWYgX2ltYWdlLCB2YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBcclxufVxyXG4gICAgICAgIHB1YmxpYyBzdHJpbmcgUGx1cmFsTmFtZVxyXG57XHJcbiAgICBnZXRcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gX3BsdXJhbE5hbWU7XHJcbiAgICB9XHJcblxyXG4gICAgXHJcbiAgICBzZXRcclxuICAgIHtcclxuICAgICAgICBTZXRQcm9wZXJ0eTxzdHJpbmc+KHJlZiBfcGx1cmFsTmFtZSwgdmFsdWUpO1xyXG4gICAgfVxyXG4gICAgXHJcbn1cclxuICAgICAgICBwdWJsaWMgT2JqZWN0TWVhc3VyZW1lbnQoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgT2JqZWN0TWVhc3VyZW1lbnRzID0gbmV3IExpc3Q8T2JqZWN0TWVhc3VyZW1lbnQ+KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBPYmplY3RNZWFzdXJlbWVudChzdHJpbmcgc2luZ2xlTmFtZSwgc3RyaW5nIHBsdXJhbE5hbWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBTaW5nbGVOYW1lID0gc2luZ2xlTmFtZTtcclxuICAgICAgICAgICAgUGx1cmFsTmFtZSA9IHBsdXJhbE5hbWU7XHJcbiAgICAgICAgICAgIE9iamVjdE1lYXN1cmVtZW50cyA9IG5ldyBMaXN0PE9iamVjdE1lYXN1cmVtZW50PigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9wdWJsaWMgSUVudW1lcmFibGU8T2JqZWN0TWVhc3VyZW1lbnQ+IEdldENoaWxkcmVuKClcclxuICAgICAgICAvL3tcclxuICAgICAgICAvLyAgICByZXR1cm4gT2JqZWN0TWVhc3VyZW1lbnRzO1xyXG4gICAgICAgIC8vfVxyXG4gICAgICAgIHB1YmxpYyB2b2lkIEFkZChPYmplY3RNZWFzdXJlbWVudCBvYmopXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBvYmouTWVhc3VyZW1lbnQgPSB0aGlzO1xyXG4gICAgICAgICAgICBPYmplY3RNZWFzdXJlbWVudHMuQWRkKG9iaik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdmlydHVhbCBMaXN0PE9iamVjdE1lYXN1cmVtZW50PiBPYmplY3RNZWFzdXJlbWVudHNcclxue1xyXG4gICAgZ2V0XHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIF9vYmplY3RNZWFzdXJlbWVudHM7XHJcbiAgICB9XHJcblxyXG4gICAgXHJcbiAgICBzZXRcclxuICAgIHtcclxuICAgICAgICBTZXRQcm9wZXJ0eTxMaXN0PE9iamVjdE1lYXN1cmVtZW50Pj4ocmVmIF9vYmplY3RNZWFzdXJlbWVudHMsIHZhbHVlKTtcclxuICAgIH1cclxuICAgIFxyXG59XHJcbiAgICAgICAgcHVibGljIHN0cmluZyBTaW5nbGVOYW1lXHJcbntcclxuICAgIGdldFxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBfc2luZ2xlTmFtZTtcclxuICAgIH1cclxuXHJcbiAgICBcclxuICAgIHNldFxyXG4gICAge1xyXG4gICAgICAgIFNldFByb3BlcnR5PHN0cmluZz4ocmVmIF9zaW5nbGVOYW1lLCB2YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBcclxufVxyXG4gICAgICAgIHB1YmxpYyBPYmplY3RQYWNrIE9iamVjdFBhY2tcclxue1xyXG4gICAgZ2V0XHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIF9vYmplY3RQYWNrO1xyXG4gICAgfVxyXG5cclxuICAgIFxyXG4gICAgc2V0XHJcbiAgICB7XHJcbiAgICAgICAgU2V0UHJvcGVydHk8T2JqZWN0UGFjaz4ocmVmIF9vYmplY3RQYWNrLCB2YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBcclxufVxyXG4gICAgICAgIHB1YmxpYyBzdHJpbmcgT2JqZWN0UGFja05hbWVcclxue1xyXG4gICAgZ2V0XHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIF9vYmplY3RQYWNrTmFtZTtcclxuICAgIH1cclxuXHJcbiAgICBcclxuICAgIHNldFxyXG4gICAge1xyXG4gICAgICAgIFNldFByb3BlcnR5PHN0cmluZz4ocmVmIF9vYmplY3RQYWNrTmFtZSwgdmFsdWUpO1xyXG4gICAgfVxyXG4gICAgXHJcbn0gICAgfVxyXG59IiwidXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5PYmplY3RNb2RlbDtcclxuXHJcbm5hbWVzcGFjZSBIb3dGYXIuQ29yZS5Nb2RlbHNcclxue1xyXG4gICAgcHVibGljIGNsYXNzIE9iamVjdFBhY2sgOiBCaW5kYWJsZUJhc2VcclxuICAgIHtcclxuICAgICAgICBwcml2YXRlIHN0cmluZyBfcGFja05hbWU7XHJcbiAgICAgICAgcHJpdmF0ZSBzdHJpbmcgX2Rlc2NyaXB0aW9uO1xyXG4gICAgICAgIHByaXZhdGUgc3RyaW5nIF9wYWNrSW1hZ2U7XHJcblxyXG4jaWYgQlJJREdFXHJcbiAgICAgICAgcHVibGljIHZpcnR1YWwgTGlzdDxPYmplY3RNZWFzdXJlbWVudD4gT2JqZWN0TWVhc3VyZW1lbnRzIHsgZ2V0OyBzZXQ7IH1cclxuI2Vsc2VcclxuICAgICAgICBwdWJsaWMgdmlydHVhbCBPYnNlcnZhYmxlQ29sbGVjdGlvbjxPYmplY3RNZWFzdXJlbWVudD4gT2JqZWN0TWVhc3VyZW1lbnRzIHsgZ2V0OyBzZXQ7IH0gPSBuZXcgT2JzZXJ2YWJsZUNvbGxlY3Rpb248T2JqZWN0TWVhc3VyZW1lbnQ+KCk7XHJcblxyXG4jZW5kaWZcclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgc3RyaW5nIFRvU3RyaW5nKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBQYWNrTmFtZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdHJpbmcgUGFja05hbWVcclxue1xyXG4gICAgZ2V0XHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIF9wYWNrTmFtZTtcclxuICAgIH1cclxuXHJcbiAgICBcclxuICAgIHNldFxyXG4gICAge1xyXG4gICAgICAgIFNldFByb3BlcnR5PHN0cmluZz4ocmVmIF9wYWNrTmFtZSwgdmFsdWUpO1xyXG4gICAgfVxyXG4gICAgXHJcbn1wdWJsaWMgc3RyaW5nIE5hbWVcclxue1xyXG4gICAgZ2V0XHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIFBhY2tOYW1lO1xyXG4gICAgfVxyXG59cHVibGljIHN0cmluZyBJbWFnZVVSTFxyXG57XHJcbiAgICBnZXRcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gUGFja0ltYWdlO1xyXG4gICAgfVxyXG59XHJcbiAgICAgICAgcHVibGljIHN0cmluZyBEZXNjcmlwdGlvblxyXG57XHJcbiAgICBnZXRcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gX2Rlc2NyaXB0aW9uO1xyXG4gICAgfVxyXG5cclxuICAgIFxyXG4gICAgc2V0XHJcbiAgICB7XHJcbiAgICAgICAgU2V0UHJvcGVydHk8c3RyaW5nPihyZWYgX2Rlc2NyaXB0aW9uLCB2YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBcclxufVxyXG4gICAgICAgIHB1YmxpYyBzdHJpbmcgUGFja0ltYWdlXHJcbntcclxuICAgIGdldFxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBfcGFja0ltYWdlO1xyXG4gICAgfVxyXG5cclxuICAgIFxyXG4gICAgc2V0XHJcbiAgICB7XHJcbiAgICAgICAgU2V0UHJvcGVydHk8c3RyaW5nPihyZWYgX3BhY2tJbWFnZSwgdmFsdWUpO1xyXG4gICAgfVxyXG4gICAgXHJcbn1cclxuICAgICAgICBwdWJsaWMgT2JqZWN0UGFjaygpXHJcbiAgICAgICAge1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIE9iamVjdFBhY2soc3RyaW5nIG5hbWUsc3RyaW5nIGRlc2NyaXB0aW9uKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgUGFja05hbWUgPSBuYW1lO1xyXG4gICAgICAgICAgICBEZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xyXG4gICAgICAgICAgICBQYWNrSW1hZ2UgPSBcImh0dHBzOi8vdmlhLnBsYWNlaG9sZGVyLmNvbS8xNTBcIjtcclxuICAgICAgICB9XHJcblxuICAgIFxucHJpdmF0ZSBMaXN0PE9iamVjdE1lYXN1cmVtZW50PiBfX1Byb3BlcnR5X19Jbml0aWFsaXplcl9fT2JqZWN0TWVhc3VyZW1lbnRzPW5ldyBMaXN0PE9iamVjdE1lYXN1cmVtZW50PigpO31cclxufSIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG5cclxubmFtZXNwYWNlIEhvd0Zhci5Db3JlLk1vZGVsc1xyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgT2JqZWN0UmVwb3NpdG9yeUNhY2hlIDogSU9iamVjdFJlcG9zaXRvcnlcclxuICAgIHtcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IElBcHAgX2FwcDtcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IExpc3Q8T2JqZWN0TWVhc3VyZW1lbnQ+IG1lYXN1cmVtZW50cztcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IExpc3Q8T2JqZWN0UGFjaz4gcGFja3M7XHJcblxyXG4gICAgICAgIFQgR2V0S2V5PFQ+KHN0cmluZyBrZXkpXHJcbiAgICAgICAge1xyXG5UIGRhdGE7ICAgICAgICAgICAgaWYgKF9hcHAuUHJvcGVydGllcy5Db250YWluc0tleShrZXkpICYmIChkYXRhID0gX2FwcC5Qcm9wZXJ0aWVzW2tleV0gYXMgVCkgIT0gbnVsbClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGRlZmF1bHQoVCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgT2JqZWN0UmVwb3NpdG9yeUNhY2hlKElBcHAgYXBwKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgX2FwcCA9IGFwcDtcclxuICAgICAgICAgICAgbWVhc3VyZW1lbnRzID0gR2V0S2V5PExpc3Q8T2JqZWN0TWVhc3VyZW1lbnQ+PihPYmplY3RLZXkpID8/IG5ldyBMaXN0PE9iamVjdE1lYXN1cmVtZW50PigpO1xyXG4gICAgICAgICAgICBwYWNrcyA9IEdldEtleTxMaXN0PE9iamVjdFBhY2s+PihQYWNrS2V5KSA/PyBuZXcgTGlzdDxPYmplY3RQYWNrPigpO1xyXG4gICAgICAgICAgICBPYmplY3RSZXBvc2l0b3J5U2VlZGVyLlN0YXJ0dXAodGhpcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyB2b2lkIERpc3Bvc2UoKVxyXG4gICAgICAgIHtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZvaWQgSW5zZXJ0S2V5KHN0cmluZyBrZXksIG9iamVjdCBkYXRhKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKF9hcHAuUHJvcGVydGllcy5Db250YWluc0tleShrZXkpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBfYXBwLlByb3BlcnRpZXNba2V5XSA9IGRhdGE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBfYXBwLlByb3BlcnRpZXMuQWRkKGtleSxkYXRhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBhc3luYyB2b2lkIFNhdmVDaGFuZ2VzKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEluc2VydEtleShPYmplY3RLZXksIG1lYXN1cmVtZW50cyk7XHJcbiAgICAgICAgICAgIEluc2VydEtleShQYWNrS2V5LCBwYWNrcyk7XHJcbiAgICAgICAgICAgIGF3YWl0IF9hcHAuU2F2ZVByb3BlcnRpZXNBc3luYygpO1xyXG4gICAgICAgIH1cclxuICAgICAgIFxyXG4gICAgICAgIHB1YmxpYyBPYmplY3RNZWFzdXJlbWVudCBHZXRPYmplY3RNZWFzdXJlbWVudChzdHJpbmcgbmFtZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBkYXRhID0gR2V0T2JqZWN0TWVhc3VyZW1lbnRzKCk7XHJcbiAgICAgICAgICAgIHJldHVybiBTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLkZpcnN0T3JEZWZhdWx0PE9iamVjdE1lYXN1cmVtZW50PihkYXRhLChGdW5jPE9iamVjdE1lYXN1cmVtZW50LGJvb2w+KShwID0+IHAuU2luZ2xlTmFtZS5Ub0xvd2VyKCkgPT0gbmFtZS5Ub0xvd2VyKCkgfHwgcC5QbHVyYWxOYW1lLlRvTG93ZXIoKSA9PSBuYW1lLlRvTG93ZXIoKSkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGNvbnN0IHN0cmluZyBPYmplY3RLZXkgPSBcIk9iamVjdE1lYXN1cmVtZW50c1wiO1xyXG4gICAgICAgIHB1YmxpYyBjb25zdCBzdHJpbmcgUGFja0tleSA9IFwiT2JqZWN0UGFja3NcIjtcclxuICAgICAgICBwdWJsaWMgSUVudW1lcmFibGU8T2JqZWN0TWVhc3VyZW1lbnQ+IEdldE9iamVjdE1lYXN1cmVtZW50cygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0UmVwb3NpdG9yeVNlZWRlci5TZXR1cFRyZWUobWVhc3VyZW1lbnRzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIHZvaWQgQWRkT2JqZWN0KE9iamVjdE1lYXN1cmVtZW50IG1lYXN1cmVtZW50KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKG1lYXN1cmVtZW50Lk9iamVjdFBhY2tOYW1lPT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBJbnZhbGlkT3BlcmF0aW9uRXhjZXB0aW9uKFwibXVzdCBoYXZlIGEgcGFjayBuYW1lXCIpO1xyXG5cclxuICAgICAgICAgICAgaWYgKG1lYXN1cmVtZW50LlBhcmVudE1lYXN1cmVtZW50U2luZ2xlTmFtZSA9PSBudWxsICYmIG1lYXN1cmVtZW50Lk1lYXN1cmVtZW50ICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICBtZWFzdXJlbWVudC5QYXJlbnRNZWFzdXJlbWVudFNpbmdsZU5hbWUgPSBtZWFzdXJlbWVudC5NZWFzdXJlbWVudC5TaW5nbGVOYW1lO1xyXG4gICAgICAgICAgICBlbHNlIGlmIChtZWFzdXJlbWVudC5QYXJlbnRNZWFzdXJlbWVudFNpbmdsZU5hbWUgIT0gbnVsbCAmJiBtZWFzdXJlbWVudC5NZWFzdXJlbWVudCA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgbWVhc3VyZW1lbnQuTWVhc3VyZW1lbnQgPVxyXG5TeXN0ZW0uTGlucS5FbnVtZXJhYmxlLkZpcnN0T3JEZWZhdWx0PE9iamVjdE1lYXN1cmVtZW50PiggICAgICAgICAgICAgICAgICAgIG1lYXN1cmVtZW50cywoRnVuYzxPYmplY3RNZWFzdXJlbWVudCxib29sPikocCA9PiBwLlNpbmdsZU5hbWUgPT0gbWVhc3VyZW1lbnQuUGFyZW50TWVhc3VyZW1lbnRTaW5nbGVOYW1lKSk7XHJcbiAgICAgICAgICAgIGlmIChtZWFzdXJlbWVudC5PYmplY3RQYWNrTmFtZSA9PSBudWxsICYmIG1lYXN1cmVtZW50Lk9iamVjdFBhY2sgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgIG1lYXN1cmVtZW50Lk9iamVjdFBhY2tOYW1lID0gbWVhc3VyZW1lbnQuT2JqZWN0UGFjay5QYWNrTmFtZTtcclxuICAgICAgICAgICAgZWxzZSBpZiAobWVhc3VyZW1lbnQuT2JqZWN0UGFja05hbWUgIT0gbnVsbCAmJiBtZWFzdXJlbWVudC5PYmplY3RQYWNrID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICBtZWFzdXJlbWVudC5PYmplY3RQYWNrID0gU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5GaXJzdE9yRGVmYXVsdDxPYmplY3RQYWNrPihwYWNrcywoRnVuYzxPYmplY3RQYWNrLGJvb2w+KShwID0+IHAuUGFja05hbWUgPT0gbWVhc3VyZW1lbnQuT2JqZWN0UGFja05hbWUpKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBwYWNrID0gU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5GaXJzdDxPYmplY3RQYWNrPihwYWNrcywoRnVuYzxPYmplY3RQYWNrLGJvb2w+KShwID0+IHAuUGFja05hbWUgPT0gbWVhc3VyZW1lbnQuT2JqZWN0UGFja05hbWUpKTtcclxuICAgICAgICAgICAgaWYgKFN5c3RlbS5MaW5xLkVudW1lcmFibGUuQW55PE9iamVjdE1lYXN1cmVtZW50PihwYWNrLk9iamVjdE1lYXN1cmVtZW50cywoRnVuYzxPYmplY3RNZWFzdXJlbWVudCxib29sPikocCA9PiBwLlNpbmdsZU5hbWUgPT0gbWVhc3VyZW1lbnQuU2luZ2xlTmFtZSkpICE9IHRydWUpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHBhY2suT2JqZWN0TWVhc3VyZW1lbnRzLkFkZChtZWFzdXJlbWVudCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIG1lYXN1cmVtZW50cy5BZGQobWVhc3VyZW1lbnQpO1xyXG4gICAgICAgICAgICBTYXZlQ2hhbmdlcygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgUmVtb3ZlT2JqZWN0KE9iamVjdE1lYXN1cmVtZW50IG1lYXN1cmVtZW50KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbWVhc3VyZW1lbnRzLlJlbW92ZShtZWFzdXJlbWVudCk7XHJcbiAgICAgICAgICAgIFNhdmVDaGFuZ2VzKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgSUVudW1lcmFibGU8T2JqZWN0UGFjaz4gR2V0T2JqZWN0UGFja3MoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIHBhY2tzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgQWRkUGFjayhPYmplY3RQYWNrIHBhY2spXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBwYWNrcy5BZGQocGFjayk7XHJcbiAgICAgICAgICAgIFNhdmVDaGFuZ2VzKCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgUmVtb3ZlUGFjayhPYmplY3RQYWNrIHBhY2spXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBwYWNrcy5SZW1vdmUocGFjayk7XHJcbiAgICAgICAgICAgIFNhdmVDaGFuZ2VzKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBVcGRhdGVPYmplY3QoT2JqZWN0TWVhc3VyZW1lbnQgc2VsZWN0ZWRPYmplY3QpXHJcbiAgICAgICAge1xyXG5cclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBwdWJsaWMgT2JqZWN0TWVhc3VyZW1lbnQgTmV3T2JqZWN0KHN0cmluZyBwbHVyYWwsIHN0cmluZyBzaW5nbGUsIGRvdWJsZSB2YWx1ZSwgT2JqZWN0TWVhc3VyZW1lbnQgcGFyZW50LCBzdHJpbmcgcGFjaylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBPYmplY3RSZXBvc2l0b3J5U2VlZGVyLk5ld09iamVjdEFjdGlvbihwbHVyYWwsIHNpbmdsZSwgdmFsdWUsIHBhcmVudC5TaW5nbGVOYW1lLCBwYWNrLCB0aGlzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJ1c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxuXHJcbm5hbWVzcGFjZSBIb3dGYXIuQ29yZS5Nb2RlbHNcclxue1xyXG4gICAgaW50ZXJuYWwgY2xhc3MgTWVhc3VyZW1lbnRDb21wYXJlIDogSUNvbXBhcmVyPE9iamVjdE1lYXN1cmVtZW50PlxyXG4gICAge1xyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgSU1lYXN1cmVDb252ZXJ0ZXJzIF9jb252ZXJ0ZXJzO1xyXG5cclxuICAgICAgICBwdWJsaWMgTWVhc3VyZW1lbnRDb21wYXJlKElNZWFzdXJlQ29udmVydGVycyBjb252ZXJ0ZXJzKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgX2NvbnZlcnRlcnMgPSBjb252ZXJ0ZXJzO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgaW50IENvbXBhcmUoT2JqZWN0TWVhc3VyZW1lbnQgeCwgT2JqZWN0TWVhc3VyZW1lbnQgeSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciB4dG95ID0gX2NvbnZlcnRlcnMuQ29udmVydCh4LCB5KTtcclxuICAgICAgICAgICAgaWYgKHh0b3kgPiAxKSByZXR1cm4gMTtcclxuICAgICAgICAgICAgcmV0dXJuIC0xO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdCn0K

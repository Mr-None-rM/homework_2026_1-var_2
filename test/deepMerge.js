'use strict';

QUnit.module("Тестируем функцию deepMerge", function() {
    QUnit.test("Работает правильно с вложенными объектами", function(assert) {
        const source = {
            user: {
                name: "Alice",
                age: 25,
                address: {
                    city: "Wonderland",
                    zip: 12345,
                }
            },
            hobbies: ["reading", "gaming"],
        };

        const target = {
            user: {
                age: 30,
                address: {
                    country: "Fantasyland",
                }
            },
            hobbies: ["traveling"],
            isActive: true,
        };

        const expected = {
            user: {
                name: "Alice",
                age: 30,
                address: {
                    city: "Wonderland",
                    zip: 12345,
                    country: "Fantasyland",
                }
            },
            hobbies: ["traveling"],
            isActive: true,
        };

        const result = deepMerge(source, target);
        assert.deepEqual(result, expected, "Должно работать правильно с вложенными объектами");
    });

    QUnit.test("Работает правильно с невложенными объектами", function(assert) {
        const source = {
            name: "Алиса",
            age: 25,
        };

        const target = {
            age: 30,
            isInWonderland: true,
        };

        const expected = {
            name: "Алиса",
            age: 30,
            isInWonderland: true,
        };

        const result = deepMerge(source, target);
        assert.deepEqual(result, expected, "Должно правильно перезаписывать ключи");
    });

    QUnit.test("Работает с пустым исходным объектом", function(assert) {
        const source = {
            name: "Алиса",
            age: 25,
        };

        const target = {};

        const expected = {
            name: "Алиса",
            age: 25,
        };

        const result = deepMerge(source, target);
        assert.deepEqual(result, expected, "Должно возвращать исходный объект при отсутствии второго");
    });

    QUnit.test("Работает корректно с двумя пустыми объектами", function(assert) {
        const source = {};

        const target = {};

        const expected = {};

        const result = deepMerge(source, target);
        assert.deepEqual(result, expected, "Должно возвращать пустой объект")
    });

    QUnit.test("Корректно выводит результат с неправильными входными данными", function(assert) {
        const source = null;

        const target = {
            name: "Иван",
            age: 30,
        };

        const expected = {};

        const result = deepMerge(source, target);
        assert.deepEqual(result, expected, "Должно возвращать пустой объект")
    });

    QUnit.test("Работает корректно с большой вложенностью объектов", function(assert) {
        const source = {
            level1: {
                level2: {
                    level3: {
                        level4: {
                            level5: {
                                value: "Строка",
                                numbers: [1, 2, 3],
                            }
                        }
                    }
                }
            }
        };

        const target = {
            level1: {
                level2: {
                    level3: {
                        level4: {
                            level5: {
                                value: "Число",
                                type: 1,
                                numbers: [4, 5, 6],
                            }
                        }
                    }
                }
            }
        };

        const expected = {
            level1: {
                level2: {
                    level3: {
                        level4: {
                            level5: {
                                value: "Число",
                                type: 1,
                                numbers: [4, 5, 6],
                            }
                        }
                    }
                }
            }
        };

        const result = deepMerge(source, target);
        assert.deepEqual(result, expected, "Должно рекурсивно сливать объекты любой глубины");
    });

    QUnit.test("Работает с null и undefined значениями", function(assert) {
        const source = {
            a: null,
            b: undefined,
        };

        const target = {
            a: 1,
            b: 2,
            c: null,
        };

        const expected = {
            a: 1,
            b: 2,
            c: null,
        };

        const result = deepMerge(source, target);
        assert.deepEqual(result, expected, "Должно корректно обрабатывать null и undefined");
    });
});

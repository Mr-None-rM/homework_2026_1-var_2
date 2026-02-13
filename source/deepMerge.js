'use strict';

/**
 * Функция, объединяющая два объекта в один
 * @param {object} source - базовый объект
 * 
 * @param {object} target - объект с приоритетными значениями
 * 
 * @description
 * Функция создаёт новый объект, объединяющий свойства source и target
 * - При наличии одинаковых ключей в source и target со значениями, являющимся объектами, 
 * происходит рекурсивное слияние
 * - При наличии одинаковых ключей в source и target со значниями, отличными от объектов, 
 * приоритет отдаётся значению из target
 * - В случае некорректного ввода функция вернёт пустой объект
 * 
 * @example
 * let pixel = {
 *   color: {
 *     hex: "#ff0000",
 *     opacity: 1.0,
 *   },
 *   position: {
 *     x: 10,
 *     y: 20,
 *   },
 *   layer: 1,
 *   effects: ["sharpen"],
 * };
 * 
 * const filter = {
 *   color: {
 *     hex: "#0000ff",
 *     opacity: 0.8,
 *   },
 *   position: {
 *     x: 15,
 *   },
 *   effects: ["sepia"],
 *   isSelected: true,
 * };
 * 
 * deepMerge(pixel, filter);
 * // Result:
 * // {
 * //   color: {
 * //     hex: "#0000ff",
 * //     opacity: 0.8,
 * //   },
 * //   position: {
 * //     x: 15,
 * //     y: 20,
 * //   },
 * //   layer: 1,
 * //   effects: ["sepia"],
 * //   isSelected: true,
 * // }
 * 
 * @returns {object}
 */
function deepMerge(source, target) {
  if (!isObject(source) || !isObject(target)) {
    return {};
  }

  const mergedObject = Object.assign({}, source);

  for (let key in target) {
    if (Object.hasOwn(source, key) && isObject(target[key]) && isObject(source[key])) {
      mergedObject[key] = deepMerge(source[key], target[key]);
    } else {
      mergedObject[key] = target[key];
    }
  }

  return mergedObject;
}

/**
 * Функция, которая проверяет, является ли значение объектом
 * 
 * @param {*} value - проверяемое значение
 * 
 * @returns {boolean} - true, если это объект
 * 
 * @example
 * isObject({}); // true
 * isObject(null); // false
 * isObject([1, 2, 3]); // false
 */
function isObject(value) {
  return Object.prototype.toString.call(value) === "[object Object]";
}

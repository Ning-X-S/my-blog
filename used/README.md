# common-code
常用代码整理：css代码块，js常用工具类。供个人工作使用。

```
.
├── css
│   └─ utils.css                                    // css常用代码块
├── js
│   └─ utils.js                                     // js常用工具类
.
```
### [Moment.js(日期处理类库)](http://momentjs.cn/)
支持日期格式化、相对时间、日历时间、多语言支持
```
moment().format('MMMM Do YYYY, h:mm:ss a');     // 四月 6日 2018, 2:58:23 下午
moment("20111031", "YYYYMMDD").fromNow();       // 6 年前
moment().subtract(10, 'days').calendar();       // 2018年3月27日
moment().format('LLLL');                        // 2018年4月6日星期五下午3点00分
```

### [day.js(日期处理类库)](https://github.com/iamkun/dayjs)
Moment.js 的 2kB 轻量化方案，拥有同样强大的 API。如果不是非必须，可以替代Moment.js

### [calendar.js(阳历/农历)](https://github.com/jjonline/calendar.js)
中国农历（阴阳历）和西元阳历即公历互转JavaScript库
农历大小年；公历每个月份的天数；天干地支、24节气；日期转农历称呼；月份转农历称呼
传入阳历年月日获得详细的公历、农历object信息
公历月、日判断所属星座；年份转生肖
数字转中文

### [calculatorjs.js(精确算法库)](https://github.com/fzred/calculatorjs)
解决Javascript浮点运算精度问题，支持加、减、乘、除、四舍五入

```
calc.add(0.1, 0.2)      // 0.3
calc.sub(0.1, 0.2)      // -0.1
calc.mul(0.1, 0.2)      // 0.02
calc.div(0.1, 0.2)      // 0.5
calc.round(0.555, 2)    // 0.56
```

### [accounting.js(数字，金额，货币格式化类库)](http://openexchangerates.github.io/accounting.js/)

```
// 将任意数字转为货币
accounting.formatMoney(4999.99, "€", 2, ".", ","); // €4.999,99
// 自定义格式和精度转换数字
accounting.formatNumber(9876543.21, 3, " "); // 9 876 543.210
// 自定义精度四舍五入浮点
accounting.toFixed(0.615, 2); // "0.62"
// 将任意格式值，转为数字
accounting.unformat("£ 12,345,678.90 GBP"); // 12345678.9
```

### [Lodash.js](http://www.css88.com/doc/lodash/)

更庞大复杂的数据处理类库

##  上报服务1（无图片）
##### 地址：http://webservices.qgj.cn/tzgg/data.ashx
##### 请求方式Get
参数名称 | 事例|说明
---|---|---
t | IntXcsj|固定值
results | laizy$赖志毅$0.0$0.0$2016-10-1 11:22:23$sz$啦啦啦啦啦啦啦$47+083$hzglc$工况类$北岸$百沥海塘$E330109013$1$6|【上报人员账号】$【上报人员名称】$【经度】$【纬度】$【上报时间】$sz$【巡查情况记录】$【桩号】$【管理处缩写（hzglc，jxglc，nsglc）】$【事件类型（水政类，工况类）】$【组别（杭州管理处：南岸，北岸；嘉兴管理处：盐平，海宁；宁绍管理处：曹娥江左岸，曹娥江右岸，钱塘江南岸）】$【海塘名称】$【海塘编号】$【工程部位1编号】$【工程部位2编号】

##  上报服务2（带图片）
##### 地址：http://webservices.qgj.cn/tzgg/data.ashx
##### 请求方式Get
参数名称 | 事例|说明
---|---|---
t | IntPhotoImg|固定值
results | laizy$赖志毅$0.0$0.0$2016-10-1 11:22:23$sz$啦啦啦啦啦啦啦$47+083$hzglc$工况类$北岸$百沥海塘$E330109013$1$6|【上报人员账号】$【上报人员名称】$【经度】$【纬度】$【上报时间】$sz$【巡查情况记录】$【桩号】$【管理处缩写（hzglc，jxglc，nsglc）】$【事件类型（水政类，工况类）】$【组别（杭州管理处：南岸，北岸；嘉兴管理处：盐平，海宁；宁绍管理处：曹娥江左岸，曹娥江右岸，钱塘江南岸）】$【海塘名称】$【海塘编号】$【工程部位1编号】$【工程部位2编号】

##  开启流程（杭州管理处）
##### 地址：http://webservices.qgj.cn/qgjhtxc/Handler1.ashx
##### 请求方式Get
参数名称 | 事例 | 说明
---|---|---
pn| 水政流程 | 固定值
stepid | 水政流程 |固定值
yid| 11519 |  上报服务返回的id
sid|xgh |  上报人员账号
Params|xgh | 中转人账号
action|提交 | 固定值

##  获取水管联系单列表
##### 地址：http://webservices.qgj.cn/qgjhtxc/Handler1.ashx
##### 请求方式Get
参数名称 | 事例 | 说明
---|---|---
pn| Get_Waterpipeinspection | 固定值
stime | 2016-11-1 |开始时间
etime| 2016-11-30 |  结束时间
dname|hzglc |  【管理处缩写（hzglc，jxglc，nsglc）】

##  浏览水管联系单附件
##### 地址：http://bpm.qgj.cn/YZSoft/Forms/XForm/海塘巡查/水政巡查/pageoffice_sg.aspx
##### 请求方式Get
参数名称 | 事例 | 说明
---|---|---
value1| xc | 固定值
glc | hz |【管理处缩写（hz，jx，ns）】
taskid| 7810|  【taskid】

##  事件统计
##### http://portal.qgj.cn/bpm/WTApp/EventInfo/SzEvent/StoreDataService/BzhTolEventInfoData.ashx
##### 请求方式Get
参数名称 | 事例 | 说明
---|---|---
method| GetData | 固定值
SearchType | QuickSearch |固定值
dname| jxglc|【管理处缩写（hzglc，jxglc，nsglc）】
et|2017-06-12|结束时间
st|2017-05-01|开始时间
 
返回结果中的State表示状态,Running：处理中，Approved：已处理结束，Aborted，Rejected：任务已撤销，Deleted：任务已删除
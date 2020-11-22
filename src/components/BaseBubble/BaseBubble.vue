<template>
    <div class="BaseBubble">
        <!--国家重点监控单位废气自动监测-->
        <div class="background-img l-t"></div>
        <div class="background-img r-t"></div>
        <div class="background-img l-b"></div>
        <div class="background-img r-b"></div>
        <div class="bubble-box" v-if="sourceData==null?false:sourceData.attributes.id==='wasteGas'">
            <div class="bubble-title">
                <div :class="[showGasBasic?'chooseDivActive':'chooseDivInActive']" @click="changeGasBubble(1);">
                    基本信息
                </div>
                <div :class="[showGasControl?'chooseDivActive':'chooseDivInActive']" @click="changeGasBubble(2);">
                    监控数据
                </div>
            </div>
            <div ref="gasBasic" v-show="showGasBasic">
                <div class="onediv">
                    <img class="locatimg" src="images/symbol/location.png" />
                    <span style="margin-left: 0.01rem">{{sourceData.attributes.psname}}</span>
                </div>
                <div class="onediv">
                    <div style="float: left">
                        <span>企业地址：</span>
                        <span class="yellowfont">{{sourceData.attributes.regionname}}</span>
                    </div>
                    <div v-show="sourceData.attributes.psstatus" style="float: right">
                        <span>生产状态：</span>
                        <span v-if="sourceData.attributes.psstatus" class="yellowfont">{{sourceData.attributes.psstatus}}</span>
                        <span v-else class="yellowfont">暂无</span>
                    </div>
                </div>
            </div>
            <div ref="gasControl" v-show="showGasControl">
                <table class="bubbleTable">
                    <tr>
                        <td colspan="2">
                            <span>监测时间：</span>
                            <span v-if="sourceData.attributes.monitortime" class="yellowfont">{{sourceData.attributes.monitortime}}</span>
                            <span v-else class="yellowfont">暂无</span>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2">
                            <span>排口名称：</span>
                            <span v-if="sourceData.attributes.ioname" class="yellowfont">{{sourceData.attributes.ioname}}</span>
                            <span v-else class="yellowfont">暂无</span>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <span>流量：</span>
                            <span v-if="sourceData.attributes.couflow" class="yellowfont">{{sourceData.attributes.couflow}}</span>
                            <span v-else class="yellowfont">暂无</span>
                        </td>
                        <td>
                            <span>瞬时流量：</span>
                            <span v-if="sourceData.attributes.gasflow" class="yellowfont">{{sourceData.attributes.gasflow}}</span>
                            <span v-else class="yellowfont">暂无</span>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <span>氮氧化物浓度：</span>
                            <span v-if="sourceData.attributes.strengthNox" class="yellowfont">{{sourceData.attributes.strengthNox}}</span>
                            <span v-else class="yellowfont">暂无</span>
                        </td>
                        <td>
                            <span>氮氧化物限值：</span>
                            <span v-if="sourceData.attributes.svalueNox" class="yellowfont">{{sourceData.attributes.svalueNox}}</span>
                            <span v-else class="yellowfont">暂无</span>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <span>二氧化硫浓度：</span>
                            <span v-if="sourceData.attributes.strengthSo2" class="yellowfont">{{sourceData.attributes.strengthSo2}}</span>
                            <span v-else class="yellowfont">暂无</span>
                        </td>
                        <td>
                            <span>二氧化硫限值：</span>
                            <span v-if="sourceData.attributes.svalueSo2" class="yellowfont">{{sourceData.attributes.svalueSo2}}</span>
                            <span v-else class="yellowfont">暂无</span>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <span>烟尘浓度：</span>
                            <span v-if="sourceData.attributes.strengthYc" class="yellowfont">{{sourceData.attributes.strengthYc}}</span>
                            <span v-else class="yellowfont">暂无</span>
                        </td>
                        <td>
                            <span>烟尘限值：</span>
                            <span v-if="sourceData.attributes.svalueYc" class="yellowfont">{{sourceData.attributes.svalueYc}}</span>
                            <span v-else class="yellowfont">暂无</span>
                        </td>
                    </tr>
                </table>
            </div>
            <!--<p>x:{{sourceData.attributes.x}}</p>
            <p>y:{{sourceData.attributes.y}}</p>-->
        </div>
        <!--国家重点监控单位废水自动监测-->
        <div class="bubble-box" v-else-if="sourceData==null?false:sourceData.attributes.id==='wasteWater'">
            <div class="bubble-title">
                <div :class="[showWaterBasic?'chooseDivActive':'chooseDivInActive']" @click="changeWaterBubble(1);">
                    基本信息
                </div>
                <div :class="[showWaterControl?'chooseDivActive':'chooseDivInActive']" @click="changeWaterBubble(2);">
                    监控数据
                </div>
            </div>
            <div ref="waterBasic" v-show="showWaterBasic">
                <div class="onediv">
                    <img class="locatimg" src="images/symbol/location.png" />
                    <span style="margin-left: 0.01rem">{{sourceData.attributes.psname}}</span>
                </div>
                <div class="onediv">
                    <div style="float: left">
                        <span>企业地址：</span>
                        <span class="yellowfont">{{sourceData.attributes.regionname}}</span>
                    </div>
                    <div v-show="sourceData.attributes.psstatus" style="float: right">
                        <span>生产状态：</span>
                        <span v-if="sourceData.attributes.psstatus" class="yellowfont">{{sourceData.attributes.psstatus}}</span>
                        <span v-else class="yellowfont">暂无</span>
                    </div>
                </div>
            </div>
            <div ref="waterControl" v-show="showWaterControl">
                <table class="bubbleTable">
                    <tr>
                        <td colspan="2">
                            <span>监测时间：</span>
                            <span v-if="sourceData.attributes.monitortime" class="yellowfont">{{sourceData.attributes.monitortime}}</span>
                            <span v-else class="yellowfont">暂无</span>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <span>排口名称：</span>
                            <span v-if="sourceData.attributes.ioname" class="yellowfont">{{sourceData.attributes.ioname}}</span>
                            <span v-else class="yellowfont">暂无</span>
                        </td>
                        <td>
                            <span>流量：</span>
                            <span v-if="sourceData.attributes.couflow" class="yellowfont">{{sourceData.attributes.couflow}}</span>
                            <span v-else class="yellowfont">暂无</span>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <span>化学所需氧浓度：</span>
                            <span v-if="sourceData.attributes.strengthCod" class="yellowfont">{{sourceData.attributes.strengthCod}}</span>
                            <span v-else class="yellowfont">暂无</span>
                        </td>
                        <td>
                            <span>化学所需氧限值：</span>
                            <span v-if="sourceData.attributes.svalueCod" class="yellowfont">{{sourceData.attributes.svalueCod}}</span>
                            <span v-else class="yellowfont">暂无</span>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <span>氨氮浓度：</span>
                            <span v-if="sourceData.attributes.strengthAd" class="yellowfont">{{sourceData.attributes.strengthAd}}</span>
                            <span v-else class="yellowfont">暂无</span>
                        </td>
                        <td>
                            <span>氨氮限值：</span>
                            <span v-if="sourceData.attributes.svalueAd" class="yellowfont">{{sourceData.attributes.svalueAd}}</span>
                            <span v-else class="yellowfont">暂无</span>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <span>总氮浓度：</span>
                            <span v-if="sourceData.attributes.strengthZd" class="yellowfont">{{sourceData.attributes.strengthZd}}</span>
                            <span v-else class="yellowfont">暂无</span>
                        </td>
                        <td>
                            <span>总氮限值：</span>
                            <span v-if="sourceData.attributes.svalueZd" class="yellowfont">{{sourceData.attributes.svalueZd}}</span>
                            <span v-else class="yellowfont">暂无</span>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <span>总磷浓度：</span>
                            <span v-if="sourceData.attributes.strengthZl" class="yellowfont">{{sourceData.attributes.strengthZl}}</span>
                            <span v-else class="yellowfont">暂无</span>
                        </td>
                        <td>
                            <span>总磷限值：</span>
                            <span v-if="sourceData.attributes.svalueZl" class="yellowfont">{{sourceData.attributes.svalueZl}}</span>
                            <span v-else class="yellowfont">暂无</span>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
        <!--垃圾焚烧-->
        <div class="bubble-box" v-else-if="sourceData==null?false:sourceData.attributes.id==='wasteIncineration'">
            <div class="bubble-title">
                <div :class="[showIncinerationBasic?'chooseDivActive':'chooseDivInActive']" @click="changeIncinerationBubble(1);">
                    基本信息
                </div>
                <div :class="[showIncinerationControl?'chooseDivActive':'chooseDivInActive']" @click="changeIncinerationBubble(2);">
                    监控数据
                </div>
            </div>
            <div ref="incinerationBasic" v-show="showIncinerationBasic">
                <table class="bubbleTable">
                    <tr>
                        <td colspan="3">
                            <img class="locatimg" src="images/symbol/location.png" />
                            <span style="margin-left: 0.01rem">{{sourceData.attributes.psname}}</span>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="3">
                            <span>企业地址：</span>
                            <span class="yellowfont">{{sourceData.attributes.psaddress}}</span>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="3">
                            <span>统一社会信用代码：</span>
                            <span class="yellowfont">{{sourceData.attributes.corporationcode}}</span>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <span>行政区划：</span>
                            <span v-if="sourceData.attributes.areaname" class="yellowfont">{{sourceData.attributes.areaname}}</span>
                            <span v-else class="yellowfont">暂无</span>
                        </td>
                        <td>
                            <span>联系人：</span>
                            <span v-if="sourceData.attributes.linkman" class="yellowfont">{{sourceData.attributes.linkman}}</span>
                            <span v-else class="yellowfont">暂无</span>
                        </td>
                        <td>
                            <span>投产日期：</span>
                            <span v-if="sourceData.attributes.factorydate" class="yellowfont">{{sourceData.attributes.factorydate}}</span>
                            <span v-else class="yellowfont">暂无</span>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <span>负责人：</span>
                            <span v-if="sourceData.attributes.corporationname" class="yellowfont">{{sourceData.attributes.corporationname}}</span>
                            <span v-else class="yellowfont">暂无</span>
                        </td>
                        <td colspan="2">
                            <span>联系方式: </span>
                            <span v-if="sourceData.attributes.mobilephone" class="yellowfont">{{sourceData.attributes.mobilephone}}</span>
                            <span v-else class="yellowfont">暂无</span>
                        </td>
                    </tr>
                </table>
                <hr style="width: 100%; color: #FFFFFF; opacity: 0.3; margin-top: 0.015rem;" />
                <table class="bubbleTable">
                    <tr>
                        <td>
                            <span>焚烧炉数：</span>
                            <span v-if="sourceData.attributes.gasiocount" class="yellowfont">{{sourceData.attributes.gasiocount}}</span>
                            <span v-else class="yellowfont">暂无</span>
                        </td>
                        <td>
                            <span>设计处理能力：</span>
                            <span v-if="sourceData.attributes.designcap" class="yellowfont">
                                {{sourceData.attributes.designcap}}
                            </span>
                            <span v-else class="yellowfont">暂无</span>
                        </td>
                        <td>
                            <span>发电功率：</span>
                            <span v-if="sourceData.attributes.power" class="yellowfont">
                                {{sourceData.attributes.power}}
                            </span>
                            <span v-else class="yellowfont">暂无</span>
                        </td>
                    </tr>
                </table>
            </div>
            <div ref="incinerationControl" v-show="showIncinerationControl" style="margin-top: 0.05rem">
                <div class="inChange">
                    <div v-for="(value, key, index) in sourceData.attributes.inobj" ref="inTitle"
                         :class="{inChangeAcitve:index==current}" @click="changeIncinerationIn(index);">
                        {{ key }}
                    </div>
                    <div v-for="(value, key, index) in sourceData.attributes.inobj" ref="inContent" v-show="index==current">
                        <table class="bubbleTable">
                            <tr>
                                <td>污染物名称</td>
                                <td>折算浓度</td>
                                <td>标准值</td>
                            </tr>
                            <tr v-for="inobj in value">
                                <td>{{inobj.pollutantname}}</td>
                                <td>{{inobj.revisedstrength}}</td>
                                <td>{{inobj.standardvalue}}</td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
<!--            <div ref="incinerationControl" v-show="showIncinerationControl" style="height:1rem;overflow-y: auto;">-->
<!--                <table class="bubbleTable">-->
<!--                    <tr v-for="col in sourceData.attributes.cotrolarr">-->
<!--                        <td>-->
<!--                            <span>排口名称: </span>-->
<!--                            <span class="yellowfont">{{col.ioname}}</span>-->
<!--                        </td>-->
<!--                        <td>-->
<!--                            <span>污染物名称: </span>-->
<!--                            <span class="yellowfont">{{col.pollutantname}}</span>-->
<!--                        </td>-->
<!--                        <td>-->
<!--                            <span>折算浓度: </span>-->
<!--                            <span class="yellowfont">{{col.revisedstrength}}</span>-->
<!--                        </td>-->
<!--                        <td>-->
<!--                            <span>标准值: </span>-->
<!--                            <span class="yellowfont">{{col.standardvalue}}</span>-->
<!--                        </td>-->
<!--                    </tr>-->
<!--                </table>-->
<!--            </div>-->
        </div>
        <!--重点整治河流-->
        <div class="bubble-box" v-else-if="sourceData==null?false:sourceData.attributes.id==='keyRiver'">
            <div class="bubble-title">
                <div :class="[showRiverBasic?'chooseDivActive':'chooseDivInActive']" @click="changeRiverBubble(1);">
                    基本信息
                </div>
                <div :class="[showRiverControl?'chooseDivActive':'chooseDivInActive']" @click="changeRiverBubble(2);">
                    监控数据
                </div>
            </div>
            <div ref="riverBasic" v-show="showRiverBasic">
                <div class="onediv">
                    <img class="locatimg" src="images/symbol/location.png" />
                    <span style="margin-left: 0.01rem">{{sourceData.attributes.aliasname}}</span>
                </div>
                <div class="onediv">
                    <div style="float: left">
                        <span>行政区划：</span>
                        <span v-if="sourceData.attributes.pointRegion" class="yellowfont">{{sourceData.attributes.pointRegion}}</span>
                        <span v-else class="yellowfont">暂无</span>
                    </div>
                </div>
            </div>
            <div ref="waterControl" v-show="showRiverControl">
                <table class="bubbleTable">
                    <tr>
                        <td colspan="2">
                            <span>水质类别：</span>
                            <span v-if="sourceData.attributes.szzk" class="yellowfont">{{sourceData.attributes.szzk}}</span>
                            <span v-else class="yellowfont">暂无</span>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <span>氨氮：</span>
                            <span v-if="sourceData.attributes.ad" class="yellowfont">
                                {{sourceData.attributes.ad}}
                                <span style="color: #FFFFFF">mg/L</span>
                            </span>
                            <span v-else class="yellowfont">暂无</span>
                        </td>
                        <td>
                            <span>总磷：</span>
                            <span v-if="sourceData.attributes.zl" class="yellowfont">
                                {{sourceData.attributes.zl}}
                                <span style="color: #FFFFFF">mg/L</span>
                            </span>
                            <span v-else class="yellowfont">暂无</span>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <span>化学需氧量：</span>
                            <span v-if="sourceData.attributes.hxxyl" class="yellowfont">
                                {{sourceData.attributes.hxxyl}}
                                <span style="color: #FFFFFF">mg/L</span>
                            </span>
                            <span v-else class="yellowfont">暂无</span>
                        </td>
                        <td>
                            <span>溶解氧：</span>
                            <span v-if="sourceData.attributes.rjy" class="yellowfont">
                                {{sourceData.attributes.rjy}}
                                <span style="color: #FFFFFF">mg/L</span>
                            </span>
                            <span v-else class="yellowfont">暂无</span>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <span>透明度：</span>
                            <span v-if="sourceData.attributes.tmd" class="yellowfont">
                                {{sourceData.attributes.tmd}}
                                <span style="color: #FFFFFF">cm</span>
                            </span>
                            <span v-else class="yellowfont">暂无</span>
                        </td>
                        <td>
                            <span>水质指数：</span>
                            <span v-if="sourceData.attributes.aqi" class="yellowfont">
                                {{sourceData.attributes.aqi}}
                            </span>
                            <span v-else class="yellowfont">暂无</span>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
        <!--医疗单位/污泥-->
        <div v-else-if="sourceData==null?false:(sourceData.attributes.id==='medicalInstitution'||sourceData.attributes.id==='mud')">
            <div>
                <div :class="[showMedicalInstitutionBasic?'chooseDivActive':'chooseDivInActive']" @click="changeMedicalInstitutionBubble(1);">
                    基本信息
                </div>
                <div :class="[showMedicalInstitutionControl?'chooseDivActive':'chooseDivInActive']" @click="changeMedicalInstitutionBubble(2);">
                    监控数据
                </div>
            </div>
            <div ref="medicalInstitutionBasic" v-show="showMedicalInstitutionBasic">
                <div class="onediv">
                    <img class="locatimg" src="images/symbol/location.png" />
                    <span style="margin-left: 0.01rem">{{sourceData.attributes.ENTERNAME}}</span>
                </div>
                <div class="onediv">
                    <div style="float: left">
                        <span>行政区划: </span>
                        <span v-if="sourceData.attributes.SSSHIVALUE" class="yellowfont">{{sourceData.attributes.SSSHIVALUE+sourceData.attributes.SSQUVALUE}}</span>
                        <span v-else class="yellowfont">暂无</span>
                    </div>
                    <div v-show="sourceData.attributes.STATE" style="float: right">
                        <span>单位状态: </span>
                        <span v-if="sourceData.attributes.STATE" class="yellowfont">{{sourceData.attributes.STATE}}</span>
                        <span v-else class="yellowfont">暂无</span>
                    </div>
                </div>
            </div>
            <div class="medic-div" ref="medicalInstitutionControl" v-show="showMedicalInstitutionControl">
                <table class="bubbleTable">
                    <tr>
                        <td colspan="2">
                            <span>经济类型: </span>
                            <span v-if="sourceData.attributes.HYLX" class="yellowfont">{{sourceData.attributes.HYLX}}</span>
                            <span v-else class="yellowfont">暂无</span>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <span>企业规模: </span>
                            <span v-if="sourceData.attributes.QYGM" class="yellowfont">
                                {{sourceData.attributes.QYGM}}
                            </span>
                            <span v-else class="yellowfont">暂无</span>
                        </td>
                        <td>
                            <span>法人姓名: </span>
                            <span v-if="sourceData.attributes.FRDBNAME" class="yellowfont">
                                {{sourceData.attributes.FRDBNAME}}
                            </span>
                            <span v-else class="yellowfont">暂无</span>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <span>联系人姓名: </span>
                            <span v-if="sourceData.attributes.LXRNAME" class="yellowfont">
                                {{sourceData.attributes.LXRNAME}}
                            </span>
                            <span v-else class="yellowfont">暂无</span>
                        </td>
                        <td>
                            <span>联系人电话: </span>
                            <span v-if="sourceData.attributes.LXRPHONE" class="yellowfont">
                                {{sourceData.attributes.LXRPHONE}}
                            </span>
                            <span v-else class="yellowfont">暂无</span>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
        <!--行政区-->
        <div class="bubble-box" v-else-if="sourceData==null?false:sourceData.attributes.id==='area'">
            <div ref="xzqGlArea">
                <table class="bubbleTable">
                    <tr>
                        <td>
                            <span>生态红线面积：</span>
                            <span v-if="sourceData.attributes.redLineArea" class="yellowfont">{{sourceData.attributes.redLineArea}}<span style="color: #FFFFFF">km²</span></span>
                            <span v-else class="yellowfont">暂无</span>
                        </td>
                        <td>
                            <span>生态环境管控区面积：</span>
                            <span v-if="sourceData.attributes.ecologicalControlArea" class="yellowfont">{{sourceData.attributes.ecologicalControlArea}}<span style="color: #FFFFFF">km²</span></span>
                            <span v-else class="yellowfont">暂无</span>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <span>水环境管控区面积：</span>
                            <span v-if="sourceData.attributes.waterControlArea" class="yellowfont">{{sourceData.attributes.waterControlArea}}<span style="color: #FFFFFF">km²</span></span>
                            <span v-else class="yellowfont">暂无</span>
                        </td>
                        <td>
                            <span>大气环境管控区面积：</span>
                            <span v-if="sourceData.attributes.airControlArea" class="yellowfont">{{sourceData.attributes.airControlArea}}<span style="color: #FFFFFF">km²</span></span>
                            <span v-else class="yellowfont">暂无</span>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
        <!--空气质量站点-->
        <div class="bubble-box" v-else-if="sourceData==null?false:sourceData.attributes.id==='aqiStation'">
            <div class="bubble-title">
                <div :class="[aqiStation?'chooseDivActive':'chooseDivInActive']" @click="changeAqiStationBubble(1);">
                    基本信息
                </div>
                <div :class="[aqiStationDataByYesterday?'chooseDivActive':'chooseDivInActive']" @click="changeAqiStationBubble(2);">
                    监测数据
                </div>
            </div>
            <div ref="station" v-show="aqiStation">
                <div class="onediv">
                    <img class="locatimg" src="images/symbol/location.png" />
                    <span style="margin-left: 0.01rem">{{sourceData.attributes.fbzdmc}}</span>
                </div>
                <div class="onediv">
                    <div style="float: left">
                        <span>行政区划：</span>
                        <span v-if="sourceData.attributes.region" class="yellowfont">{{sourceData.attributes.region}}</span>
                        <span v-else class="yellowfont">暂无</span>
                    </div>
                </div>
            </div>
            <div ref="stationData" v-show="aqiStationDataByYesterday">
                <table class="bubbleTable">
                    <tr>
                        <td>
                            <span>监测时间：</span>
                            <span v-if="sourceData.attributes.time" class="yellowfont">
                                {{sourceData.attributes.time}}
                            </span>
                            <span v-else class="yellowfont">暂无</span>
                        </td>
                        <td>
                            <span>空气质量指数：</span>
                            <span v-if="sourceData.attributes.aqi" class="yellowfont">
                                {{sourceData.attributes.aqi}}
                            </span>
                            <span v-else class="yellowfont">暂无</span>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <span>平均空气质量：</span>
                            <span v-if="sourceData.attributes.quality" class="yellowfont">{{sourceData.attributes.quality}}</span>
                            <span v-else class="yellowfont">暂无</span>
                        </td>
                        <td>
                            <span>首要污染物：</span>
                            <span v-if="sourceData.attributes.primary2" class="yellowfont">
                                {{sourceData.attributes.primary2}}
                            </span>
                            <span v-else class="yellowfont">暂无</span>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <span>一氧化碳浓度：</span>
                            <span v-if="sourceData.attributes.co" class="yellowfont">
                                {{sourceData.attributes.co}}
                                <span style="color: #FFFFFF">μg/m³</span>
                            </span>
                            <span v-else class="yellowfont">暂无</span>
                        </td>
                        <td>
                            <span>PM10浓度：</span>
                            <span v-if="sourceData.attributes.pm10" class="yellowfont">
                                {{sourceData.attributes.pm10}}
                                <span style="color: #FFFFFF">μg/m³</span>
                            </span>
                            <span v-else class="yellowfont">暂无</span>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <span>PM2.5浓度：</span>
                            <span v-if="sourceData.attributes.pm25" class="yellowfont">
                                {{sourceData.attributes.pm25}}
                                <span style="color: #FFFFFF">μg/m³</span>
                            </span>
                            <span v-else class="yellowfont">暂无</span>
                        </td>
                        <td>
                            <span>二氧化硫浓度：</span>
                            <span v-if="sourceData.attributes.so2" class="yellowfont">
                                {{sourceData.attributes.so2}}
                                <span style="color: #FFFFFF">μg/m³</span>
                            </span>
                            <span v-else class="yellowfont">暂无</span>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <span>臭氧(8小时)：</span>
                            <span v-if="sourceData.attributes.O3" class="yellowfont">
                                {{sourceData.attributes.O3}}
                                <span style="color: #FFFFFF">μg/m³</span>
                            </span>
                            <span v-else class="yellowfont">暂无</span>
                        </td>
                        <td>
                            <span>二氧化氮浓度：</span>
                            <span v-if="sourceData.attributes.no2" class="yellowfont">
                                {{sourceData.attributes.no2}}
                                <span style="color: #FFFFFF">μg/m³</span>
                            </span>
                            <span v-else class="yellowfont">暂无</span>
                        </td>
                    </tr>

                </table>
            </div>
        </div>
        <!--图表联动之生态红线-->
        <div class="bubble-box" v-else-if="sourceData==null?false:sourceData.attributes.id==='dataOnMap'">
            <div>
                <table class="bubbleTable">
                    <tr>
                        <td>
                            <span>生态红线面积：</span>
                            <span v-if="sourceData.attributes.redLineArea" class="yellowfont">{{sourceData.attributes.redLineArea}}<span style="color: #FFFFFF">km²</span></span>
                            <span v-else class="yellowfont">暂无</span>
                        </td>
                        <td>
                            <span>生态红线面积比例：</span>
                            <span v-if="sourceData.attributes.redlinePercent" class="yellowfont">{{sourceData.attributes.redlinePercent}}<span style="color: #FFFFFF">%</span></span>
                            <span v-else class="yellowfont">暂无</span>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
        <div class="bubble-box" v-else-if="sourceData==null?false:sourceData.attributes.id==='onMap1'">
            <div ref="stationData" v-if="onMap">
                <table class="bubbleTable">
                    <tr>
                        <td>
                            <span>行政区划：</span>
                            <span v-if="sourceData.attributes.qjxzqh" class="yellowfont">{{sourceData.attributes.qjxzqh}}区</span>
                            <span v-else class="yellowfont">暂无</span>
                        </td>
                        <td>
                            <span>面积：</span>
                            <span v-if="sourceData.attributes.area" class="yellowfont">
                                {{sourceData.attributes.area}}
                            </span>
                            <span v-else class="yellowfont">暂无</span>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
        <!--国考断面实时监控数据-->
        <div class="bubble-box" v-else-if="sourceData==null?false:sourceData.attributes.id==='waterStation'||sourceData.attributes.id==='waterStation1'">
            <div class="bubble-title">
                <div :class="[showRiverBasic?'chooseDivActive':'chooseDivInActive']" @click="changeRiverBubble(1);">
                    基本信息
                </div>
                <div :class="[showRiverControl?'chooseDivActive':'chooseDivInActive']" @click="changeRiverBubble(2);">
                    监控数据
                </div>
            </div>
            <div ref="riverBasic" v-show="showRiverBasic">
<!--                <div class="onediv">-->
<!--                    <img class="locatimg" src="images/symbol/location.png" />-->
<!--                    <span style="margin-left: 0.01rem">{{sourceData.attributes.jcsj}}</span>-->
<!--                </div>-->
                <div class="onediv">
                    <div style="float: left">
                        <span>名称：</span>
                        <span v-if="sourceData.attributes.name" class="yellowfont">{{sourceData.attributes.name}}</span>
                        <span v-else class="yellowfont">暂无</span>
                    </div>
                </div>
                <div class="onediv">
                    <div style="float: left">
                        <span>检测时间：</span>
                        <span v-if="sourceData.attributes.jcsj" class="yellowfont">{{sourceData.attributes.jcsj}}</span>
                        <span v-else class="yellowfont">暂无</span>
                    </div>
                </div>
            </div>
            <div ref="waterControl" v-show="showRiverControl">
                <table class="bubbleTable">
                    <tr>
                        <td colspan="2">
                            <span>是否合格：</span>
                            <span v-if="sourceData.attributes.isPass" class="yellowfont">{{sourceData.attributes.isPass}}</span>
                            <span v-else class="yellowfont">暂无</span>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <span>总磷：</span>
                            <span v-if="sourceData.attributes.zlin" class="yellowfont">
                                {{sourceData.attributes.zlin}}
                                <span style="color: #FFFFFF">mg/L</span>
                            </span>
                            <span v-else class="yellowfont">暂无</span>
                        </td>
                        <td>
                            <span>溶解氧：</span>
                            <span v-if="sourceData.attributes.rjy" class="yellowfont">
                                {{sourceData.attributes.rjy}}
                                <span style="color: #FFFFFF">mg/L</span>
                            </span>
                            <span v-else class="yellowfont">暂无</span>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <span>PH值：</span>
                            <span v-if="sourceData.attributes.ph" class="yellowfont">
                                {{sourceData.attributes.ph}}
                                <span style="color: #FFFFFF">mg/L</span>
                            </span>
                            <span v-else class="yellowfont">暂无</span>
                        </td>
                        <td>
                            <span>高猛酸盐指数：</span>
                            <span v-if="sourceData.attributes.gmsyzs" class="yellowfont">
                                {{sourceData.attributes.gmsyzs}}
                                <span style="color: #FFFFFF">mg/L</span>
                            </span>
                            <span v-else class="yellowfont">暂无</span>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <span>氨氮：</span>
                            <span v-if="sourceData.attributes.adan" class="yellowfont">
                                {{sourceData.attributes.adan}}
                                <span style="color: #FFFFFF">cm</span>
                            </span>
                            <span v-else class="yellowfont">暂无</span>
                        </td>
<!--                        <td>-->
<!--                            <span>水质指数：</span>-->
<!--                            <span v-if="sourceData.attributes.aqi" class="yellowfont">-->
<!--                                {{sourceData.attributes.aqi}}-->
<!--                            </span>-->
<!--                            <span v-else class="yellowfont">暂无</span>-->
<!--                        </td>-->
                    </tr>
                </table>
            </div>
        </div>


        <!--视频监控-->
<!--        <div  class="bubble-box spjkd" v-show="sourceData==null?false:sourceData.attributes.id==='spjkd'">-->
<!--                &lt;!&ndash;<video id="video" class="video-js" controls autoplay preload="auto" width="1000" height="600" data-setup="{}">-->
<!--                    <source :src="'rtmp://10.197.149.246:1935/live/SourceId='+sourceData.attributes.cameraDeviceNum" type="rtmp/flv">-->
<!--                </video>&ndash;&gt;-->

<!--           &lt;!&ndash; <video id="video" width="500" height="240" controls autoplay preload="auto" data-setup="{}">' >-->

<!--                <source :src="'rtmp://10.197.149.246:1935/live/SourceId='+sourceData.attributes.cameraDeviceNum" type="rtmp/flv">-->

<!--            </video>&ndash;&gt;-->
<!--        </div>-->
    </div>
</template>

<script>
    export default {
        name: "BaseBubble",
        data() {
          return {
              current:0,
              showGasBasic: true,
              showGasControl: false,
              showWaterBasic: true,
              showWaterControl: false,
              showIncinerationBasic: true,
              showIncinerationControl: false,
              showRiverBasic: true,
              showMedicalInstitutionBasic:true,
              showMedicalInstitutionControl:false,
              showRiverControl: false,
              aqiStation:true,
              aqiStationDataByYesterday:false,
              onMap:true
          }
        },
        methods:{
            changeGasBubble:function (val) {
                if(val == 1) {
                    this.showGasBasic = true;
                    this.showGasControl = false;
                } else if(val == 2) {
                    this.showGasBasic = false;
                    this.showGasControl = true;
                }
            },
            changeWaterBubble:function(val) {
                if(val == 1) {
                    this.showWaterBasic = true;
                    this.showWaterControl = false;
                } else if(val == 2) {
                    this.showWaterBasic = false;
                    this.showWaterControl = true;
                }
            },
            changeIncinerationBubble:function(val) {
                if(val == 1) {
                    this.showIncinerationBasic = true;
                    this.showIncinerationControl = false;
                } else if(val == 2) {
                    this.showIncinerationBasic = false;
                    this.showIncinerationControl = true;
                }
            },
            changeRiverBubble:function(val) {
                if(val == 1) {
                    this.showRiverBasic = true;
                    this.showRiverControl = false;
                } else if(val == 2) {
                    this.showRiverBasic = false;
                    this.showRiverControl = true;
                }
            },
            changeMedicalInstitutionBubble:function(val) {
                if(val == 1) {
                    this.showMedicalInstitutionBasic = true;
                    this.showMedicalInstitutionControl = false;
                } else if(val == 2) {
                    this.showMedicalInstitutionBasic = false;
                    this.showMedicalInstitutionControl = true;
                }
            },
            changeIncinerationIn:function(val) {
                this.current=val;
            },
            changeAqiStationBubble:function (val) {
                if(val == 1){
                    this.aqiStation = true;
                    this.aqiStationDataByYesterday = false;
                }else if(val == 2){
                    this.aqiStation = false;
                    this.aqiStationDataByYesterday = true;
                }
            },
            // playVideo(){
            //    let v= document.getElementById('video');
            //     if(v){
            //         videojs('video').play()
            //     }else{
            //         setTimeout(()=>{
            //             this.playVideo()
            //         },500)
            //     }
            // },
            // showVideo(){
            //     let videoUrl='rtmp://10.197.149.246:1935/live/SourceId='+this.sourceData.attributes.cameraDeviceNum;
            //     setTimeout(function(){
            //         if($('.spjkd').length > 0 && $('.video-js').length === 0){
            //             $('.spjkd').append(
            //                 '<video id="video-id" class="video-js" controls autoplay preload="auto" width="500"' +
            //                 '   height="300" data-setup="{}">' +
            //                 '   <source src="'+videoUrl+'" type="rtmp/flv">' +
            //                 '</video>');
            //             videojs("video-id").play();
            //         }else{
            //             this.showVideo();
            //         }
            //     }, 500);
            // }
        },
        props:{
            sourceData:{
                type:Object,
                default:function () {
                    return {
                        attributes:{}
                    };
                }
            }
        },
        watch :{
            'sourceData.attributes'(val){
                if($('.video-js').length >0){
                    videojs("video-id").dispose();
                }
                if(val.id==='spjkd'){
                    this.showVideo();
                }
            },
        }
    }
</script>

<style scoped lang="less">
    .BaseBubble{
        // width: 100%;
        font-size: 0.041rem;
        font-weight: bold;
        margin-top: 0.03rem;
        position: relative;
        background: rgb(1,15,43,0.01);
        padding: 0.02rem 0.04rem 0.05rem;
        border: 1px solid rgba(79, 158, 253, 0.6);
    }
    .BaseBubble .onediv {
        margin-top: 0.07rem;
        font-size: 0.05rem;
        overflow: hidden;
        text-align: left;
        &:first-child{
            color: #fff;
        }
        img{
            margin-right: 0.03rem;
        }
    }
    .bubbleTable {
        width: 100%;
    }
    .bubbleTable tr {
        width: 100%;
    }
    .bubbleTable tr td {
        padding-top:  0.015rem;
        padding-bottom: 0.015rem;
        text-align: left;
    }
    /******** 弹窗内容 ****** */
    .bubble-box{
        overflow: hidden;
        font-size: 0.05rem;        
        color: #CCDEFF;
        .bubble-title{
            display: flex;
            margin-bottom: 0.03rem;
        }
    }
    .BaseBubble .chooseDivActive {
        display: inline;
        margin-right: 0.04rem;
        padding: 0.02rem;
        font-size: 0.05rem;
        color: rgba(0, 234, 156, 1);
        border-bottom: 0.01rem solid rgba(0, 234, 156, 1);
        cursor: pointer;
    }
    .BaseBubble .chooseDivInActive {
        display: inline;
        margin-right: 0.04rem;
        padding: 0.02rem;
        font-size: 0.05rem;
        color: rgba(204, 222, 255, 1);
        cursor: pointer;
    }
    .BaseBubble .locatimg {
        width: 40px;
        height: 40px;
        vertical-align: middle;
    }
    .bluefont {
        color: #1592CB;
    }
    .yellowfont {
        // color: #FEB42D;
        color: #00B4FF;
    }
    .inChange div {
        display: inline;
        margin-right: 0.04rem;
        padding: 0.02rem;
        cursor: pointer;
        border-radius: 25px;
    }
    .inChangeAcitve {
        color: #FEB42D;
        background-color: rgba(255, 255, 255, 0.3);
    }
    .background-img {
        width: 8px;
        height: 8px;
        background-size: 100% 100%;
        &.l-t {
            background: url("../../../public/images/symbol/angle_left-top.png");
            position: absolute;
            top: 0;
            left: 0;
        }

        &.r-t {
            background: url("../../../public/images/symbol/abgle_rigt-top.png");
            position: absolute;
            top: 0;
            right: 0;
        }

        &.l-b {
            background: url("../../../public/images/symbol/angle_left-bottom.png");
            position: absolute;
            left: 0;
            bottom: 0;
        }

        &.r-b {
            background: url("../../../public/images/symbol/abgle_rigt-bottom.png");
            position: absolute;
            right: 0;
            bottom: 0;
        }

    }
    .medic-div{
        margin-top: 0.03rem;
    }
</style>
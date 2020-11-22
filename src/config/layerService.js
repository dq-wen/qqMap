export const gzdzdt_Layer = {
    url: `${process.env.VUE_APP_MAP_ONE}/server/rest/services/GDBasemap/MapServer`
        // url:"http://cimmap.zx.gzs.gd:10996/ServiceAccess/MapService-T/2017%E5%B9%B4%E5%8D%AB%E6%98%9F%E5%BD%B1%E5%83%8F%E5%9C%B0%E5%9B%BE_%E5%B9%BF%E5%B7%9E2000%E5%9D%90%E6%A0%87%E7%B3%BB_/19f3612a2b44e98baae1f40713a085b6",
}

export const gzyx_layer = {
    id: "gzyx",
    url: `${process.env.VUE_APP_MAP_TWO}/ServiceAccess/MapService-T/2017年卫星影像地图_广州2000坐标系_/19f3612a2b44e98baae1f40713a085b6`,
    // url: `${process.env.VUE_APP_MAP_TWO}/ServiceAccess/MapService-T/2016年电子地图(广州2000坐标系)_/19f3612a2b44e98baae1f40713a085b6`,
}

export const testMap = {
    url:
    `${process.env.VUE_APP_MAP_TWO}/agcom/CIM/lib/arcgis_js_api/library/hp-screen-4.15/init.js`,
  css:
    `${process.env.VUE_APP_MAP_TWO}/agcom/CIM/lib/arcgis_js_api/library/hp-screen-4.15/esri/themes/light/main.css`,
}

export const layerList = {
    gzyx: 'http://10.194.150.155:8010/ServiceAccess/MapService-T/2017年卫星影像地图_广州2000坐标系_/19f3612a2b44e98baae1f40713a085b6',  //广州影像底图
    xzqh: 'http://10.194.69.43/server/rest/services/GDBasemap/MapServer',   //行政区划
    xzlw: 'http://10.194.69.29:8091/proxy/rest/services/99408a6c-8c0a-444f-b1c6-16823ed8cc4a/9797d3bc-9ee6-4459-b867-93d069458257/mapserver/2', //用于行政区网线
    elevation: 'http://10.194.69.43/server/rest/services/GZ_DEM20200813/ImageServer',
    TianheBuildings_A: 'http://10.194.69.43/server/rest/services/Hosted/TianheBuildings_A/SceneServer',
    TianheBuildings_B: 'http://10.194.69.43/server/rest/services/Hosted/TianheBuildings_B/SceneServer',
    TianheBuildings_C: 'http://10.194.69.43/server/rest/services/Hosted/TianheBuildings_C/SceneServer',
    TianheBuildings_D: 'http://10.194.69.43/server/rest/services/Hosted/TianheBuildings_D/SceneServer',
    MZWTrees: 'http://10.194.69.43/server/rest/services/Hosted/%E6%98%8E%E7%8F%A0%E6%B9%BEtrees/SceneServer',
    MZWTerrain: 'http://10.194.69.43/server/rest/services/Hosted/%E6%98%8E%E7%8F%A0%E6%B9%BEterrain/SceneServer',
    gzTower: 'http://10.194.69.43/server/rest/services/Hosted/HZ_HXS_JZ/SceneServer',
    allRiver: 'http://10.194.170.83:6080/arcgis/rest/services/suizhiguan/river/MapServer',
    strictLine: 'http://10.194.154.35/arcgis/rest/services/ZhuJianJu/%E8%A1%8C%E6%94%BF%E5%8C%BA%E5%88%92/MapServer/2',
    flowerTown: 'http://10.194.69.43/server/rest/services/%E5%A4%A9%E6%B2%B3%E5%BA%95%E5%9B%BEGZ2000/MapServer',
    PZImg: 'http://10.194.69.43/server/rest/services/%E7%90%B6%E6%B4%B2%E5%BA%95%E5%9B%BEGZ2000/MapServer',

    sthj: 'http://10.194.69.43/server/rest/services/%E7%94%9F%E6%80%81%E7%8E%AF%E5%A2%83/MapServer/1',   //生态保护红线区_Merge (ID: 1)
    waterControl: 'http://10.194.69.43/server/rest/services/SHJ_GKQ/MapServer',
    airControl: 'http://10.194.69.43/server/rest/services/DQHJ_GKQ/MapServer',
    redLine: 'http://10.194.69.43/server/rest/services/STBH_HXQ/MapServer',
    ecologicalControl: 'http://10.194.69.43/server/rest/services/STBH_GKQ/MapServer',
}
export const wkt = {
    gz2000: 'PROJCS["GUANGZHOU2000",GEOGCS["GCS_China_Geodetic_Coordinate_System_2000",DATUM["D_China_2000",SPHEROID["CGCS2000",6378137.0,298.257222101]],PRIMEM["Greenwich",0.0],UNIT["Degree",0.0174532925199433]],PROJECTION["Gauss_Kruger"],PARAMETER["False_Easting",0.0],PARAMETER["False_Northing",0.0],PARAMETER["Central_Meridian",113.28],PARAMETER["Scale_Factor",1.0],PARAMETER["Latitude_Of_Origin",0.0],UNIT["Meter",1.0]]',
} 
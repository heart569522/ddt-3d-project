export enum ColumnRoomEnum {
  rm_id = "รหัสห้อง",
  bu_id = "รหัสอาคาร",
  bu_name = "อาคาร",
  rm_name = "ชื่อห้อง",
  type = "ประเภท",
  air_amount = "จำนวนเครื่องปรับอากาศ",
  lamp_amount = "จำนวนโคม",
  sensor_air = "sensor_air",
  sensor_cctv = "sensor_cctv",
  sensor_htpm = "sensor_htpm",
  sensor_receptacle = "จำนวนเต้าเสียบ",
  sensor_switch = "จำนวนสวิตซ์ไฟ",
  sensor_meter = "sensor_meter",
}

export enum ColumnAirEnum {
  a_id = "รหัสเครื่องปรับอากาศ",
  rm_id = "รหัสห้อง",
  a_code = "รหัสชนิด",
  brand_code = "รหัสยี่ห้อ",
  gen = "gen",
  u_srID = "u_srID",
  a_installer = "ผู้ติดตั้ง",
  order_id = "รหัสคำสั่งซื้อ",
  buyer = "ผู้ซื้อ",
  a_install_date = "วันที่ติดตั้ง",
  order_date = "วันที่สั่งซื้อ",
  received_date = "วันที่ได้รับ",
  warranty_period = "วันหมดประกัน",
  TotalMinutes = 'ชั่วโมงใช้งานโดยเซ็นเซอร์'
}

export enum ColumnLampEnum {
  rm_id = "รหัสห้อง",
  l_id = "รหัสโคมไฟ",
  l_code = "รหัสชนิด",
  brand_code = "รหัสยี่ห้อ",
  u_srID = "u_srID",
  l_installer = "ผู้ติดตั้ง",
  l_install_date = "วันที่ติดตั้ง",
  lb_code = "lb_code",
  brand_code_lb = "brand_code_lb"
}

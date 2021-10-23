package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

// ClassRoom "班级"类型
type ClassRoom struct {
	// 如 json:"id" 是为了方便前端的使用
	ID          uint   `gorm:"column:id" json:"id"`
	Name        string `gorm:"type:varchar(255);column:name" json:"name"`
	Description string `gorm:"column:description" json:"description"`
}

// Student "学生"类型
type Student struct {
	ID          uint   `gorm:"column:id" json:"id"`
	Name        string `gorm:"type:varchar(255);column:name" json:"name"`
	Sex         string `gorm:"column:sex" json:"sex"`
	Age         string `gorm:"column:age" json:"age"`
	Description string `gorm:"column:description" json:"description"`
	ClassID     string `gorm:"column:class_id" json:"class_id"`
}

func main() {
	r := gin.Default()
	//开启中间件 允许使用跨域请求
	r.Use(Cors())

	// 连接数据库
	// 参考 https://github.com/go-sql-driver/mysql#dsn-data-source-name 获取详情
	// TODO: 如账号、密码等抽成常量去方便开发与维护
	dsn := "root:CYByob123@tcp(81.70.161.16:3306)/go_project_demo?charset=utf8mb4&parseTime=True&loc=Local"
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		fmt.Println("连接失败")
		fmt.Println(err)
	}

	// 进行 某班级信息 的变更（目前仅支持 description 的变更）
	r.POST("classRoom/:classRoomID", func(c *gin.Context) {
		var classRoomID = c.Param("classRoomID")
		json := make(map[string]interface{}) //注意该结构接受的内容
		c.BindJSON(&json)

		db.Table("classRoom").Where("id = ?", classRoomID).Update("description", json["description"])

		c.JSON(200, gin.H{
			"code": 0,
			"data": gin.H{"classRoomID": classRoomID, "description": json["description"]},
			"msg":  "",
		})
	})

	// 获取 某班级里的 所有学生列表
	r.GET(("classRoom/:classRoomID/students"), func(c *gin.Context) {
		var classRoomID = c.Param("classRoomID")
		var data []Student
		db.Table("student").Where("class_id = ?", classRoomID).Find(&data)

		c.JSON(200, gin.H{
			"code": 0,
			"data": data,
			"msg":  "",
		})
	})

	// 获取 具体的班级信息
	r.GET("/classRoom/:classRoomID", func(c *gin.Context) {
		classRoomID := c.Param("classRoomID")
		var data ClassRoom
		db.Table("classRoom").Where("id = ?", classRoomID).Find(&data)

		c.JSON(200, gin.H{
			"code": 0,
			"data": data,
			"msg":  "",
		})
	})

	// 获取 班级列表
	r.GET("classRooms", func(c *gin.Context) {
		var data []ClassRoom
		db.Table("classRoom").Find(&data)

		c.JSON(200, gin.H{
			"code": 0,
			"data": data,
			"msg":  "",
		})
	})

	r.GET("/cyb", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"code": 0,
			"data": "CYB",
			"msg":  "",
		})
	})

	r.Run()
}

// Cors 解决跨域
func Cors() gin.HandlerFunc {
	return func(c *gin.Context) {
		method := c.Request.Method
		origin := c.Request.Header.Get("Origin") //请求头部
		if origin != "" {
			//接收客户端发送的origin （重要！）
			c.Writer.Header().Set("Access-Control-Allow-Origin", origin)
			//服务器支持的所有跨域请求的方法
			c.Header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE, UPDATE")
			//允许跨域设置可以返回其他子段，可以自定义字段。必须加上 "Content-Type, Access-Token" ，不然在 POST时的OPTIONS预检请求会报错
			c.Header("Access-Control-Allow-Headers", "Content-Type, Access-Token, Authorization, Content-Length, X-CSRF-Token, Token, session")
			// 允许浏览器（客户端）可以解析的头部 （重要）
			c.Header("Access-Control-Expose-Headers", "Content-Length, Access-Control-Allow-Origin, Access-Control-Allow-Headers")
			//设置缓存时间
			c.Header("Access-Control-Max-Age", "172800")
			//允许客户端传递校验信息比如 cookie (重要)
			c.Header("Access-Control-Allow-Credentials", "true")
		}

		//允许类型校验
		if method == "OPTIONS" {
			c.JSON(http.StatusOK, "ok!")
		}

		defer func() {
			if err := recover(); err != nil {
				log.Printf("Panic info is: %v", err)
			}
		}()

		c.Next()
	}
}

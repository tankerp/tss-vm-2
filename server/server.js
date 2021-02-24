require("dotenv").config()
const express = require("express")
const cors = require("cors")
const db = require("./db")
const morgan = require("morgan")
const app = express()
app.use(cors())
app.use(express.json())

//morgan - middlewear
//app.use(morgan("dev"))

app.get("/api/v1/sites", async (req, res) => {
  try {
    const results = await db.query("select * from sum_table")
    //console.log(results)
    res.status(200).json({
      status: "success",
      results: results.rows.length,
      data: {
        site: results.rows
      }
    })
  } catch (err) {
    console.log(err)
  }
})

app.get("/api/v1/sites/errorlist", async (req, res) => {
  try {
    const errorpumps = await db.query("select * from error_pumps")
    //console.log(results)
    res.status(200).json({
      status: "success",
      results: errorpumps.rows.length,
      data: {
        site: errorpumps.rows
      }
    })
  } catch (err) {
    console.log(err)
  }
})

app.get("/api/v1/sites/reports", async (req, res) => {
  try {
    const results = await db.query("select * from sum_table")
    //console.log(results)
    //console.log(column_names.rows.length)
    res.status(200).json({
      status: "success",
      results: results.rows.length,
      data: results.rows
    })
  } catch (err) {
    console.log(err)
  }
})

app.get("/api/v1/sites/errorlist", async (req, res) => {
  try {
    const errorpumps = await db.query("select * from error_pumps")
    //console.log(results)
    res.status(200).json({
      status: "success",
      results: errorpumps.rows.length,
      data: {
        site: errorpumps.rows
      }
    })
  } catch (err) {
    console.log(err)
  }
})

app.get("/api/v1/sites/reportscol", async (req, res) => {
  try {
    const column_names = await db.query("SELECT * from information_schema.columns WHERE table_name='sum_table'")
    //console.log(results)
    console.log(column_names.rows.column_name)
    res.status(200).json({
      status: "success",
      results: column_names.rows.length,
      data: column_names.rows
    })
  } catch (err) {
    console.log(err)
  }
})

app.get("/api/v1/sites/indi/:id", async (req, res) => {
  console.log(req.params.id)
  try {
    const temperature = await db.query("select temperature,powerval,voltage,currentval,pump_status from pumpdata where pump_no = $1 order by DateTime desc limit 1", [req.params.id])
    const dcpower = await db.query("select powerval from pumpdata where pump_no = $1 order by DateTime desc limit 1", [req.params.id])
    const acpower = await db.query("select powerval * $2 from pumpdata where pump_no = $1 order by DateTime desc limit 1", [req.params.id, 0.7])
    //const totalacpower = await db.query("select sum(powerval * $2) from sitedata where pump_no = $1", [req.params.id], 0.7)
    const dcvoltage = await db.query("select voltage from pumpdata where pump_no = $1 order by DateTime desc limit 1", [req.params.id])
    const dccurrent = await db.query("select currentval from pumpdata where pump_no = $1 order by DateTime desc limit 1", [req.params.id])
    const pstatus = await db.query("select pump_status from pumpdata where pump_no = $1 order by DateTime desc limit 1", [req.params.id])
    //console.log(results.rows[0])
    res.status(200).json({
      status: "success",
      //results: results.rows.length,
      data: {
        temp: temperature.rows[0],
        dcp: dcpower.rows[0],
        acp: acpower.rows[0],
        //tacp: totalacpower,
        dcv: dcvoltage.rows[0],
        dcc: dccurrent.rows[0],
        pst: pstatus.rows[0]
      }
    })
  } catch (err) {
    console.log(err)
  }
})
/*
app.get("/api/v1/sites/all/:id", async (req, res) => {
  console.log(req)
  console.log(req.params.id)
  try {
    const allres = await db.query("select dateTime,temperature,powerval,voltage,currentval,pump_status from pumpdata_two where pump_no = $1, datetime>=$2 and datetime<=$3 ", [req.params.id, req.body.startDate, req.body.endDate])

    //console.log(results.rows[0])
    res.status(200).json({
      status: "success",
      //results: results.rows.length,
      data: allres
    })
  } catch (err) {
    console.log(err)
  }
})
*/
//and datetime>='2021/01/27' and datetime<='2021/01/28'

//get individual sites
app.get("/api/v1/sites/:id", async (req, res) => {
  console.log(req.params.id)
  try {
    const temperature = await db.query("select temperature from pumpdata where pump_no = $1 order by DateTime desc limit 1", [req.params.id])
    const dcpower = await db.query("select powerval from pumpdata where pump_no = $1 order by DateTime desc limit 1", [req.params.id])
    const acpower = await db.query("select powerval * $2 from pumpdata where pump_no = $1 order by DateTime desc limit 1", [req.params.id, 0.7])
    //const totalacpower = await db.query("select sum(powerval * $2) from sitedata where pump_no = $1", [req.params.id], 0.7)
    const dcvoltage = await db.query("select voltage from pumpdata where pump_no = $1 order by DateTime desc limit 1", [req.params.id])
    const dccurrent = await db.query("select currentval from pumpdata where pump_no = $1 order by DateTime desc limit 1", [req.params.id])
    const pstatus = await db.query("select pump_status from pumpdata where pump_no = $1 order by DateTime desc limit 1", [req.params.id])
    const timelim = await db.query("select DateTime from pumpdata where pump_no = $1", [req.params.id])
    const pdat = await db.query("select powerval from pumpdata where pump_no = $1", [req.params.id])
    const ptime = await db.query("select DateTime, powerval, temperature, voltage, currentval from pumpdata where pump_no = $1", [req.params.id])
    const tdat = await db.query("select temperature from pumpdata where pump_no = $1", [req.params.id])

    //console.log(results.rows[0])
    res.status(200).json({
      status: "success",
      //results: results.rows.length,
      data: {
        temp: temperature,
        dcp: dcpower,
        acp: acpower,
        //tacp: totalacpower,
        dcv: dcvoltage,
        dcc: dccurrent,
        pst: pstatus,
        tlim: timelim.rows,
        pat: pdat.rows,
        tat: tdat.rows,
        pt: ptime.rows
      }
    })
  } catch (err) {
    console.log(err)
  }
})

app.get("/api/v1/sites/all/:id", async (req, res) => {
  console.log(req.params.id)
  try {
    const allres = await db.query("select dateTime,temperature,powerval,voltage,currentval,pump_status from pumpdata_two where pump_no = $1", [req.params.id])

    //console.log(results.rows[0])
    res.status(200).json({
      status: "success",
      //results: results.rows.length,
      data: allres
    })
  } catch (err) {
    console.log(err)
  }
})

const port = process.env.PORT || 3001
app.listen(port, () => {
  console.log(`server is up on port ${port}`)
})

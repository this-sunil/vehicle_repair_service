import pool from "../database/db.js";

const createCatTable = async () => {
  const query = `CREATE TABLE IF NOT EXISTS category(cid SERIAL PRIMARY KEY,title TEXT NOT NULL,photo TEXT NOT NULL,vehicle_type TEXT NOT NULL,created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)`;
  pool.query(query, (err) => {
    if (err) {
      throw err;
    }
    console.log(`Category Table Created`);
  });
};

createCatTable();

export const addCategoryController = async (req, res) => {
  const { title, type } = req.body;
  try {
    const photo = req.file ? req.file.filename : "";
    const query = `INSERT INTO category(title,photo,vehicle_type) VALUES($1,$2,$3) RETURNING *`;
    const { rows } = await pool.query(query, [title, photo, type]);
    if (rows.length === 0) {
      return res.status(404).json({
        status: false,
        msg: "Failed to insert category !!!",
      });
    }
    return res.status(200).json({
      status: true,
      msg: "Insert Category Successfully !!!",
      result: rows[0]
    });
  } catch (error) {
    console.log(`Error in add Category=>${error.msg}`);
    return res.status(500).json({
      status: false,
      msg: "Internal Server Error",
    });
  }
};

export const updateCategoryController = async (req, res) => {
  const { cid, title, type } = req.body;
  try {
    const fields = [];
    const values = [];
    const data = { cid, title, type };
    let index = 1;
    const photo = req.file ? req.file.filename : "";
    for (const [key, value] of Object.entries(data)) {
      if (value !== undefined) {
        fields.push(`${key}=$${index}`);
        values.push(value);
        index++;
      }
    }
    if(photo){
        fields.push(`photo=$${index++}`);
        values.push(photo);
    }
    values.push(cid);
    const query = `UPDATE category SET ${fields.join(", ")} WHERE cid=$${index} RETURNING *`;
    const {rows}=await pool.query(query,values);
    if(rows.length===0){
        return res.status(404).json({
            status:false,
            msg:"Failed to Update Category !!!"
        });
    }
    return res.status(200).json({
        status:true,
        msg:"Update Category Successfully !!!",
        result:rows[0]
    });

  } catch (error) {
    console.log(`Error in =>${error.msg}`);
    return res.status(500).json({
      status: false,
      msg: "Internal Server Error",
    });
  }
};

export const deleteCategoryController=async(req,res)=>{
    const cid=req.body.cid;
    try {
        const query=`DELETE FROM category WHERE cid=$1 RETURNING *`;
        const {rows}=await pool.query(query,[cid]);
        if(rows.length===0){
            return res.status(404).json({
                status:false,
                msg:"Failed to Delete Category"
            });
        }
        return res.status(200).json({
            status:true,
            msg:"Delete Category Successfully !!!"
        });
    } catch (error) {
        console.log(`Error in =>${error.msg}`);
        return res.status(500).json({
            status:false,
            msg:"Internal Server Error"
        });
    }
};

export const getAllCategoryController=async(req,res)=>{
    try {
        const query=`SELECT * FROM category`;
        const {rows}=await pool.query(query);
        if(rows.length===0){
            return res.status(404).json({
                status:false,
                msg:"No Data Found !!!"
            });
        }
        return res.status(200).json({
            status:true,
            msg:"Fetch Category Successfully!!!",
            result:rows
        });
    } catch (error) {
        console.log(`Error in Category=>${error.msg}`);
        return res.status(500).json({
            status:false,
            msg:"Internal Server Error"
        });
    }
};

export const getAllVehicleType=async (req,res) => {
  try {
    const query=`SELECT vehicle_type from category`;
    const rows=await pool.query(query);
    if(rows.length===0){
      return res.status(404).json({
        status:false,
        msg:"No data found !!!"
      });
    }
    return res.status(200).json({
      status:true,
      msg:"Fetch Vehicle category Successfully !!!",
      result:rows
    });
  } catch (error) {
    return res.status(500).json({
      status:true,
      msg:"Internal Server Error"
    });
  }
};

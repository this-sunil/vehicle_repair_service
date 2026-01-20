import pool from "../database/db.js";

const createVehicleService=async()=>{
   const query=`CREATE TABLE IF NOT EXISTS vehicle_service(id SERIAL PRIMARY KEY,title TEXT NOT NULL,description TEXT NOT NULL,photo TEXT NOT NULL,created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)`;
   pool.query(query,(err)=>{
    if(err){
        console.log(`Error in Vehicle Service Table=>${err.message}`);
    }
    console.log(`Vehicle Service Table`);
   });
};

createVehicleService();

export const addServiceController=async(req,res)=>{
    const { title,description }=req.body;
    try {
        const query=`INSERT INTO vehicle_service(title,description,photo) VALUES ($1,$2,$3) RETURNING *`;
        const photo=req.file?req.file.filename:"";
        const {rows}=await pool.query(query,[title,description,photo]);
        if(rows.length===0){
            return res.status(404).json({
                status:false,
                msg:"rows doesn't Inserted !!!"
            });
        }
        return res.status(200).json({
            status:true,
            msg:"Inserted Successfully !!!",
            result:rows[0]
        });
    } catch (error) {
        console.log(`Error in Vehicle Service Controller=>${error.message}`);
        return res.status(500).json({
            status:false,
            msg:"Internal Server Error"
        });
    }
};

export const updateServiceController=async(req,res)=>{
    const { title,description,pick_time,pick_date }=req.body;
    try {
        const fields=[];
        const values=[];
        let currentIndex=1;
        const data={ title,description,pick_time,pick_date };
        for(const [key,value] of Object.entries(data)){
            fields.push(`${key}=$${currentIndex}`);
            values.push(value);
            currentIndex++;
        }
        const query=`UPDATE vehicle_service SET ${fields.join(", ")} WHERE id=$${currentIndex} RETURNING *`;
        const {rows}=await pool.query(query,[title,description]);
        if(rows.length===0){
            return res.status(404).json({
                status:false,
                msg:"No Updates !!!"
            });
        }
        return res.status(200).json({
            status:true,
            msg:"Update Vehicle Successfully !!!",
            result:rows[0]
        });
    } catch (error) {
        console.log(`Error in Vehicle Controller=>${error}`);
        return res.status(500).json({
            status:false,
            msg:"Internal Server Error"
        });
    }
};

export const deleteVehicleController=async(req,res)=>{
    const id=req.body.id;
    try {
        const query=`DELETE FROM vehicle_service WHERE id=$1 RETURNING *`;
        const {rows}=await pool.query(query,[id]);
        if(rows.length===0){
            return res.status(404).json({
                status:false,
                msg:"No Vehicle Found !!!"
            });
        }
        return res.status(200).json({
            status:true,
            msg:"Vehicle Service deleted !!!",
            result:rows[0]
        });
    } catch (error) {
        console.log(`Error in Delete Vehicle Controller =>${error}`);
        return res.status(500).json({
            status:false,
            msg:"Internal Server Error"
        });
    }
};

export const getAllVehicleServiceController=async(req,res)=>{
    const limit=Number(req.body.limit) || 10;
    const page=Number(req.body.page) || 1;
    try{
        const offset=(page-1)*limit;
      const query=`SELECT * FROM vehicle_service ORDER BY id LIMIT $1 OFFSET $2`;
       
      const {rows}=await pool.query(query,[limit,offset]);
      if(rows.length===0){
        return res.status(404).json({
            status:false,
            msg:"No Data Found !!!"
        });
      }
      const totalItem=Number(rows.length);
      const totalPage=Math.ceil(totalItem/limit);
      const prevPage=page>1;
      const nextPage=page<totalPage;
      return res.status(200).json({
        status:true,
        msg:"Fetch Data Successfully!!!",
        page,
        totalPage,
        prevPage,
        nextPage,
        result:rows
      });
    }catch(e){
        console.log(`Error in get All vehicle Controller=>${e.message}`);
        return res.status(500).json({
            status:false,
            msg:"Internal Server Error !!!"
        });
    }
};




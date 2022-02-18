module.exports = mongoose => {
    const Team = mongoose.model(
      "team",
      mongoose.Schema(
        {
          TeamName: {
              type:String,
              minlength: [7,'7 characters required'],
              required: [true, 'Atleast 7 characters in the team name']
          }, 
          TeamNationality: {
              type:String,
              minlength: [1,'team nationailty is empty'],
              required: [true, 'Team nationaility is required']
          }, 
          NumberOfPlayers:{
              type:Number,
              min: [11, 'Must be atleast 11 players or less then 17, got {VALUE}'],
              max: 16
          }
        },
        { timestamps: true }
      )
    );
    return Team;
  };



const StepModel  = require('../../db/models').Step;

class StepModelWrapper {
  static findAll (listingId) {
    return StepModel.findAll({ where: { listingId } });
  }

  static bulkCreate(bulkCreate) {
    return StepModel.bulkCreate(bulkCreate);
  }

  static destroy(id) {
    return StepModel.destroy({ where: { id } });
  }

  static multiUpdate(changes) {
    return models.sequelize.Promise.each(changes, function(val, index) {
      return StepModel.update(
        {
          name: val.name,
          step: val.step,
          flowId: val.flowId
        },{
          where:{
            id: val.id
          }
        })
    })
  }
}

export default StepModelWrapper;
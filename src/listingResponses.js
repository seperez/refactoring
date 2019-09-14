// TODO: recibir res en todos
const sendResponse = (listings) => res.status(200).send(listings[0]);

const send400GenericError = (error) => {
  console.log(error)
  res.status(400).send(error)
};

const send403Unauthorized = () => {
  if (listing.subsidiaryId != req.decoded.user.subsidiaryId && !req.decoded.authorities.includes(constants.ROLE_EMPLOYEE) ) {
    return res.status(403).send({
      message: 'Listing Not Found',
    });
  }
}

const send400IfUserNotFound = () => {
  if (!req.decoded || !req.decoded.user){
    return res.status(400).send({
      message: 'User Not Found',
    });
  }
}

const send404IfListingsNotFound = () => {
  if (!listing) {
    return res.status(404).send({
      message: 'Listing Not Found',
    });
  }
};

export { 
  sendResponse, 
  send400GenericError, 
  send403Unauthorized, 
  send400IfUserNotFound, 
  send404IfListingsNotFound 
};
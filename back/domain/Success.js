class Success {
  constructor() {}
  returnSuccess = (successCodeHTTP, message) => {
    return { code: successCodeHTTP, message }
  }
  userCreated = () =>
    this.returnSuccess(201, { message: 'Utilisateur-rice créé-e' })
  userFound = (userId, role, token) =>
    this.returnSuccess(200, { userId: userId, role: role, token: token })
  userUpdate = () =>
    this.returnSuccess(200, {
      message: "Données de l'utilisateur-rice mises à jour",
    })
  postCreated = () => this.returnSuccess(201, { message: 'Post créé' })
  commentCreated = () => this.returnSuccess(201, { message: 'Commentaire créé' })
  postModified = () => this.returnSuccess(200, { message: 'Post modifié' })
  postDeleted = () => this.returnSuccess(200, { message: 'Post supprimé' })
  commentDeleted = () => this.returnSuccess(200, { message: 'Commentaire supprimé' })
  likeRecord = () => this.returnSuccess(200, { message: 'Vote ajouté au post' })
  unlikeRecord = () =>
  this.returnSuccess(200, { message: 'Vote supprimé du post' })
  requestFound = (response) => this.returnSuccess(200, response)
}

module.exports = Success

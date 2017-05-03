export default {

  truncateText: (str, limit) => {
    if(str.length < limit){
      return
    }
    return str.substring(0, limit)+'...'
  }

}

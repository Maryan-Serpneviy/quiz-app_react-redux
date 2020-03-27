export const timeTransform = (time: number = 0): string => {
   let seconds: number | string = parseInt(String(time), 10)
   let hours = Math.floor(seconds / 3600)
   let minutes: number | string = Math.floor((seconds - hours * 3600) / 60)
   seconds = seconds - hours * 3600 - minutes * 60

   if (minutes < 10) {
      minutes = `0${minutes}`
   }
   if (seconds < 10) {
      seconds = `0${seconds}`
   }
   return `${minutes}:${seconds}`
}

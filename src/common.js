
const styles = {
    nobottommargin: {
        marginBottom: 0,
        paddingBottom: 0,
    },
    notopmargin: {
        marginTop: 0,
        paddingTop: 0,
    },
    nobold: {
        fontWeight: 'normal',
    },
    spacer: {
        height: '5em',
    },
    noMarginGrid: {
      marginRight: 0,
      marginLeft: 0,
    },
}
export default styles

export const priocolors = {
  '3': 'red',
  '2': 'orange',
  '1': 'brown',
  '0': 'black',
}

export function sortByKey(array, key) {
    return array.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        return ((x > y) ? -1 : ((x < y) ? 1 : 0));
    });
}

export function joinIfNotNull(arr, sep=', ') { return arr.filter(val => val ? val : undefined).join(sep) }

export function setAspectRatio(image, index) {
    let ratio = ''
    if (image[1] > image[2]) {
      ratio = 'wide'
      if (index % 5 === 0) {
        ratio = 'big'
      }
      if (index % 4 === 0) {
        ratio = ''
      }
    }
    if (image[1] < image[2]) {
      ratio = 'tall'
      if (index % 9 === 0) {
        ratio = ''
      }
    }
    if ((image[1] === image[2]) && (index % 4 === 0)) {
      ratio = 'big'
    }
    return ratio
}

export const nobottommargin = styles.nobottommargin
export const notopmargin = styles.notopmargin
export const nobold = styles.nobold
export const spacer = styles.spacer
export const noMarginGrid = styles.noMarginGrid

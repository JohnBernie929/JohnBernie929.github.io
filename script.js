const zeroMd = document.querySelector('zero-md')

zeroMd.addEventListener('zero-md-rendered', () => {
  const searchMathInput = document.querySelector('.search-math input')
  const mathList = document.querySelector('ul')
  const searchClear = document.querySelector('.search-clear')

  function removeAccents(str) {
    var AccentsMap = [
      'aàảãáạăằẳẵắặâầẩẫấậ',
      'AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬ',
      'dđ',
      'DĐ',
      'eèẻẽéẹêềểễếệ',
      'EÈẺẼÉẸÊỀỂỄẾỆ',
      'iìỉĩíị',
      'IÌỈĨÍỊ',
      'oòỏõóọôồổỗốộơờởỡớợ',
      'OÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢ',
      'uùủũúụưừửữứự',
      'UÙỦŨÚỤƯỪỬỮỨỰ',
      'yỳỷỹýỵ',
      'YỲỶỸÝỴ',
    ]
    for (var i = 0; i < AccentsMap.length; i++) {
      var re = new RegExp('[' + AccentsMap[i].substr(1) + ']', 'g')
      var char = AccentsMap[i][0]
      str = str.replace(re, char)
    }
    while (str.indexOf(' ') != -1) {
      str = str.replace(' ', '')
    }
    return str
  }

  searchMathInput.addEventListener('input', () => {
    const mathNodeList = mathList.querySelectorAll('li')
    const searchValue = removeAccents(searchMathInput.value.toLocaleLowerCase())

    Array.from(mathNodeList).map((math) => {
      let mathName = removeAccents(math.textContent.toLocaleLowerCase())

      function invalidSearch() {
        let preIndex = 0
        for (let i = 0; i < searchValue.length; i++) {
          let index = mathName.indexOf(searchValue[i], preIndex)

          if (index < preIndex) return false
          preIndex = index
        }

        return true
      }

      if (invalidSearch()) {
        math.style.display = 'block'
      } else {
        math.style.display = 'none'
      }
    })
  })

  searchClear.addEventListener('click', () => {
    searchMathInput.value = ''

    Array.from(mathList).map((elem) => {
      const leElements = elem.querySelectorAll('li')

      Array.from(leElements).map((liElem) => {
        liElem.style.display = 'block'
      })
    })
  })
})

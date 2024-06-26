import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { htmlSafe } from '@ember/template';

const ICON = {
  MY_COMPUTER:
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwBAMAAAClLOS0AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAIVBMVEUAAACAgIDAwMAAAAD///8AgIAA//8AAIAAAP8A/wAAgACZBxulAAAAAXRSTlMAQObYZgAAAAFiS0dEBI9o2VEAAAAHdElNRQfiBBMBJCt84jxJAAAA5UlEQVQ4y62TyxHCIBCGoYQFGghJASBagJEGMk6sxbsXW/Dq0SpNsuSxPEad8ePGNz9kNwtjExwobEZoApiwz+l+tQjlCTAL3kYnfSFqt6KI6FeouJTFGQ86JKLDi2PR9x3WkIjrfeSWCuxWnQrsyumPwpVEUnlZhNamotTE38VmpohotkMyCGfywyChzgsrZHZyJVQomKNYASggpkLBfQwEEd09zugn8XguL2NArOI1i2m4dx+PUjoVJhvQFgON9GS1lcXAcU+XBlcIQBzwIVD4pPD8VdpBbHmmCJP/FyHApIvBwBu9bp7SZvn+ewAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxOC0wNC0xOVQwMTozNjo0My0wNDowMNV8Hl4AAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTgtMDQtMTlUMDE6MzY6NDMtMDQ6MDCkIabiAAAAAElFTkSuQmCC',
  TRASH_EMPTY:
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAARVBMVEUAAACZmZkcHBxmZmZ3d3fAwMApKSmtqZD4+PhfX1/n59YiIiJNTU3MzMxVVVWZzJlmmWYAgADq6uoAZgDX19eGhob///+/sAt4AAAAAXRSTlMAQObYZgAAAAFiS0dEFnzRqBkAAAAHdElNRQfiBhoAMBmckcxBAAAB/ElEQVRIx43U7XaDIAwGYJlF0MrA0t3/rS4fBALqVnbOfmx5fAMGp0ktw2v6bEHl19f8eBgzz/Nn1bhIGPu3qdWwliLcvVHVvbgxxvseLGsTV8ZY63vTi5Mx22YHo7sS04FtMMtZuBbDYDDPs7DSWgWduciAf+0EQgNhC8Us486d9/P3CaAQ02dA+bzuBCa3jUIMCUNPf8AGvjmh20QVYjADJdSv10DqcbGBcgRYP4CYjuNIm+d6iz+wHlzfAmTXcUsxgknRl+eTcAJqQAHxgEJYkJJ8OF6S4FSABhG68bQDFK/DS8I5gM4V6yHihSKDAFASasDegOF6iggsSkLtiBra9bzSCbFIOR81wbWGln7A8XhyBpFx1QQVoEBgUDoKETJ8ewsUcANe7S1DwlsA76ABGj8GdS5S3fM5gDfBLbWE5O1tAB9TPVUWOXoCNWAEcJpdQgPrBQhawCgJcHWKunqZVxQ4SwgSgZuO6i2NIBKNRTqy6gjreyB3KHq6Q/AL3xx1JDu4BpuMYcbREHCu19eaRKJ6q3YwgB+nBVxSHj0VMAAQrn4yIga8sSMVMILphwi/aDis8IYEV6fiAhQin7E3JqgjuqgvRH34/gkYUgJ21ALugEqxDDDg+byvF4KnunLA/tfzFbEE9tPY3RMEH5YXguDTciLrul/9/Re0cDbVjcUAOgAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxOC0wNi0yNlQwMDo0ODoyNS0wNDowMDNj5BkAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTgtMDYtMjZUMDA6NDg6MjUtMDQ6MDBCPlylAAAAAElFTkSuQmCC',
  TRASH_FULL:
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAASFBMVEUAAACZmZmGhoYcHBxmZmZ3d3fAwMBVVVX4+Pjn59aysrLMzMytqZBNTU0pKSlfX1+ZzJlmmWYAgADq6uoAZgDX19ciIiL///+Thpc3AAAAAXRSTlMAQObYZgAAAAFiS0dEFwvWmI8AAAAHdElNRQfiBhoAMQTmjJHZAAACUUlEQVRIx42Ui3KDIBBFdStkEYxgTP//U7sPQHyloTNNpr2HswurXdesXlcH0H2xKPnzMxigZe2/hKRpPQYwFhEtDB2j8DkNYIDj6EbKooBwES9pykgcHQVR17m6HlH3RgTM+6PLXxw7joDl/xEzjuCg17xnwDkAx7Jh2AHO2cLASATnyeAoT2HvLQTbIgS4lqGkd36kTw9ckO8hBBuGyijQMpSnFHXrpQUwgQlrM1OBlul74JaEIEQJxEkAvwG0d2aeD8o7JUapCXF4nAAmCvMcjPfFwfFhngTogjsShTGm97T4u6EGHmrYNVGJwtDUcJzz8zVQ8rq13LcxDHD+AMS0LEuSe+M0/9Aymt8EpevoUozEpIh5fyFCAaogA3GhIC2yJPTLqxhCI2iBSNWgdMDEa8FiOAvkXDlPihcTKxEEZEMVTBvQa14UXolsqBVJQVM7r3JCSqR1XaohbAU99wPOx7OuRKy8qqERNIBXIFfkIzlwuwUR3ACv7ZbJ8C6AdrABMn4K1LlIteezQJvQkjZDQnsr0GOqp6rEGlGAKjgCdJo7wwbMF4BvCRqlAoQ6Rbt8mVcmeJYYSALcVFSf0khEkrFIy9pUxPk9UJ6hiPIM0S++OamodHANuDKGK49GAc759rEWIkneNh0cAAgtQQ+pjl4jOABEhPrKiCx4c0WN4Ah0IIheNB2Wf5Mh1Km4ADJSXmNvNjRHdJHPSPPi+0dwsHiuaBPcAY3FKsCC39/7fEH4VGcVTJ/2bxArwHQau3uEgS/jGWHg27gg8zxd/f0PG2U5hivPia4AAAAldEVYdGRhdGU6Y3JlYXRlADIwMTgtMDYtMjZUMDA6NDk6MDQtMDQ6MDA484PuAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE4LTA2LTI2VDAwOjQ5OjA0LTA0OjAwSa47UgAAAABJRU5ErkJggg==',
  MY_DOCUMENTS:
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAOVBMVEUAAACGhoYiIiL/+/DAwMD4+PiAgAD//5nMzGaZmQDn59YAM5mgoKQAMzMAAAD/zJkICAgzMwD///8PLrXJAAAAAXRSTlMAQObYZgAAAAFiS0dEEnu8bAAAAAAHdElNRQfiBhgXAzXpQrjsAAABbklEQVRIx8WU63KFIAyEtVoj1rr1/V+2QAImXBztn64zRxz3I5vgnGH4N40fL/3T/IoYp+kVMX5Or4iw/xsi+W+J5dLlvyEWSlq1v0t4/8py1t8hav/2dUsstX/XNbi3BtD0B8L5l8t3BRi/ClUTDBT+XTElEYGGf7c1LFD6NxssEAZw48YKVvHP8hTlCQ24cWZ5G//kRVQkBHBPxEQE3PRAxMTBAHUFucH3yDV6AOwahAjEGhUAY+QbYRXipxcJKlG4bgGwNZfwF5DbtgCKFTIWgJsxXQ3IImRifwlkX3pKodx8nAWAEpMJxZOAO86zrgANQvXtK5wtwA6HJBC4CQHamVISNdkGoF7n/LwCagD5eNMwoQ+OehXSvqZhGykT0K2wn/stIjUHm4tAl1AAVBNpAR6TxCqA8pujnIXNpAEhQOYLJb07oQDyB5fTX/mlRq9CagN6otQA9GlRmmbam58v4NmfmVPAcD7S8Bf9AlndNmHeYjB7AAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE4LTA2LTI0VDIzOjAzOjUzLTA0OjAwyUvdTwAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxOC0wNi0yNFQyMzowMzo1My0wNDowMLgWZfMAAAAASUVORK5CYII=',
  FOLDER:
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwBAMAAAClLOS0AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAGFBMVEUAAACZmQAAAAD4+Pj//5nMzGb/zJn////5no2yAAAAAXRSTlMAQObYZgAAAAFiS0dEBxZhiOsAAAAHdElNRQfiBhgXARMJeV+TAAABD0lEQVQ4y9WSMW6lUBAE8RHAcv7lG6zYC6zUqtyBb1Ca+x/BwQAf3kebuxMkRtUz3TBN/9E8z/M8Ly/v39Z1Xdf1z2McvKc1Im9/t8G/xz0wIgcwIk9gQD6+n/qady3T9L7e6nGx2iSwjAOBGMeBMSE1EBqi6gtBAvFlB1EDVwLohzcEbXQhSEyiEOtCCBCGq9iHwjU57BvgZLUDrXNy+iQAhuQmYq84rPpICag1dAWpCJU65RC6cLWOczcjVCg8E/QilGMHIaZvTWEdV9FeqJWCOgU0xKhl7QSRLqO6L6rOAQNp4NmVWxsFolVtpfuvkYKiPKx0+6A92QISu3Ol0KqqYpk+5lst0+e9HtPv0g+viuOT1/6h7gAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxOC0wNi0yNFQyMzowMToxOS0wNDowMO2EXMYAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTgtMDYtMjRUMjM6MDE6MTktMDQ6MDCc2eR6AAAAAElFTkSuQmCC',
  HTML: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAt1BMVEUEBAR3d3eGhob///+ZmZlVVVX/+/DMzMzn59bx8fEzMzMAZv8AZszq6urAwMAAmf8zmcwzZv8zZpkzM8xmmczMzJkzzP8AZplmmZmgoKT//8wAAJn//5kzZsxm//8zmf+Z//9mZswz//8zM5nMzGb/zJlmzP8zM2aZmWYAAICtqZDMmWaWlpZmZmaZmTMAzP9mZjNmZpmAgABfX18AM5lNTU0AAGYpKSkcHBwAM8wEBAQAM2YAAP/qGUgeAAAAAXRSTlMAQObYZgAAAAFiS0dEAxEMTPIAAAAHdElNRQfiBhgXDDuJYokkAAACQElEQVRIx43UbXuTMBQGYHClJS4ZxLQcZ6RTqbP4Mju7KW39/7/Lk4SEAIF5uK72y3Pn5ISXKHIVv5qsKFjx1VQtkgmwnKhFWMyAVVDMgDQoZgAJihlwFRRzICgmAUEQEmFA8Epe25oG11jUCpauVjc3i0WcTAFM4y8diTC4NnEj1I4IsWIEqKosb5dGodcnjDAj+kCFOc95nuVZS6jLs1QJH7zx81haUJc3wgMC4+vNZm3yRWEEdmjjLFWiAwLo29t367XpUDih5nV5DwhJb99vSswLISjGt8U2MxPrgc3VASFhg3nO79SqRnwoMkrsjtJBB53/2Oat+JTRQd4BUe0+7zDP7fFLWmzvi4Iyb0c++LLf6bwP7rdqbEaIm7gDdfz12/dSA1fqmAoF/B1Z8ONhv8c8VQSP1dw3vBfZT8p6O7LgED88cl4a4IlsokN8iH9xDhXwkaCsl3fggBNXgB3ksPp5C5JH3aDsTsmW91R44IgA8wKFA0IfGod+3gFOn2oUXQsB+qHNwT1FPnhOOPyuKwFqU2BKze7l+zM8Hzn8wRZC6DH0a+Q2FOyAIGqeZAUnKHlXQAYTuBmOgL9NI6v6BB0B8yb3RHunNYii81lWpxJJqWchZLSjAYjis5Sndmrz7qcTHUSt/wGa5iKlEEu2ZIH1u/fh8levKqW9wepiowm8V/Siy34q2bL9VAzz/mfGfVvV6urdZ6MzDQO9G0KC64eA231g4hBw6f/v0MVH6WCHyc2EwerFGoDk5YqifxPAV0MWz4FtAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE4LTA2LTI0VDIzOjEyOjU5LTA0OjAwQ3c2/wAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxOC0wNi0yNFQyMzoxMjo1OS0wNDowMDIqjkMAAAAASUVORK5CYII=',
  TXT: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwBAMAAAClLOS0AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAB3RJTUUH4gYaAC0wIU84MQAAAA9QTFRFAAAAAAAAgICAwMDA////fHi2kQAAAAF0Uk5TAEDm2GYAAAABYktHRASPaNlRAAAAaElEQVQ4y2NgwAOYBdEhRJzJUAkNKgqAJVQMXdCgiCIBCWcRVOgkCJVwQQPOwvSUEAQBkJCgCJAhQooOUuwYWA+K0CMQ4UBkVMdgjVraJwYmEzQJQyNIkcGgbIwKhBShpQ+jIBoAaQAA8YC9SH43GJIAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTgtMDYtMjZUMDA6NDU6NDgtMDQ6MDBhJQfuAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE4LTA2LTI2VDAwOjQ1OjQ4LTA0OjAwEHi/UgAAAABJRU5ErkJggg==',
  BMP: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwBAMAAAClLOS0AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAJFBMVEUAAACAgID///8AAADAwMCAAAD/AAAAAIAAgIAAAP+AgAD//wB572JwAAAAAXRSTlMAQObYZgAAAAFiS0dEAmYLfGQAAAAHdElNRQfiBhoALTbILJ0EAAABNklEQVQ4y+3SPU7DMBTAcVsMrFjPF0hwl7Ik2CxsTl6F1D1HKBfowhU4AWJtOQITXI73bMd1EoWFlbf+9PeXLASNVJO5EePIupwK1sA3F6i0vs9goIC2vUCdEwJrC8hJAIcZcrKAMSFQqoQxITA+w63lEQLmYJCmFwoaBkxLVaquI0BrCTbDEAFaFZJeSGsb2W2eI1QWbEh62sOAxM3hEEDRscMuBFfGt7iLRYVgseOEQGg44i4WuqbDdZwwXL++uVhsPxAwnCGAeHk/xuL0pUJASQBKHrjY3n2eMV0zACcDFafvfQpG4GRw+yJIIDlxZTDCEyWPiOf8kAnyj5qB5CsZ1ErZ6VIM9AreA0w3Lwv8YxGPxF9gdkEdCq/ALYH20Kp160W3VnT/xe/F+En4ddOkf2WX8wMclKs5I3LbOwAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxOC0wNi0yNlQwMDo0NTo1NC0wNDowMGovbQQAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTgtMDYtMjZUMDA6NDU6NTQtMDQ6MDAbctW4AAAAAElFTkSuQmCC',
};

class Icon {
  @tracked x;
  @tracked y;

  get position() {
    return htmlSafe(`top: ${this.y}px; left: ${this.x}px`);
  }

  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }
}
class GenericIcon extends Icon {
  constructor(x, y, name, image) {
    super(...arguments);
    this.name = name;
    this.image = image;
  }
}
class MyComputerIcon extends GenericIcon {
  name = 'My Computer';
  image = ICON.MY_COMPUTER;
}
class TrashIcon extends Icon {
  @tracked isFull = false;

  name = 'Recycle Bin';

  get image() {
    return this.isFull ? ICON.TRASH_FULL : ICON.TRASH_EMPTY;
  }
}

export default class ExamplesSharedListsComponent extends Component {
  @tracked icons = [
    new MyComputerIcon(8, 8),
    new GenericIcon(8, 104, 'My Documents', ICON.MY_DOCUMENTS),
    new GenericIcon(8, 200, 'top secret', ICON.FOLDER),
    new GenericIcon(151, 240, 'fancy.html', ICON.HTML),
    new GenericIcon(240, 30, 'DELETE ME!.txt', ICON.TXT),
    new GenericIcon(120, 130, 'flower.bmp', ICON.BMP),
  ];
  trash = new TrashIcon(488, 296, 'Recycle Bin');

  get isFatalErrorState() {
    return !this.icons.find((icon) => icon instanceof MyComputerIcon);
  }

  @action move(payload) {
    const icon = payload.source.data;
    const { pageX: fromX, pageY: fromY } = payload.event.location.initial.input;
    const { pageX: toX, pageY: toY } = payload.event.location.current.input;

    icon.x = icon.x + toX - fromX;
    icon.y = icon.y + toY - fromY;
  }

  @action delete({ source: { data: icon }, target: { data: target } }) {
    if (!confirm(`Are you sure you want to delete "${icon.name}"?`)) {
      return;
    }
    this.icons = this.icons.filter((i) => i !== icon);
    target.isFull = true;
  }
}

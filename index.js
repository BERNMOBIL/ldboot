const p = require('barnard59')
const path = require('path')
const moment = require('moment')

function convertCsvw (filename) {
  const filenameInput = 'input/' + filename
  const filenameMetadata = filenameInput + '-metadata.json'
  const filenameOutput = 'target/' + path.basename(filename, '.csv') + '.nt'

  return p.rdf.dataset().import(p.file.read(filenameMetadata).pipe(p.jsonld.parse())).then((metadata) => {
    return p.run(p.file.read(filenameInput)
      .pipe(p.csvw.parse({
        baseIRI: 'file://' + filename,
        metadata: metadata
      }))
      .pipe(p.map((quad) => {

        const subject = quad.subject
        const predicate = quad.predicate
        const object = quad.object

        if(predicate.value.includes('zeitpunk')) {
          const xsddateTime = 'http://www.w3.org/2001/XMLSchema#dateTime'

          const dateTime = moment(object.value, 'DD-MM-YYYY HH:mm:ss').format()
          
          return p.rdf.quad(subject, predicate, p.rdf.literal(dateTime, p.rdf.namedNode(xsddateTime)))
        } else if(predicate.value.includes('haltestelle')) {
          let station = object.value

          const replacements = new Map([
            ['Bern Bahnhof', 'Bern, Bahnhof'],
            ['Liebefeld, Lerbermatt', 'Köniz, Lerbermatt'],
            ['Liebefeld Park', 'Köniz, Liebefeld Park'],
            ['Liebefeld, Sportweg', 'Köniz, Sportweg'],
            ['Liebefeld, Neuhausplatz', 'Köniz, Neuhausplatz'],
            ['Friedhof Nesslerenholz', 'Wabern, Friedhof Nesslerenholz'],
            [/^Gurtenbahn$/, 'Wabern, Gurtenbahn'],
            [/^Neuhausplatz$/, 'Köniz, Neuhausplatz'],
            ['Brühlplatz', 'Köniz, Brühlplatz'],
            [/^Sportweg$/, 'Köniz, Sportweg'],
            ['Alpenstrasse', 'Wabern, Alpenstrasse'],
            ['Weyergut', 'Wabern, Weyergut'],
            ['Camping Eichholz', 'Wabern, Camping Eichholz'],
            [/^Eichholz$/, 'Wabern, Eichholz'],
            ['Lerbermatt', 'Köniz, Lerbermatt'],
            ['Europaplatz Bahnhof', 'Bern Europaplatz, Bahnhof'],
            ['Hessstrasse', 'Liebefeld, Hessstrasse'],
            ['Thomasweg', 'Köniz, Thomasweg'],
            ['Weissenbühl', 'Bern Weissenbühl'],
            [/^(Belp|Wabern|Konolfingen|Köniz|Münsingen)\s/, '$1, ']
            ])
          
          replacements.forEach(function(value, key){
              station = station.replace(key, value);
          });

          return p.rdf.quad(subject, predicate, p.rdf.literal(station))      
        } else {
          return quad
        }
      }))
      .pipe(p.ntriples.serialize())
      .pipe(p.file.write(filenameOutput)))
  })
}

function convertXlsx (filename, sheet, metadata) {
  const filenameInput = 'input/' + filename
  // const filenameMetadata = filenameInput + '-metadata.json'
  const filenameMetadata = 'input/' + metadata
  const filenameOutput = 'target/' + path.basename(filename, '.xlsx') + '.' + path.basename(metadata, '.csv-metadata.json') + '.nt'

  return p.rdf.dataset().import(p.file.read(filenameMetadata).pipe(p.jsonld.parse())).then((metadata) => {
    return p.run(p.file.read(filenameInput)
      .pipe(p.csvw.xlsx.parse({
        baseIRI: 'file://' + filename,
        metadata: metadata,
        sheet: sheet
      }))
      .pipe(p.ntriples.serialize())
      .pipe(p.file.write(filenameOutput)))
  })
}

const filenames = [
  'incidents.csv'
]

const xlsxSources = [
]

p.run(() => {
  p.shell.mkdir('-p', 'target/')
}).then(() => {
  return p.Promise.serially(filenames, (filename) => {
    console.log('convert: ' + filename)

    return convertCsvw(filename)
  })
}).then(() => {
  return p.Promise.serially(xlsxSources, (source) => {
    console.log('convert: ' + source.filename + ' ' + source.sheet)

    return convertXlsx(source.filename, source.sheet, source.metadata)
  })
}).then(() => {
  console.log('done')
}).catch((err) => {
  console.error(err.stack)
})

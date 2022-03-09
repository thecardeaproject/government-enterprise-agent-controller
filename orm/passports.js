const {Sequelize, DataTypes, Model} = require('sequelize')

const init = require('./init.js')
sequelize = init.connect()

const {Contact} = require('./contacts.js')

class Passport extends Model {}

Passport.init(
  {
    contact_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    passport_number: {
      type: DataTypes.TEXT,
    },
    surname: {
      type: DataTypes.TEXT,
    },
    given_names: {
      type: DataTypes.TEXT,
    },
    sex: {
      type: DataTypes.TEXT,
    },
    date_of_birth: {
      type: DataTypes.TEXT,
    },
    place_of_birth: {
      type: DataTypes.TEXT,
    },
    nationality: {
      type: DataTypes.TEXT,
    },
    date_of_issue: {
      type: DataTypes.TEXT,
    },
    date_of_expiration: {
      type: DataTypes.TEXT,
    },
    type: {
      type: DataTypes.TEXT,
    },
    issuing_country: {
      type: DataTypes.TEXT,
    },
    authority: {
      type: DataTypes.TEXT,
    },
    photo: {
      type: DataTypes.BLOB,
    },
    created_at: {
      type: DataTypes.DATE,
    },
    updated_at: {
      type: DataTypes.DATE,
    },
  },
  {
    sequelize,
    modelName: 'Passport',
    tableName: 'passports',
    timestamps: false,
  },
)

Contact.hasOne(Passport, {
  foreignKey: {
    name: 'contact_id',
  },
})
Passport.belongsTo(Contact, {
  foreignKey: {
    name: 'contact_id',
  },
})

const createPassport = async function (
  contact_id,
  passport_number,
  surname,
  given_names,
  sex,
  date_of_birth,
  place_of_birth,
  nationality,
  date_of_issue,
  date_of_expiration,
  type,
  issuing_country,
  authority,
  photo,
) {
  try {
    const timestamp = Date.now()

    const passport = await Passport.create({
      contact_id: contact_id,
      passport_number: passport_number,
      surname: surname,
      given_names: given_names,
      sex: sex,
      date_of_birth: date_of_birth,
      place_of_birth: place_of_birth,
      nationality: nationality,
      date_of_issue: date_of_issue,
      date_of_expiration: date_of_expiration,
      type: type,
      issuing_country: issuing_country,
      authority: authority,
      photo: photo,
      created_at: timestamp,
      updated_at: timestamp,
    })
    console.log('Passport data saved successfully.')
    return passport
  } catch (error) {
    console.error('Error saving passport data to database: ', error)
  }
}
const createOrUpdatePassport = async function (
  contact_id,
  passport_number,
  surname,
  given_names,
  sex,
  date_of_birth,
  place_of_birth,
  nationality,
  date_of_issue,
  date_of_expiration,
  type,
  issuing_country,
  authority,
  photo,
) {
  try {
    await sequelize.transaction(
      {
        isolationLevel: Sequelize.Transaction.SERIALIZABLE,
      },
      async (t) => {
        let passport = await Passport.findOne({
          where: {
            contact_id: contact_id,
          },
        })
        const timestamp = Date.now()

        if (!passport) {
          console.log('Creating Passport')
          const passport = await Passport.upsert({
            contact_id: contact_id,
            passport_number: passport_number,
            surname: surname,
            given_names: given_names,
            sex: sex,
            date_of_birth: date_of_birth,
            place_of_birth: place_of_birth,
            nationality: nationality,
            date_of_issue: date_of_issue,
            date_of_expiration: date_of_expiration,
            type: type,
            issuing_country: issuing_country,
            authority: authority,
            photo: photo,
            created_at: timestamp,
            updated_at: timestamp,
          })
        } else {
          await Passport.update(
            {
              contact_id: contact_id,
              passport_number: passport_number,
              surname: surname,
              given_names: given_names,
              sex: sex,
              date_of_birth: date_of_birth,
              place_of_birth: place_of_birth,
              nationality: nationality,
              date_of_issue: date_of_issue,
              date_of_expiration: date_of_expiration,
              type: type,
              issuing_country: issuing_country,
              authority: authority,
              photo: photo,
              created_at: timestamp,
              updated_at: timestamp,
            },
            {
              where: {
                contact_id: contact_id,
              },
            },
          )
        }
      },
    )
    console.log('Passport saved successfully')
    return
  } catch (error) {
    console.error('Error saving passport to database: ', error)
  }
}

const readPassports = async function () {
  try {
    const passports = await Passport.findAll({
      include: [
        {
          model: Contact,
          require: true,
        },
      ],
    })
    return passports
  } catch (error) {
    console.error('Could not find passports in the database: ', error)
  }
}

const readPassport = async function (contact_id) {
  try {
    const passport = await Passport.findAll({
      where: {
        contact_id: contact_id,
      },
      include: [
        {
          model: Contact,
          required: true,
        },
      ],
    })
    return passport[0]
  } catch (error) {
    console.error('Could not find passport in database: ', error)
  }
}

const updatePassport = async function (
  contact_id,
  passport_number,
  surname,
  given_names,
  sex,
  date_of_birth,
  place_of_birth,
  nationality,
  date_of_issue,
  date_of_expiration,
  type,
  issuing_country,
  authority,
  photo,
) {
  try {
    const timestamp = Date.now()

    await Passport.update(
      {
        contact_id: contact_id,
        passport_number: passport_number,
        surname: surname,
        given_names: given_names,
        sex: sex,
        date_of_birth: date_of_birth,
        place_of_birth: place_of_birth,
        nationality: nationality,
        date_of_issue: date_of_issue,
        date_of_expiration: date_of_expiration,
        type: type,
        issuing_country: issuing_country,
        authority: authority,
        photo: photo,
        created_at: timestamp,
        updated_at: timestamp,
      },
      {
        where: {
          contact_id: contact_id,
        },
      },
    )
    console.log('Passport updated successfully.')
  } catch (error) {
    console.error('Error updating the Passport: ', error)
  }
}

const deletePassport = async function (contact_id) {
  try {
    await Passport.destroy({
      where: {
        contact_id: contact_id,
      },
    })
    console.log('Successfully deleted passport')
  } catch (error) {
    console.error('Error while deleting passport: ', error)
  }
}

module.exports = {
  Passport,
  createPassport,
  createOrUpdatePassport,
  readPassports,
  readPassport,
  updatePassport,
  deletePassport,
}

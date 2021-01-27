import SubjectRepository from './../database/subject.js'

export default class SubjectController {

    constructor(database) {
        this.repository = new SubjectRepository(database)
    }

    async store(request, response) {
        try {
            const subject = this.repository.insert(request.body)
            
            response.send({
                message: 'subject created',
                subject
            })
        } catch (error) {
            response.send(error)            
        }
    }

    async all(request, response) {
        try {
            const subjects = await this.repository.all()

            response.send({
                data: subjects
            })
        } catch (error) {
            response.send(error)            
        }
    }
}
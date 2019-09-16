import { Spaceship } from '../interfaces';

const isInsideBondaries = ({toCheckStart, toCheckEnd, start, end  }: Spaceship) => (start < toCheckStart && toCheckEnd < end);
const isStartPartialInsideBondaries = ({toCheckStart, toCheckEnd, start, end  }: Spaceship) => (toCheckStart < start && start < toCheckEnd && toCheckEnd < end);
const isEndPartialInsideBondaries = ({toCheckStart, toCheckEnd, start, end  }: Spaceship) => (start < toCheckStart && end < toCheckEnd && end > toCheckStart);
const isLargeThanBondaries = ({toCheckStart, toCheckEnd, start, end  }: Spaceship) => (toCheckStart < start && toCheckEnd > end);


export default (config: Spaceship) => {
    const validations = [
        isInsideBondaries,
        isStartPartialInsideBondaries,
        isEndPartialInsideBondaries,
        isLargeThanBondaries,
    ];

    return !validations.some(validator => {
        if (validator(config)) {
            console.log(validator.name)
            return true;
        }
        return false;
    });
}
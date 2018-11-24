require('babel-polyfill');
import React from 'react';
import {expect} from 'chai';
import  sinon  from 'sinon';
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

import {fromJS} from 'immutable';

import Utterance from '../../src/routes/utterance/utterance';
import InsertionModal from '../../src/components/modals/insertion-modal-component';


configure({adapter: new Adapter()});

describe('Utterance', function () {
    let mockEntries,
        HASH_PATH,
        modalActive,
        token,
        loadData,
        data,
        dataFlag,
        searchCriteria,
        updateSearchCriteria,
        cleanSearchCriteria,
        insertUtterance,
        sandbox;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
        mockEntries = [
            {
                id: "entry1",
                text: "french greeting",
                description: "bonjour monsieur!, comment allez vous?",
                url: "../../0.wav"
            },
            {
                id: "entry2",
                text: "English greetin",
                description: "Hey man, sup!",
                url: "../../0.wav"
            }
        ];
        data = fromJS({mockEntries});
        modalActive = false;
        token = '';
        dataFlag = 'true';
        searchCriteria = '';
        loadData = sinon.stub();
        updateSearchCriteria = sinon.stub();
        cleanSearchCriteria = sinon.stub();
        insertUtterance = sinon.stub();
        HASH_PATH = '#access_token=oauth_1DRJGMLMDoKIZkomf22zWDzJExQ&token_type=bearer&state=987654321'
    });

    afterEach(function () {
        // completely restore all fakes created through the sandbox
        sandbox.restore();
    });

    let getUtteranceWrapper = () => {
        return shallow(
            <Utterance
                loadData={loadData}
                data={data}
                dataFlag={dataFlag}
                searchCriteria={searchCriteria}
                updateSearchCriteria={updateSearchCriteria}
                cleanSearchCriteria={cleanSearchCriteria}
                insertUtterance={insertUtterance}
                HASH_PATH={HASH_PATH}
            />
        )
    };

    describe('<Utterance>', function () {
        context('when modal flag is active', function () {
            it('should render the modal within the wrapper', function () {
                let Utterance = getUtteranceWrapper();
                Utterance.instance().setModalActive(true);
                Utterance.update();
                expect(Utterance.childAt(0).props()).to.deep.equals(
                    {
                        modalActive: true,
                        setModalActive: Utterance.instance().setModalActive,
                        insertUtterance: undefined,
                        dataFlag: 'true'
                    }
                );
            });
        });
    });
});

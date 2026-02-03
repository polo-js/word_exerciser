'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { PreparedBeforeStart } from '@/pages-content/final-test/prepared-before-start';
import { TestMain } from '@/pages-content/final-test/test-main';
import {
	IQuestionBlock,
	ITestExpression,
} from '@/pages-content/final-test/types/questions';
import { TestResultContent } from '@/pages-content/final-test/result';
import { updateData } from '@/shared/utils/server-utils';

enum SHOW_TYPE {
	INFO,
	TEST,
	RESULT,
}

interface IProps {
	expressions: IQuestionBlock[];
}

export function Wrapper({ expressions }: IProps) {
	const [templateType, setTemplateType] = useState<SHOW_TYPE>(SHOW_TYPE.INFO);
	const [testResult, setTestResult] = useState<ITestExpression[]>([]);
	const [waitNewExpressions, setWaitNewExpressions] = useState<boolean>(false);
	const isMounted = useRef<boolean>(false);

	useEffect(() => {
		if (!isMounted.current) {
			isMounted.current = true;
			return;
		}

		setWaitNewExpressions(false);
		setTestResult([]);
		setTemplateType(SHOW_TYPE.TEST);
	}, [expressions]);

	const onTestSubmitHandler = useCallback((result: ITestExpression[]) => {
		setTestResult(result);
		setTemplateType(SHOW_TYPE.RESULT);
	}, []);

	const onRetakeHandler = () => {
		setWaitNewExpressions(true);
		void updateData('page-final-test');
	};

	if (templateType === SHOW_TYPE.INFO) {
		return <PreparedBeforeStart onStart={() => setTemplateType(SHOW_TYPE.TEST)} />;
	}

	if (templateType === SHOW_TYPE.TEST && !waitNewExpressions) {
		return <TestMain expressions={expressions} onSubmit={onTestSubmitHandler} />;
	}

	if (templateType === SHOW_TYPE.RESULT || waitNewExpressions) {
		return <TestResultContent testResult={testResult} onRetake={onRetakeHandler} />;
	}
}

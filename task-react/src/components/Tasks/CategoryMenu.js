import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import categoryService from '../../services/categoryService';
import { useAuthState } from '../../context/AuthContext';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import useStyles from '../../styles/styles';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import ListItem from '@material-ui/core/ListItem';
import taskService from '../../services/taskService';

const CategoryMenu = ({ onCategorySelect }) => {
	const classes = useStyles();
	const navigate = useNavigate();
	const { isAuthenticated } = useAuthState();
	const [categories, setCategories] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [filteredCategories, setFilteredCategories] = useState([]);
	const [previousSelected, setPreviousSelected] = useState(null);

	useEffect(() => {
		if (!isAuthenticated) {
			console.error('User not authenticated. Redirecting to login.');
			navigate('/login');
			return;
		}
		const fetchCategories = async () => {
			try {
				const token = Cookies.get();
				const fetchedCategories = await categoryService.getAllCategories(token.token);

				setCategories(fetchedCategories);
			} catch (error) {
				console.error('Error fetching categories:', error);
			}
		};

		fetchCategories();
	}, [isAuthenticated, navigate]);

	useEffect(() => {
		setFilteredCategories(categories);
	}, [categories]);

	useEffect(() => {
		if (searchTerm) {
			const filtered = categories.filter((category) =>
				category.name.toLowerCase().includes(searchTerm.toLowerCase())
			);
			setFilteredCategories(filtered);
		} else {
			setFilteredCategories(categories);
		}
	}, [searchTerm, categories]);
	const handleCategoryClick = (categoryId) => {
		if (categoryId !== previousSelected) {
			onCategorySelect(categoryId);
			setPreviousSelected(categoryId);
		}
	};

	const handleCreateCategory = () => {
		navigate('/category/create');
	};

	const handleDragEnd = (result) => {
		if (!result.destination) {
			return;
		}

		const reorderedCategories = [...filteredCategories];
		const [removed] = reorderedCategories.splice(result.source.index, 1);
		reorderedCategories.splice(result.destination.index, 0, removed);

		setFilteredCategories(reorderedCategories);
	};

	const handleShowAllCategories = () => {
		onCategorySelect(667)
		setPreviousSelected(667);
	};

	return (
		<div className={classes.container}>
			<Typography variant="h5" gutterBottom>
				Categories
			</Typography>
			<TextField
				label="Search Category"
				variant="outlined"
				margin="normal"
				fullWidth
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
			/>
			<div className={classes.content}>
				<DragDropContext onDragEnd={handleDragEnd}>
					<Droppable droppableId="droppable">
						{(provided) => (
							<List {...provided.droppableProps} ref={provided.innerRef}>
								{filteredCategories.map((category, index) => (
									<Draggable
										key={category['_id']}
										draggableId={category['_id']}
										index={index}
									>
										{(provided) => (
											<ListItem
												onClick={() => handleCategoryClick(category['_id'])}
												ref={provided.innerRef}
												{...provided.draggableProps}
												{...provided.dragHandleProps}
												className={`${classes.listItem} ${previousSelected === category._id ? classes.highlightedCategory : ''} ${previousSelected === 667 ? classes.normalCategory : ''}`}
											>
												<ListItemText primary={category.name} />
											</ListItem>
										)}
									</Draggable>
								))}
								{provided.placeholder}
							</List>
						)}
					</Droppable>
				</DragDropContext>
				<Button
					variant="contained"
					color="primary"
					onClick={handleCreateCategory}
					className={classes.createButton}
				>
					Create Category
				</Button>
				<Button
					variant="contained"
					color="default"
					onClick={handleShowAllCategories}
					className={classes.createButton}
				>
					All categories
				</Button>
			</div>
		</div>
	);
};

export default CategoryMenu;
